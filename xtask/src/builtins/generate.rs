use std::fmt::Write as _;
use std::sync::Arc;

use rglsl_sema::scope::{Direction, Function, Storage, SymbolKind};
use rglsl_sema::types::{OpaqueKind, SampledType, Scalar};
use rglsl_sema::{Builtins, DiagnosticKind, Type, TypeKind};
use rglsl_types::ShaderStage as Stage;

const MAX_EXTENSION_ROUNDS: usize = 16;

#[derive(Debug, Clone)]
pub enum Subject {
    Function(Arc<Function>),
    Variable {
        name: String,
        member: Option<usize>,
    },
    Foreign {
        access: String,
        ty: Type,
        output: bool,
    },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Source {
    Both,
    Rglsl,
    Glslang,
}

impl Source {
    pub const fn label(self) -> &'static str {
        match self {
            Self::Both => "both",
            Self::Rglsl => "rglsl-only",
            Self::Glslang => "glslang-only",
        }
    }
}

#[derive(Debug, Clone)]
pub struct Case {
    pub version: u32,
    pub stage: Stage,
    pub subject: Subject,
    pub name: String,
    pub signature: String,
    pub key: Option<String>,
    pub source: Source,
    pub seed: Vec<String>,
}

impl Case {
    pub fn prefers_nv(&self) -> bool {
        self.name
            .split('.')
            .next()
            .is_some_and(|name| name.ends_with("NV"))
    }

    pub const fn kind(&self) -> &'static str {
        match self.subject {
            Subject::Function(_) => "function",
            Subject::Variable { .. } | Subject::Foreign { .. } => "variable",
        }
    }
}

#[derive(Debug, Clone)]
pub struct Generated {
    pub source: String,
    pub extensions: Vec<String>,
    pub constants: bool,
}

pub const fn stage_extension(stage: Stage) -> &'static str {
    stage.extension()
}

pub fn signature(function: &Function, types: &rglsl_sema::TypeRegistry) -> String {
    let parameters: Vec<String> = function
        .parameters
        .iter()
        .map(|parameter| {
            let direction = match parameter.direction {
                Direction::In => "",
                Direction::Out => "out ",
                Direction::Inout => "inout ",
            };
            format!("{direction}{}", parameter.ty.display(types))
        })
        .collect();
    format!(
        "{} {}({})",
        function.return_type.display(types),
        function.name,
        parameters.join(", ")
    )
}

pub fn cases(version: u32, stage: Stage, builtins: &Builtins) -> Vec<Case> {
    let types = builtins.types();
    let mut cases = Vec::new();
    for function in builtins.functions() {
        cases.push(Case {
            version,
            stage,
            subject: Subject::Function(Arc::new(function.clone())),
            name: function.name.clone(),
            signature: signature(function, types),
            key: Some(super::glslang::key(&function.name, function, types)),
            source: Source::Rglsl,
            seed: Vec::new(),
        });
    }
    for (name, id) in builtins.variables() {
        let Some(symbol) = usize::try_from(id.index())
            .ok()
            .and_then(|index| builtins.symbols().get(index))
        else {
            continue;
        };
        let (ty, named) = match &symbol.kind {
            SymbolKind::Variable(variable) => (variable.ty.clone(), true),
            SymbolKind::BlockMember { instance, index } => {
                match member_of(builtins, *instance, *index) {
                    Some(ty) => (ty, false),
                    None => continue,
                }
            }
            _ => continue,
        };
        let block = match ty.kind {
            TypeKind::Block(block) => types.block(block),
            _ => None,
        };
        match block {
            Some(block) => {
                for (member, field) in block.members.iter().enumerate() {
                    cases.push(Case {
                        version,
                        stage,
                        subject: Subject::Variable {
                            name: String::from(name),
                            member: Some(member),
                        },
                        name: format!("{name}.{}", field.name),
                        signature: format!("{} {name}.{}", field.ty.display(types), field.name),
                        key: Some(format!("{name}.{}", field.name)),
                        source: Source::Rglsl,
                        seed: Vec::new(),
                    });
                }
            }
            None => cases.push(Case {
                version,
                stage,
                subject: Subject::Variable {
                    name: String::from(name),
                    member: None,
                },
                name: String::from(name),
                signature: format!("{} {name}", ty.display(types)),
                key: named.then(|| String::from(name)),
                source: Source::Rglsl,
                seed: Vec::new(),
            }),
        }
    }
    cases
}

