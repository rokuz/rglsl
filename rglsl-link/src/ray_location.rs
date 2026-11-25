use std::collections::{BTreeMap, BTreeSet};

use rglsl::visit::VisitorMut;
use rglsl::{
    AddressSpace, Arena, Binding, Block, Expression, Function, GlobalVariable, Handle,
    HitObjectFunction, Literal, Module, RayPipelineFunction, RayTracingData, RayTracingFlavor,
    Span, Statement,
};

use crate::error::{LinkError, internal};

type Locations = Vec<u32>;

type Bound = BTreeMap<u32, u32>;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Kind {
    Payload,
    CallableData,
    HitObjectAttribute,
}

impl Kind {
    const fn holds(self, space: AddressSpace) -> bool {
        match self {
            Self::Payload => matches!(
                space,
                AddressSpace::RayPayload | AddressSpace::IncomingRayPayload
            ),
            Self::CallableData => matches!(
                space,
                AddressSpace::CallableData | AddressSpace::IncomingCallableData
            ),
            Self::HitObjectAttribute => matches!(space, AddressSpace::HitObjectAttribute { .. }),
        }
    }

    const fn qualifiers(self) -> &'static str {
        match self {
            Self::Payload => "rayPayloadEXT/rayPayloadInEXT",
            Self::CallableData => "callableDataEXT/callableDataInEXT",
            Self::HitObjectAttribute => "hitObjectAttributeNV/hitObjectAttributeEXT",
        }
    }
}

const fn hit_object_data(function: &HitObjectFunction) -> Option<(Kind, RayTracingData)> {
    match *function {
        HitObjectFunction::TraceRay(ref trace)
        | HitObjectFunction::TraceReorderExecute { ref trace, .. } => {
            Some((Kind::Payload, trace.payload))
        }
        HitObjectFunction::ExecuteShader { payload }
        | HitObjectFunction::ReorderExecute { payload, .. } => Some((Kind::Payload, payload)),
        HitObjectFunction::RecordHit { attributes, .. }
        | HitObjectFunction::RecordFromQuery { attributes, .. }
        | HitObjectFunction::GetAttributes { attributes } => {
            Some((Kind::HitObjectAttribute, attributes))
        }
        _ => None,
    }
}

const fn hit_object_data_mut(
    function: &mut HitObjectFunction,
) -> Option<(Kind, &mut RayTracingData)> {
    match *function {
        HitObjectFunction::TraceRay(ref mut trace)
        | HitObjectFunction::TraceReorderExecute { ref mut trace, .. } => {
            Some((Kind::Payload, &mut trace.payload))
        }
        HitObjectFunction::ExecuteShader { ref mut payload }
        | HitObjectFunction::ReorderExecute {
            ref mut payload, ..
        } => Some((Kind::Payload, payload)),
        HitObjectFunction::RecordHit {
            ref mut attributes, ..
        }
        | HitObjectFunction::RecordFromQuery {
            ref mut attributes, ..
        }
        | HitObjectFunction::GetAttributes { ref mut attributes } => {
            Some((Kind::HitObjectAttribute, attributes))
        }
        _ => None,
    }
}

const fn ray_data(statement: &Statement) -> Option<(Kind, RayTracingData)> {
    match *statement {
        Statement::RayPipelineFunction(RayPipelineFunction::TraceRay { payload, .. }) => {
            Some((Kind::Payload, payload))
        }
        Statement::RayPipelineFunction(RayPipelineFunction::ExecuteCallable { data, .. }) => {
            Some((Kind::CallableData, data))
        }
        Statement::HitObject { ref fun, .. } => hit_object_data(fun),
        _ => None,
    }
}

const fn ray_data_mut(statement: &mut Statement) -> Option<(Kind, &mut RayTracingData)> {
    match *statement {
        Statement::RayPipelineFunction(RayPipelineFunction::TraceRay {
            ref mut payload, ..
        }) => Some((Kind::Payload, payload)),
        Statement::RayPipelineFunction(RayPipelineFunction::ExecuteCallable {
            ref mut data,
            ..
        }) => Some((Kind::CallableData, data)),
        Statement::HitObject { ref mut fun, .. } => hit_object_data_mut(fun),
        _ => None,
    }
}

fn literal_location(literal: Literal) -> Option<u32> {
    match literal {
        Literal::I32(value) => u32::try_from(value).ok(),
        Literal::U32(value) => Some(value),
        _ => None,
    }
}

fn bind(parameters: &[u32], locations: &[u32]) -> Bound {
    parameters
        .iter()
        .copied()
        .zip(locations.iter().copied())
        .collect()
}

