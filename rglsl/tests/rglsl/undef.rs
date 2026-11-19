use rglsl::{
    AddressSpace, ArraySize, Binding, EntryPoint, Expression, Function, GlobalVariable, Handle,
    Literal, Module, Scalar, ShaderStage, Span, Statement, Type, TypeInner, VectorSize,
    back::spv,
    valid::{ValidationFlags, Validator},
};
use rspirv::dr;
use spirv::Op;

use crate::{TestResult, rejected};

struct Shader {
    module: Module,
    function: Function,
    output: Handle<GlobalVariable>,
    float: Handle<Type>,
    vector: Handle<Type>,
}

impl Shader {
    fn new() -> Self {
        let mut module = Module::default();
        let float = module.types.insert(
            Type {
                name: None,
                inner: TypeInner::Scalar(Scalar::F32),
            },
            Span::UNDEFINED,
        );
        let vector = module.types.insert(
            Type {
                name: None,
                inner: TypeInner::Vector {
                    size: VectorSize::Quad,
                    scalar: Scalar::F32,
                },
            },
            Span::UNDEFINED,
        );
        let output = module.global_variables.append(
            GlobalVariable {
                name: Some("color".into()),
                space: AddressSpace::Output,
                binding: None,
                ty: vector,
                init: None,
                io: Some(Binding::Location {
                    location: 0,
                    interpolation: None,
                    sampling: None,
                    blend_src: None,
                    per_primitive: false,
                    component: None,
                    invariant: false,
                    patch: false,
                    per_view: false,
                    passthrough: false,
                }),
                memory_decorations: rglsl::MemoryDecorations::empty(),
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            Span::UNDEFINED,
        );
        Self {
            module,
            function: Function::default(),
            output,
            float,
            vector,
        }
    }

    fn store(&mut self, components: Vec<Handle<Expression>>) {
        let expressions = &mut self.function.expressions;
        let pointer = expressions.append(Expression::GlobalVariable(self.output), Span::UNDEFINED);
        let start = expressions.len();
        let value = expressions.append(
            Expression::Compose {
                ty: self.vector,
                components,
            },
            Span::UNDEFINED,
        );
        let range = expressions.range_from(start);
        self.function
            .body
            .push(Statement::Emit(range), Span::UNDEFINED);
        self.function
            .body
            .push(Statement::Store { pointer, value }, Span::UNDEFINED);
    }

    fn finish(mut self) -> Module {
        self.function
            .body
            .push(Statement::Return { value: None }, Span::UNDEFINED);
        self.module.entry_points.push(EntryPoint {
            name: "main".into(),
            stage: ShaderStage::Fragment,
            early_depth_test: None,
            workgroup_size: [0; 3],
            workgroup_size_overrides: None,
            workgroup_size_builtin: false,
            function: self.function,
            task_payload: None,
            incoming_ray_payload: None,
            interface: vec![self.output],
            transform_feedback: false,
            opacity_micromap: None,
            quad_control: rglsl::QuadControl::default(),
            fragment_modes: rglsl::FragmentModes::default(),
            geometry: None,
            tessellation: None,
            mesh_shader: None,
            tile_shading: rglsl::TileShading::default(),
            derivative_group: None,
            spirv_execution_modes: Vec::new(),
            reconvergence: rglsl::Reconvergence::default(),
            invariant_outputs: false,
        });
        self.module
    }
}

fn undefined_shader() -> Module {
    let mut shader = Shader::new();
    let expressions = &mut shader.function.expressions;
    let first = expressions.append(Expression::Undef(shader.float), Span::UNDEFINED);
    let second = expressions.append(Expression::Undef(shader.float), Span::UNDEFINED);
    let one = expressions.append(Expression::Literal(Literal::F32(1.0)), Span::UNDEFINED);
    shader.store(vec![first, second, one, one]);
    shader.finish()
}

#[test]
fn the_backend_writes_undefined_numbers_as_one_null_constant_per_type() -> TestResult {
    let module = undefined_shader();
    let info = Validator::new(ValidationFlags::all()).validate(&module)?;
    let words = spv::write_vec(&module, &info, &spv::Options::default(), None)?;
    let parsed = dr::load_words(&words).map_err(|error| error.to_string())?;
    let globals = |opcode: Op| {
        parsed
            .types_global_values
            .iter()
            .filter(move |instruction| instruction.class.opcode == opcode)
    };
    assert_eq!(globals(Op::Undef).count(), 0);
    let nulls: Vec<&dr::Instruction> = globals(Op::ConstantNull).collect();
    assert_eq!(nulls.len(), 1);
    let null = nulls.first().ok_or("no OpConstantNull")?;
    let composite = parsed
        .functions
        .iter()
        .flat_map(|function| &function.blocks)
        .flat_map(|block| &block.instructions)
        .find(|instruction| instruction.class.opcode == Op::CompositeConstruct)
        .ok_or("no OpCompositeConstruct")?;
    let id = null.result_id.ok_or("OpConstantNull without a result")?;
    let uses = composite
        .operands
        .iter()
        .filter(|operand| **operand == dr::Operand::IdRef(id))
        .count();
    assert_eq!(uses, 2);
    Ok(())
}

#[test]
fn an_undefined_value_needs_a_sized_data_type() -> TestResult {
    let mut shader = Shader::new();
    let runtime = shader.module.types.insert(
        Type {
            name: None,
            inner: TypeInner::Array {
                base: shader.float,
                size: ArraySize::Dynamic,
                stride: 4,
            },
        },
        Span::UNDEFINED,
    );
    shader
        .function
        .expressions
        .append(Expression::Undef(runtime), Span::UNDEFINED);
    let module = shader.finish();
    let error = rejected(Validator::new(ValidationFlags::all()).validate(&module))?;
    assert!(
        format!("{error:?}").contains("InvalidUndef"),
        "unexpected error: {error:?}"
    );
    Ok(())
}

#[test]
fn an_undefined_value_names_an_existing_type() -> TestResult {
    let mut other = Module::default();
    let mut missing = None;
    for width in [2, 4, 8] {
        missing = Some(other.types.insert(
            Type {
                name: None,
                inner: TypeInner::Scalar(Scalar {
                    kind: rglsl::ScalarKind::Float,
                    width,
                }),
            },
            Span::UNDEFINED,
        ));
    }
    let missing = missing.ok_or("no type")?;
    let mut shader = Shader::new();
    shader
        .function
        .expressions
        .append(Expression::Undef(missing), Span::UNDEFINED);
    let module = shader.finish();
    rejected(Validator::new(ValidationFlags::all()).validate(&module))?;
    Ok(())
}

#[test]
fn an_undefined_value_is_not_a_constant_expression() -> TestResult {
    let mut shader = Shader::new();
    let float = shader.float;
    shader
        .module
        .global_expressions
        .append(Expression::Undef(float), Span::UNDEFINED);
    let module = shader.finish();
    rejected(Validator::new(ValidationFlags::all()).validate(&module))?;
    Ok(())
}

#[test]
fn an_undefined_value_survives_an_object_file_round_trip() -> TestResult {
    let module = undefined_shader();
    let text = rglsl_types::rglo::to_string(&module);
    assert!(text.contains("Undef"), "no Undef in {text}");
    let decoded: Module = rglsl_types::rglo::from_str(&text)?;
    let function = &decoded
        .entry_points
        .first()
        .ok_or("no entry point")?
        .function;
    let undefs = function
        .expressions
        .iter()
        .filter(|&(_, expression)| matches!(*expression, Expression::Undef(_)))
        .count();
    assert_eq!(undefs, 2);
    assert_eq!(rglsl_types::rglo::to_string(&decoded), text);
    Ok(())
}