fn member_of(builtins: &Builtins, instance: rglsl_sema::SymbolId, index: u32) -> Option<Type> {
    let symbol = builtins
        .symbols()
        .get(usize::try_from(instance.index()).ok()?)?;
    let variable = symbol.variable()?;
    let TypeKind::Block(block) = variable.ty.kind else {
        return None;
    };
    let block = builtins.types().block(block)?;
    Some(block.members.get(usize::try_from(index).ok()?)?.ty.clone())
}

fn storage_of(builtins: &Builtins, name: &str) -> Option<(Type, Storage)> {
    let (_, id) = builtins
        .variables()
        .find(|(candidate, _)| *candidate == name)?;
    let symbol = builtins.symbols().get(usize::try_from(id.index()).ok()?)?;
    match &symbol.kind {
        SymbolKind::Variable(variable) => Some((variable.ty.clone(), variable.qualifiers.storage)),
        SymbolKind::BlockMember { instance, index } => {
            let owner = builtins
                .symbols()
                .get(usize::try_from(instance.index()).ok()?)?
                .variable()?;
            Some((
                member_of(builtins, *instance, *index)?,
                owner.qualifiers.storage,
            ))
        }
        _ => None,
    }
}

struct Shader<'a> {
    builtins: &'a Builtins,
    stage: Stage,
    globals: Vec<String>,
    inputs: Vec<String>,
    outputs: Vec<String>,
    body: Vec<String>,
    after: Vec<String>,
    binding: u32,
    derivatives: bool,
}

impl<'a> Shader<'a> {
    const fn new(builtins: &'a Builtins, stage: Stage) -> Self {
        Self {
            builtins,
            stage,
            globals: Vec::new(),
            inputs: Vec::new(),
            outputs: Vec::new(),
            body: Vec::new(),
            after: Vec::new(),
            binding: 2,
            derivatives: false,
        }
    }

    fn spell(&self, ty: &Type) -> String {
        ty.display(self.builtins.types()).to_string()
    }

    fn input(&mut self, ty: &Type) -> String {
        let name = format!("a{}", self.inputs.len());
        if is_sub_byte(ty) {
            let declaration = format!("{} {name};", self.spell(&ty.with_scalar(Scalar::Float)));
            self.inputs.push(declaration);
            return format!("{}(rglslIn.{name})", self.spell(ty));
        }
        let declaration = format!("{} {name};", self.spell(ty));
        self.inputs.push(declaration);
        format!("rglslIn.{name}")
    }

    fn store(&mut self, ty: &Type, value: &str) -> String {
        if is_sub_byte(ty) {
            let float = ty.with_scalar(Scalar::Float);
            let target = self.output(&float);
            return format!("{target} = {}({value});", self.spell(&float));
        }
        let target = self.output(ty);
        format!("{target} = {value};")
    }

    fn output(&mut self, ty: &Type) -> String {
        let name = format!("r{}", self.outputs.len());
        let declaration = format!("{} {name};", self.spell(ty));
        self.outputs.push(declaration);
        format!("rglslOut.{name}")
    }

    fn opaque(&mut self, ty: &Type, index: usize) -> String {
        let name = format!("p{index}");
        let spelled = self.spell(ty);
        let Some(opaque) = ty.as_opaque() else {
            return name;
        };
        if opaque.is_private_object() {
            self.body.push(format!("{spelled} {name};"));
            return name;
        }
        let binding = self.binding;
        self.binding += 1;
        let declaration = match opaque.kind {
            OpaqueKind::SubpassInput => format!(
                "layout(input_attachment_index = 0, set = 0, binding = {binding}) uniform {spelled} {name};"
            ),
            OpaqueKind::Image => {
                let format = match opaque.sampled {
                    SampledType::Float => "r32f",
                    SampledType::Int => "r32i",
                    SampledType::Uint => "r32ui",
                    SampledType::Int64 => "r64i",
                    SampledType::Uint64 => "r64ui",
                };
                format!("layout(set = 0, binding = {binding}, {format}) uniform {spelled} {name};")
            }
            OpaqueKind::TileImage => {
                format!("layout(location = 0) tileImageEXT {spelled} {name};")
            }
            _ => format!("layout(set = 0, binding = {binding}) uniform {spelled} {name};"),
        };
        self.globals.push(declaration);
        name
    }