#[derive(Debug)]
struct Plan {
    names: Vec<String>,
    parameters: Vec<Vec<u32>>,
    requests: Vec<BTreeSet<Locations>>,
}

impl Plan {
    fn parameters_of(&self, function: Handle<Function>) -> &[u32] {
        self.parameters
            .get(function.index())
            .map_or(&[], Vec::as_slice)
    }

    fn not_constant(&self, callee: Handle<Function>) -> LinkError {
        LinkError::RayLocationNotConstant(
            self.names.get(callee.index()).cloned().unwrap_or_default(),
        )
    }

    fn located_parameters(&self, function: &Function) -> Vec<u32> {
        let mut found = BTreeSet::new();
        for statement in function.body.walk() {
            if let Some((_, RayTracingData::Argument { index, .. })) = ray_data(statement) {
                found.insert(index);
            }
            let Statement::Call {
                function: callee,
                ref arguments,
                ..
            } = *statement
            else {
                continue;
            };
            for &parameter in self.parameters_of(callee) {
                let passed = usize::try_from(parameter)
                    .ok()
                    .and_then(|position| arguments.get(position))
                    .and_then(|&argument| function.expressions.try_get(argument).ok());
                if let Some(&Expression::FunctionArgument(index)) = passed {
                    found.insert(index);
                }
            }
        }
        found.into_iter().collect()
    }

    fn location(
        module: &Module,
        expressions: &Arena<Expression>,
        argument: Handle<Expression>,
        bound: &Bound,
    ) -> Option<u32> {
        match *expressions.try_get(argument).ok()? {
            Expression::Literal(literal) => literal_location(literal),
            Expression::Constant(constant) => {
                let init = module.constants.try_get(constant).ok()?.init;
                match *module.global_expressions.try_get(init).ok()? {
                    Expression::Literal(literal) => literal_location(literal),
                    _ => None,
                }
            }
            Expression::FunctionArgument(index) => bound.get(&index).copied(),
            _ => None,
        }
    }

    fn call_locations(
        &self,
        module: &Module,
        expressions: &Arena<Expression>,
        callee: Handle<Function>,
        arguments: &[Handle<Expression>],
        bound: &Bound,
    ) -> Result<Locations, LinkError> {
        self.parameters_of(callee)
            .iter()
            .map(|&parameter| {
                usize::try_from(parameter)
                    .ok()
                    .and_then(|position| arguments.get(position))
                    .and_then(|&argument| Self::location(module, expressions, argument, bound))
                    .ok_or_else(|| self.not_constant(callee))
            })
            .collect()
    }

    fn request_callees(
        &mut self,
        module: &Module,
        function: &Function,
        bound: &Bound,
    ) -> Result<(), LinkError> {
        for statement in function.body.walk() {
            let Statement::Call {
                function: callee,
                ref arguments,
                ..
            } = *statement
            else {
                continue;
            };
            if self.parameters_of(callee).is_empty() {
                continue;
            }
            let locations =
                self.call_locations(module, &function.expressions, callee, arguments, bound)?;
            self.requests
                .get_mut(callee.index())
                .ok_or_else(|| internal("function index"))?
                .insert(locations);
        }
        Ok(())
    }

    fn of(module: &Module) -> Result<Option<Self>, LinkError> {
        let mut plan = Self {
            names: module
                .functions
                .iter()
                .map(|(_, function)| function.name.clone().unwrap_or_default())
                .collect(),
            parameters: Vec::with_capacity(module.functions.len()),
            requests: vec![BTreeSet::new(); module.functions.len()],
        };
        for (_, function) in module.functions.iter() {
            let parameters = plan.located_parameters(function);
            plan.parameters.push(parameters);
        }
        if plan.parameters.iter().all(Vec::is_empty) {
            return Ok(None);
        }
        let unbound = Bound::new();
        for entry in &module.entry_points {
            plan.request_callees(module, &entry.function, &unbound)?;
        }
        for (handle, function) in module.functions.iter().rev() {
            let parameters = plan.parameters_of(handle).to_vec();
            if parameters.is_empty() {
                plan.request_callees(module, function, &unbound)?;
                continue;
            }
            let requests = plan
                .requests
                .get(handle.index())
                .cloned()
                .unwrap_or_default();
            for locations in requests {
                plan.request_callees(module, function, &bind(&parameters, &locations))?;
            }
        }
        Ok(Some(plan))
    }
}

#[derive(Debug, Default)]
struct Targets {
    plain: BTreeMap<usize, Handle<Function>>,
    specialized: BTreeMap<(usize, Locations), Handle<Function>>,
}

struct Callbacks<'t> {
    targets: &'t Targets,
    plan: &'t Plan,
}

