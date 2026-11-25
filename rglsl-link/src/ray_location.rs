use std::collections::{BTreeMap, BTreeSet};

use rglsl::visit::VisitorMut;
use rglsl::{
    AddressSpace, Arena, Binding, Expression, Function, GlobalVariable, Handle, Literal, Module,
    RayDataKind, RayTracingData, RayTracingFlavor, Span, Statement,
};

use crate::error::{LinkError, internal};

type Locations = Vec<u32>;

type Bound = BTreeMap<u32, u32>;

const fn holds(kind: RayDataKind, space: AddressSpace) -> bool {
    match kind {
        RayDataKind::Payload => matches!(
            space,
            AddressSpace::RayPayload | AddressSpace::IncomingRayPayload
        ),
        RayDataKind::CallableData => matches!(
            space,
            AddressSpace::CallableData | AddressSpace::IncomingCallableData
        ),
        RayDataKind::HitObjectAttribute => {
            matches!(space, AddressSpace::HitObjectAttribute { .. })
        }
    }
}

const fn qualifiers(kind: RayDataKind) -> &'static str {
    match kind {
        RayDataKind::Payload => "rayPayloadEXT/rayPayloadInEXT",
        RayDataKind::CallableData => "callableDataEXT/callableDataInEXT",
        RayDataKind::HitObjectAttribute => "hitObjectAttributeNV/hitObjectAttributeEXT",
    }
}

fn literal_location(literal: Literal) -> Option<u32> {
    match literal {
        Literal::I32(value) => u32::try_from(value).ok(),
        Literal::U32(value) => Some(value),
        _ => None,
    }
}

fn argument_at(arguments: &[Handle<Expression>], parameter: u32) -> Option<Handle<Expression>> {
    usize::try_from(parameter)
        .ok()
        .and_then(|position| arguments.get(position))
        .copied()
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
    fn parameters_of(&self, function: Handle<Function>) -> Result<&[u32], LinkError> {
        self.parameters
            .get(function.index())
            .map(Vec::as_slice)
            .ok_or_else(|| internal("a callee comes after its caller"))
    }

    fn not_constant(&self, callee: Handle<Function>) -> LinkError {
        self.names.get(callee.index()).map_or_else(
            || internal("function index"),
            |name| LinkError::RayLocationNotConstant(name.clone()),
        )
    }

    fn located_parameters(&self, function: &Function) -> Result<Vec<u32>, LinkError> {
        let mut found = BTreeSet::new();
        for statement in function.body.walk() {
            if let Some((_, RayTracingData::Argument { index, .. })) = statement.ray_tracing_data()
            {
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
            for &parameter in self.parameters_of(callee)? {
                let argument =
                    argument_at(arguments, parameter).ok_or_else(|| internal("call arity"))?;
                if let Expression::FunctionArgument(index) =
                    *function.expressions.try_get(argument).map_err(internal)?
                {
                    found.insert(index);
                }
            }
        }
        Ok(found.into_iter().collect())
    }

    fn location(
        module: &Module,
        expressions: &Arena<Expression>,
        argument: Handle<Expression>,
        bound: &Bound,
    ) -> Result<Option<u32>, LinkError> {
        Ok(match *expressions.try_get(argument).map_err(internal)? {
            Expression::Literal(literal) => literal_location(literal),
            Expression::Constant(constant) => {
                let init = module.constants.try_get(constant).map_err(internal)?.init;
                match *module.global_expressions.try_get(init).map_err(internal)? {
                    Expression::Literal(literal) => literal_location(literal),
                    _ => None,
                }
            }
            Expression::FunctionArgument(index) => bound.get(&index).copied(),
            _ => None,
        })
    }

    fn call_locations(
        &self,
        module: &Module,
        expressions: &Arena<Expression>,
        callee: Handle<Function>,
        arguments: &[Handle<Expression>],
        bound: &Bound,
    ) -> Result<Locations, LinkError> {
        self.parameters_of(callee)?
            .iter()
            .map(|&parameter| {
                let argument =
                    argument_at(arguments, parameter).ok_or_else(|| internal("call arity"))?;
                Self::location(module, expressions, argument, bound)?
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
            if self.parameters_of(callee)?.is_empty() {
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
            let parameters = plan.located_parameters(function)?;
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
            let parameters = plan.parameters_of(handle)?.to_vec();
            if parameters.is_empty() {
                plan.request_callees(module, function, &unbound)?;
                continue;
            }
            let requests = plan
                .requests
                .get(handle.index())
                .cloned()
                .ok_or_else(|| internal("function index"))?;
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
}

impl<'a> VisitorMut<'a> for Callbacks<'_> {
    type Error = LinkError;

    fn function(&mut self, function: &mut Handle<Function>) -> Result<(), LinkError> {
        *function =
            *self.targets.plain.get(&function.index()).ok_or_else(|| {
                internal("a function used by a statement is not linked before it")
            })?;
        Ok(())
    }
}

struct Specializer<'m> {
    module: &'m Module,
    plan: &'m Plan,
    targets: Targets,
}

impl Specializer<'_> {
    fn variable(&self, kind: RayDataKind, location: u32) -> Option<Handle<GlobalVariable>> {
        self.module
            .global_variables
            .iter()
            .find(|&(_, global)| {
                holds(kind, global.space)
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
        let target = if self.plan.parameters_of(callee)?.is_empty() {
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

    fn resolve_argument(
        &self,
        name: Option<&str>,
        expressions: &mut Arena<Expression>,
        (kind, data): (RayDataKind, &mut RayTracingData),
        bound: &Bound,
        span: Span,
    ) -> Result<(), LinkError> {
        let RayTracingData::Argument { index, flavor } = *data else {
            return Ok(());
        };
        let location = *bound
            .get(&index)
            .ok_or_else(|| internal("a location argument is not bound"))?;
        *data = match flavor {
            RayTracingFlavor::Nv => RayTracingData::Location(location),
            RayTracingFlavor::Khr => {
                let variable = self.variable(kind, location).ok_or_else(|| {
                    LinkError::RayLocationNotDeclared {
                        qualifiers: qualifiers(kind),
                        location,
                        function: name.unwrap_or_default().to_owned(),
                    }
                })?;
                RayTracingData::Pointer(
                    expressions.append(Expression::GlobalVariable(variable), span),
                )
            }
        };
        Ok(())
    }

    fn specialize(&self, function: &mut Function, bound: &Bound) -> Result<(), LinkError> {
        let Function {
            ref name,
            ref mut body,
            ref mut expressions,
            ..
        } = *function;
        let mut callbacks = Callbacks {
            targets: &self.targets,
        };
        body.try_visit_blocks_mut(|block| {
            for (statement, span) in block.span_iter_mut() {
                let span = span
                    .map(|span| *span)
                    .ok_or_else(|| internal("a statement without a span"))?;
                if let Some(data) = statement.ray_tracing_data_mut() {
                    self.resolve_argument(name.as_deref(), expressions, data, bound, span)?;
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
            Ok(())
        })
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
        let parameters = plan.parameters_of(handle)?;
        if parameters.is_empty() {
            specializer.specialize(&mut function, &Bound::new())?;
            let new = functions.append(function, span);
            specializer.targets.plain.insert(handle.index(), new);
            continue;
        }
        let requests = plan
            .requests
            .get(handle.index())
            .ok_or_else(|| internal("function index"))?;
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