    fn constant(&self, ty: &Type) -> String {
        if let Some(element) = ty.element_type().filter(|_| ty.is_array()) {
            let count = ty.length().unwrap_or(1);
            let elements: Vec<String> = (0..count).map(|_| self.constant(&element)).collect();
            return format!("{}({})", self.spell(ty), elements.join(", "));
        }
        format!("{}(1)", self.spell(ty))
    }

    fn finish(&self, version: u32, extensions: &[String]) -> String {
        let mut source = format!("#version {version}\n");
        for extension in extensions {
            let _ = writeln!(source, "#extension {extension} : require");
        }
        source.push_str(&stage_layout(self.stage, self.derivatives));
        for global in &self.globals {
            source.push_str(global);
            source.push('\n');
        }
        if !self.inputs.is_empty() {
            source.push_str("layout(std430, set = 0, binding = 0) buffer RglslInputs {\n");
            for member in &self.inputs {
                let _ = writeln!(source, "    {member}");
            }
            source.push_str("} rglslIn;\n");
        }
        if !self.outputs.is_empty() {
            source.push_str("layout(std430, set = 0, binding = 1) buffer RglslOutputs {\n");
            for member in &self.outputs {
                let _ = writeln!(source, "    {member}");
            }
            source.push_str("} rglslOut;\n");
        }
        source.push_str("void main() {\n");
        for line in self.body.iter().chain(&self.after) {
            let _ = writeln!(source, "    {line}");
        }
        source.push_str("}\n");
        source
    }
}

const QUADS: &str =
    "layout(local_size_x = 2, local_size_y = 2) in;\nlayout(derivative_group_quadsKHR) in;\n";
const MESH_OUTPUT: &str = "layout(max_vertices = 3, max_primitives = 1, triangles) out;\n";

fn stage_layout(stage: Stage, derivatives: bool) -> String {
    match (stage, derivatives) {
        (Stage::TessControl, _) => String::from("layout(vertices = 3) out;\n"),
        (Stage::TessEvaluation, _) => String::from("layout(triangles) in;\n"),
        (Stage::Geometry, _) => {
            String::from("layout(triangles) in;\nlayout(triangle_strip, max_vertices = 3) out;\n")
        }
        (Stage::Compute | Stage::Task, false) => String::from("layout(local_size_x = 1) in;\n"),
        (Stage::Compute | Stage::Task, true) => String::from(QUADS),
        (Stage::Mesh, false) => format!("layout(local_size_x = 1) in;\n{MESH_OUTPUT}"),
        (Stage::Mesh, true) => format!("{QUADS}{MESH_OUTPUT}"),
        _ => String::new(),
    }
}

fn is_integer_value(ty: &Type) -> bool {
    !ty.is_opaque()
        && ty
            .base_scalar()
            .is_some_and(|scalar| scalar.is_integer() || scalar == Scalar::Bool)
        && (ty.is_scalar() || ty.is_vector() || ty.is_array())
}

fn is_sub_byte(ty: &Type) -> bool {
    !ty.is_opaque() && ty.base_scalar().is_some_and(Scalar::is_sub_byte)
}