impl<'a> VisitorMut<'a> for Callbacks<'_> {
    type Error = LinkError;

    fn function(&mut self, function: &mut Handle<Function>) -> Result<(), LinkError> {
        *function = *self
            .targets
            .plain
            .get(&function.index())
            .ok_or_else(|| self.plan.not_constant(*function))?;
        Ok(())
    }
}

struct Specializer<'m> {
    module: &'m Module,
    plan: &'m Plan,
    targets: Targets,
}

impl Specializer<'_> {
    fn variable(&self, kind: Kind, location: u32) -> Option<Handle<GlobalVariable>> {
        self.module
            .global_variables
            .iter()
            .find(|&(_, global)| {
                kind.holds(global.space)
                    && matches!(
                        global.io,
                        Some(Binding::Location { location: declared, .. }) if declared == location
                    )
            })
            .map(|(handle, _)| handle)
    }

    fn target(
        &self,
        expressions: &Arena<Expression>,
        callee: Handle<Function>,
        arguments: &[Handle<Expression>],
        bound: &Bound,
    ) -> Result<Handle<Function>, LinkError> {
        let target = if self.plan.parameters_of(callee).is_empty() {
            self.targets.plain.get(&callee.index())
        } else {
            let locations =
                self.plan
                    .call_locations(self.module, expressions, callee, arguments, bound)?;
            self.targets.specialized.get(&(callee.index(), locations))
        };
        target
            .copied()
            .ok_or_else(|| internal("a callee is not specialized before its caller"))
    }

    fn specialize(&self, function: &mut Function, bound: &Bound) -> Result<(), LinkError> {
        let Function {
            ref name,
            ref mut body,
            ref mut expressions,
            ..
        } = *function;
        let mut walked: Vec<&mut Block> = Vec::from([body]);
        let mut callbacks = Callbacks {
            targets: &self.targets,
            plan: self.plan,
        };
        while let Some(block) = walked.pop() {
            for (statement, span) in block.span_iter_mut() {
                let span = span.map_or_else(Span::default, |span| *span);
                if let Some((kind, data)) = ray_data_mut(statement) {
                    if let RayTracingData::Argument { index, flavor } = *data {
                        let location = *bound
                            .get(&index)
                            .ok_or_else(|| internal("a location argument is not bound"))?;
                        *data = match flavor {
                            RayTracingFlavor::Nv => RayTracingData::Location(location),
                            RayTracingFlavor::Khr => {
                                let variable = self.variable(kind, location).ok_or_else(|| {
                                    LinkError::RayLocationNotDeclared {
                                        qualifiers: kind.qualifiers(),
                                        location,
                                        function: name.clone().unwrap_or_default(),
                                    }
                                })?;
                                RayTracingData::Pointer(
                                    expressions.append(Expression::GlobalVariable(variable), span),
                                )
                            }
                        };
                    }
                } else if let Statement::Call {
                    function: ref mut callee,
                    ref arguments,
                    result,
                } = *statement
                {
                    let target = self.target(expressions, *callee, arguments, bound)?;
                    *callee = target;
                    if let Some(result) = result {
                        *expressions.try_get_mut(result).map_err(internal)? =
                            Expression::CallResult(target);
                    }
                } else {
                    statement.visit_mut(&mut callbacks)?;
                }
            }
            for statement in block.iter_mut() {
                statement.for_each_child_block_mut(|child| walked.push(child));
            }
        }
        Ok(())
    }
}

pub(crate) fn resolve(module: &mut Module) -> Result<(), LinkError> {
    let Some(plan) = Plan::of(module)? else {
        return Ok(());
    };
    let mut old = module.functions.take();
    let mut entry_points = core::mem::take(&mut module.entry_points);
    let mut functions = Arena::with_capacity(old.len());
    let mut specializer = Specializer {
        module,
        plan: &plan,
        targets: Targets::default(),
    };
    for (handle, mut function, span) in old.drain() {
        let parameters = plan.parameters_of(handle);
        if parameters.is_empty() {
            specializer.specialize(&mut function, &Bound::new())?;
            let new = functions.append(function, span);
            specializer.targets.plain.insert(handle.index(), new);
            continue;
        }
        let requests = plan.requests.get(handle.index()).into_iter().flatten();
        for locations in requests {
            let mut function = function.clone();
            specializer.specialize(&mut function, &bind(parameters, locations))?;
            let new = functions.append(function, span);
            specializer
                .targets
                .specialized
                .insert((handle.index(), locations.clone()), new);
        }
    }
    for entry in &mut entry_points {
        specializer.specialize(&mut entry.function, &Bound::new())?;
    }
    module.functions = functions;
    module.entry_points = entry_points;
    Ok(())
}