fn memory_tail(name: &str, count: usize) -> Option<Vec<&'static str>> {
    const SCOPE: &str = "gl_ScopeDevice";
    const BOTH: &str = "gl_SemanticsAcquireRelease";
    const ACQUIRE: &str = "gl_SemanticsAcquire";
    let storage = if name.starts_with("imageAtomic") {
        "gl_StorageSemanticsImage"
    } else {
        "gl_StorageSemanticsBuffer"
    };
    let base = match name {
        "atomicLoad" => 1,
        "atomicStore" | "atomicAdd" | "atomicMin" | "atomicMax" | "atomicAnd" | "atomicOr"
        | "atomicXor" | "atomicExchange" => 2,
        "atomicCompSwap" => 3,
        "imageAtomicLoad" => 2,
        "imageAtomicStore"
        | "imageAtomicAdd"
        | "imageAtomicMin"
        | "imageAtomicMax"
        | "imageAtomicAnd"
        | "imageAtomicOr"
        | "imageAtomicXor"
        | "imageAtomicExchange" => 3,
        "imageAtomicCompSwap" => 4,
        "controlBarrier" => {
            return (count == 4).then(|| {
                vec![
                    "gl_ScopeWorkgroup",
                    "gl_ScopeWorkgroup",
                    storage,
                    "gl_SemanticsAcquireRelease",
                ]
            });
        }
        "controlBarrierArrive" => {
            return (count == 4).then(|| {
                vec![
                    "gl_ScopeWorkgroup",
                    "gl_ScopeWorkgroup",
                    storage,
                    "gl_SemanticsRelease",
                ]
            });
        }
        "controlBarrierWait" => {
            return (count == 4)
                .then(|| vec!["gl_ScopeWorkgroup", "gl_ScopeWorkgroup", storage, ACQUIRE]);
        }
        "memoryBarrier" => {
            return (count == 3).then(|| vec![SCOPE, storage, "gl_SemanticsAcquireRelease"]);
        }
        _ => return None,
    };
    let tail = match name {
        "atomicCompSwap" | "imageAtomicCompSwap" => {
            vec![SCOPE, storage, BOTH, storage, ACQUIRE]
        }
        "atomicLoad" | "imageAtomicLoad" => vec![SCOPE, storage, ACQUIRE],
        "atomicStore" | "imageAtomicStore" => vec![SCOPE, storage, "gl_SemanticsRelease"],
        _ => vec![SCOPE, storage, BOTH],
    };
    (count >= base + tail.len()).then_some(tail)
}

fn uses_payload(name: &str) -> bool {
    name.starts_with("traceRay")
        || name.starts_with("hitObjectTrace")
        || name.starts_with("hitObjectExecute")
        || name.starts_with("hitObjectReorderExecute")
        || name.starts_with("executeCallable")
        || name == "traceNV"
}

fn function_shader<'a>(
    builtins: &'a Builtins,
    stage: Stage,
    function: &Function,
    constants: bool,
) -> Result<Shader<'a>, String> {
    let mut shader = Shader::new(builtins, stage);
    let name = function.name.as_str();
    let tail = if constants {
        memory_tail(name, function.parameters.len())
    } else {
        None
    };
    let tail_start = function
        .parameters
        .len()
        .saturating_sub(tail.as_ref().map_or(0, Vec::len));
    if uses_payload(name) {
        let (payload, callable) = if name == "traceNV" || name == "executeCallableNV" {
            ("rayPayloadNV", "callableDataNV")
        } else {
            ("rayPayloadEXT", "callableDataEXT")
        };
        if name.starts_with("executeCallable") {
            shader.globals.push(format!(
                "layout(location = 1) {callable} vec4 rglslCallable;"
            ));
        } else {
            shader
                .globals
                .push(format!("layout(location = 1) {payload} vec4 rglslPayload;"));
        }
    }
    if name.starts_with("hitObject") {
        let attribute = if name.ends_with("NV") {
            "hitObjectAttributeNV"
        } else {
            "hitObjectAttributeEXT"
        };
        shader.globals.push(format!(
            "layout(location = 1) {attribute} vec4 rglslAttribute;"
        ));
    }
    if name.contains("InvocationInterlock") && stage == Stage::Fragment {
        shader
            .globals
            .push(String::from("layout(pixel_interlock_ordered) in;"));
    }
    let memory_first = name.starts_with("atomic") && !name.starts_with("atomicCounter");
    let mut arguments = Vec::new();
    for (position, parameter) in function.parameters.iter().enumerate() {
        let ty = &parameter.ty;
        if let Some(value) = tail
            .as_ref()
            .and_then(|tail| tail.get(position.checked_sub(tail_start)?))
        {
            arguments.push(String::from(*value));
            continue;
        }
        if ty.is_opaque() {
            arguments.push(shader.opaque(ty, position));
            continue;
        }
        if position == 0 && memory_first {
            arguments.push(shader.output(ty));
            continue;
        }
        if position == 0 && name.starts_with("interpolateAt") {
            let spelled = shader.spell(ty);
            shader
                .globals
                .push(format!("layout(location = 0) in {spelled} p0;"));
            arguments.push(String::from("p0"));
            continue;
        }
        match parameter.direction {
            Direction::In => {
                if constants && is_integer_value(ty) {
                    arguments.push(shader.constant(ty));
                } else {
                    arguments.push(shader.input(ty));
                }
            }
            Direction::Out | Direction::Inout => {
                let local = format!("p{position}");
                let spelled = shader.spell(ty);
                if parameter.direction == Direction::Inout {
                    let value = shader.input(ty);
                    shader.body.push(format!("{spelled} {local} = {value};"));
                } else {
                    shader.body.push(format!("{spelled} {local};"));
                }
                let store = shader.store(ty, &local);
                shader.after.push(store);
                arguments.push(local);
            }
        }
    }
    let call = format!("{name}({})", arguments.join(", "));
    if function.return_type.is_void() {
        shader.body.push(format!("{call};"));
    } else {
        let store = shader.store(&function.return_type, &call);
        shader.body.push(store);
    }
    Ok(shader)
}

fn variable_shader<'a>(
    builtins: &'a Builtins,
    stage: Stage,
    name: &str,
    member: Option<usize>,
) -> Result<Shader<'a>, String> {
    let (ty, storage) =
        storage_of(builtins, name).ok_or_else(|| format!("no built-in variable `{name}`"))?;
    let index = if stage == Stage::TessControl && storage == Storage::Out {
        "gl_InvocationID"
    } else {
        "0"
    };
    let mut access = String::from(name);
    let mut current = ty;
    for _ in 0..current.dimensions().len() {
        let _ = write!(access, "[{index}]");
    }
    if let Some(element) =
        (0..current.dimensions().len()).try_fold(current.clone(), |ty, _| ty.element_type())
    {
        current = element;
    }
    if let Some(member) = member {
        let TypeKind::Block(block) = current.kind else {
            return Err(format!("`{name}` is not a block"));
        };
        let field = builtins
            .types()
            .block(block)
            .and_then(|block| block.members.get(member))
            .ok_or_else(|| format!("`{name}` has no member {member}"))?;
        let _ = write!(access, ".{}", field.name);
        current = field.ty.clone();
        for _ in 0..current.dimensions().len() {
            access.push_str("[0]");
        }
        if let Some(element) =
            (0..current.dimensions().len()).try_fold(current.clone(), |ty, _| ty.element_type())
        {
            current = element;
        }
    }
    Ok(access_shader(
        builtins,
        stage,
        &access,
        &current,
        storage == Storage::Out,
    ))
}

fn element_of(ty: &Type) -> Type {
    (0..ty.dimensions().len())
        .try_fold(ty.clone(), |ty, _| ty.element_type())
        .unwrap_or_else(|| ty.clone())
}

fn foreign_shader<'a>(
    builtins: &'a Builtins,
    stage: Stage,
    name: &str,
    ty: &Type,
    output: bool,
) -> Shader<'a> {
    let index = if stage == Stage::TessControl && output {
        "gl_InvocationID"
    } else {
        "0"
    };
    let mut access = String::from(name);
    for _ in 0..ty.dimensions().len() {
        let _ = write!(access, "[{index}]");
    }
    access_shader(builtins, stage, &access, &element_of(ty), output)
}

fn access_shader<'a>(
    builtins: &'a Builtins,
    stage: Stage,
    access: &str,
    current: &Type,
    output: bool,
) -> Shader<'a> {
    let mut shader = Shader::new(builtins, stage);
    if output {
        let value = shader.input(current);
        shader.body.push(format!("{access} = {value};"));
    } else {
        let store = shader.store(current, access);
        shader.body.push(store);
    }
    shader
}

struct Probe {
    required: Vec<String>,
    wants_constants: bool,
    vendor_nv: bool,
}

fn preference(extension: &str, vendor_nv: bool) -> u8 {
    if (vendor_nv && extension.starts_with("GL_NV_")) || extension.starts_with("GL_KHR_") {
        0
    } else if extension.starts_with("GL_EXT_") {
        1
    } else if extension.starts_with("GL_ARB_") {
        2
    } else {
        3
    }
}

pub fn preferred(extensions: &str, vendor_nv: bool) -> Option<String> {
    extensions
        .split(',')
        .map(str::trim)
        .filter(|extension| !extension.is_empty())
        .enumerate()
        .min_by_key(|(position, extension)| (preference(extension, vendor_nv), *position))
        .map(|(_, extension)| extension.to_string())
}

impl Probe {
    fn require(&mut self, extensions: &str) {
        if let Some(chosen) = preferred(extensions, self.vendor_nv)
            && !self.required.contains(&chosen)
        {
            self.required.push(chosen);
        }
    }

    fn require_any(&mut self, extensions: &[rglsl_types::extension::Extension]) {
        let names: Vec<&str> = extensions
            .iter()
            .map(|extension| extension.name())
            .collect();
        self.require(&names.join(","));
    }
}

fn probe(builtins: &Arc<Builtins>, case: &Case, source: &str, spirv: (u8, u8)) -> Probe {
    let options = rglsl_pp::Options {
        stage: Some(case.stage),
        ..rglsl_pp::Options::default()
    };
    let preprocessed = rglsl_pp::preprocess(
        source,
        rglsl_pp::FileId(0),
        &options,
        &mut rglsl_pp::NoIncluder,
    );
    let mut probe = Probe {
        required: Vec::new(),
        wants_constants: false,
        vendor_nv: case.prefers_nv(),
    };
    if preprocessed.has_errors() {
        return probe;
    }
    let text = preprocessed.text.as_str();
    let (unit, failure) = rglsl_ast::parse_prefix(text);
    if let Some(failure) = failure {
        if let rglsl_ast::ParseErrorKind::ExtensionRequired { extensions, .. } = &failure.kind {
            probe.require_any(extensions);
        }
        return probe;
    }
    let options = rglsl_sema::Options {
        spirv_version: Some(spirv),
        end_of_input: u32::try_from(text.len()).ok(),
        require_bindings: true,
        ..rglsl_sema::Options::new(case.stage)
    };
    let analysis = rglsl_sema::analyze_with_builtins(&unit, &options, builtins);
    for diagnostic in &analysis.diagnostics {
        if let DiagnosticKind::ExtensionRequired { extensions, .. } = &diagnostic.kind {
            probe.require_any(extensions);
        } else if diagnostic.kind.to_string().contains("constant") {
            probe.wants_constants = true;
        }
    }
    probe
}

#[derive(Debug, Clone, Default)]
pub struct Hints {
    pub constants: bool,
    pub derivatives: bool,
    pub extensions: Vec<String>,
}

pub fn generate(
    builtins: &Arc<Builtins>,
    case: &Case,
    spirv: (u8, u8),
    hints: &Hints,
) -> Result<Generated, String> {
    let mut constants = hints.constants;
    loop {
        let mut shader = match &case.subject {
            Subject::Function(function) => {
                function_shader(builtins, case.stage, function, constants)?
            }
            Subject::Variable { name, member } => {
                variable_shader(builtins, case.stage, name, *member)?
            }
            Subject::Foreign { access, ty, output } => {
                foreign_shader(builtins, case.stage, access, ty, *output)
            }
        };
        shader.derivatives = hints.derivatives;
        let mut extensions = hints.extensions.clone();
        let mut wants_constants = false;
        for _ in 0..MAX_EXTENSION_ROUNDS {
            let source = shader.finish(case.version, &extensions);
            let found = probe(builtins, case, &source, spirv);
            wants_constants = found.wants_constants;
            let fresh: Vec<String> = found
                .required
                .into_iter()
                .filter(|extension| !extensions.contains(extension))
                .collect();
            if fresh.is_empty() {
                break;
            }
            extensions.extend(fresh);
        }
        if wants_constants && !constants && matches!(case.subject, Subject::Function(_)) {
            constants = true;
            continue;
        }
        return Ok(Generated {
            source: shader.finish(case.version, &extensions),
            extensions,
            constants,
        });
    }
}
