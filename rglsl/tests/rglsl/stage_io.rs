//! Stage inputs and outputs as global variables (`docs/design/stage-io.md`).
//!
//! The modules are built by hand: these tests cover the IR, the validator and
//! the SPIR-V backend, independently of any front end.

#![cfg(feature = "spv-out")]

use rglsl::{
    back::spv,
    valid::{Capabilities, ValidationFlags, Validator},
    AddressSpace, Binding, BuiltIn, EntryPoint, Expression, Function, GlobalVariable, Handle,
    Module, Scalar, ShaderStage, Span, Statement, Type, TypeInner, VectorSize,
};
use rspirv::dr::{self, Operand};
use spirv::{Decoration, Op, StorageClass};

/// A module under construction, with one entry point.
struct Builder {
    module: Module,
    function: Function,
    interface: Vec<Handle<GlobalVariable>>,
}

impl Builder {
    fn new() -> Self {
        Self {
            module: Module::default(),
            function: Function::default(),
            interface: Vec::new(),
        }
    }

    fn ty(&mut self, inner: TypeInner) -> Handle<Type> {
        self.module
            .types
            .insert(Type { name: None, inner }, Span::UNDEFINED)
    }

    fn vector(&mut self, size: VectorSize) -> Handle<Type> {
        self.ty(TypeInner::Vector {
            size,
            scalar: Scalar::F32,
        })
    }

    /// Declares an input or output variable and adds it to the interface.
    fn variable(
        &mut self,
        name: &str,
        space: AddressSpace,
        ty: Handle<Type>,
        io: Binding,
    ) -> Handle<GlobalVariable> {
        let handle = self.declare(name, space, ty, io);
        self.interface.push(handle);
        handle
    }

    /// Declares an input or output variable without adding it to the interface.
    fn declare(
        &mut self,
        name: &str,
        space: AddressSpace,
        ty: Handle<Type>,
        io: Binding,
    ) -> Handle<GlobalVariable> {
        self.module.global_variables.append(
            GlobalVariable {
                name: Some(name.into()),
                space,
                binding: None,
                ty,
                init: None,
                memory_decorations: rglsl::MemoryDecorations::empty(),
                io: Some(io),
            },
            Span::UNDEFINED,
        )
    }

    /// Appends `*to = *from;` to the entry point.
    fn copy(&mut self, from: Handle<GlobalVariable>, to: Handle<GlobalVariable>) {
        let expressions = &mut self.function.expressions;
        let source = expressions.append(Expression::GlobalVariable(from), Span::UNDEFINED);
        let target = expressions.append(Expression::GlobalVariable(to), Span::UNDEFINED);
        let start = expressions.len();
        let value = expressions.append(Expression::Load { pointer: source }, Span::UNDEFINED);
        let range = expressions.range_from(start);
        self.function
            .body
            .push(Statement::Emit(range), Span::UNDEFINED);
        self.function.body.push(
            Statement::Store {
                pointer: target,
                value,
            },
            Span::UNDEFINED,
        );
    }

    fn finish(mut self, stage: ShaderStage) -> Module {
        self.function
            .body
            .push(Statement::Return { value: None }, Span::UNDEFINED);
        self.module.entry_points.push(EntryPoint {
            name: "main".into(),
            stage,
            early_depth_test: None,
            workgroup_size: [0; 3],
            workgroup_size_overrides: None,
            function: self.function,
            mesh_info: None,
            task_payload: None,
            incoming_ray_payload: None,
            interface: self.interface,
        });
        self.module
    }
}

fn location(location: u32) -> Binding {
    Binding::Location {
        location,
        interpolation: Some(rglsl::Interpolation::Perspective),
        sampling: Some(rglsl::Sampling::Center),
        blend_src: None,
        per_primitive: false,
        component: None,
        invariant: false,
        patch: false,
    }
}

fn validate(module: &Module) -> Result<rglsl::valid::ModuleInfo, String> {
    Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(module)
        .map_err(|error| format!("{:?}", error.into_inner()))
}

fn compile(module: &Module) -> dr::Module {
    let info = validate(module).unwrap_or_else(|error| panic!("invalid module: {error}"));
    let options = spv::Options {
        flags: spv::WriterFlags::DEBUG,
        ..spv::Options::default()
    };
    let words = spv::write_vec(module, &info, &options, None).expect("SPIR-V backend failed");
    dr::load_words(words).expect("produced SPIR-V does not parse")
}

/// The decorations of the variable named `name`, with their literal operands.
fn decorations(module: &dr::Module, name: &str) -> Vec<(Decoration, Vec<u32>)> {
    let id = module
        .debug_names
        .iter()
        .find(|inst| {
            inst.class.opcode == Op::Name
                && inst.operands[1] == Operand::LiteralString(name.to_string())
        })
        .unwrap_or_else(|| panic!("no variable named {name}"))
        .operands[0]
        .unwrap_id_ref();
    let mut decorations: Vec<_> = module
        .annotations
        .iter()
        .filter(|inst| inst.class.opcode == Op::Decorate && inst.operands[0] == Operand::IdRef(id))
        .map(|inst| {
            let Operand::Decoration(decoration) = inst.operands[1] else {
                panic!("OpDecorate without a decoration");
            };
            let operands = inst.operands[2..]
                .iter()
                .map(|operand| match *operand {
                    Operand::LiteralBit32(value) => value,
                    Operand::BuiltIn(built_in) => built_in as u32,
                    ref other => panic!("unexpected decoration operand {other:?}"),
                })
                .collect();
            (decoration, operands)
        })
        .collect();
    decorations.sort_by_key(|&(decoration, _)| decoration as u32);
    decorations
}

/// A vertex shader whose interface has every supported shape of variable.
fn vertex_module() -> Module {
    let mut b = Builder::new();
    let vec4 = b.vector(VectorSize::Quad);
    let vec2 = b.vector(VectorSize::Bi);
    let float = b.ty(TypeInner::Scalar(Scalar::F32));
    let mat3 = b.ty(TypeInner::Matrix {
        columns: VectorSize::Tri,
        rows: VectorSize::Tri,
        scalar: Scalar::F32,
    });
    let floats = b.ty(TypeInner::Array {
        base: float,
        size: rglsl::ArraySize::Constant(2.try_into().unwrap()),
        stride: 4,
    });

    let a_position = b.variable("a_position", AddressSpace::Input, vec4, location(0));
    b.variable("a_unused", AddressSpace::Input, vec2, location(1));
    let a_basis = b.variable("a_basis", AddressSpace::Input, mat3, location(2));
    let a_weights = b.variable("a_weights", AddressSpace::Input, floats, location(5));

    let position = b.variable(
        "gl_Position",
        AddressSpace::Output,
        vec4,
        Binding::BuiltIn(BuiltIn::Position { invariant: false }),
    );
    // A matrix takes one location per column: 0, 1 and 2.
    let v_basis = b.variable("v_basis", AddressSpace::Output, mat3, location(0));
    // An array takes one location per element: 3 and 4.
    let v_weights = b.variable("v_weights", AddressSpace::Output, floats, location(3));
    // Two variables share location 5 through different components.
    let Binding::Location {
        location: _,
        interpolation,
        sampling,
        ..
    } = location(5)
    else {
        unreachable!()
    };
    let shared = |component, invariant| Binding::Location {
        location: 5,
        interpolation,
        sampling,
        blend_src: None,
        per_primitive: false,
        component: Some(component),
        invariant,
        patch: false,
    };
    b.variable("v_uv", AddressSpace::Output, vec2, shared(0, false));
    b.variable("v_fade", AddressSpace::Output, float, shared(2, true));

    b.copy(a_position, position);
    b.copy(a_basis, v_basis);
    b.copy(a_weights, v_weights);
    b.finish(ShaderStage::Vertex)
}

#[test]
fn interface_variables_are_emitted_directly() {
    let module = compile(&vertex_module());

    let location = |location| (Decoration::Location, vec![location]);
    let component = |component| (Decoration::Component, vec![component]);
    assert_eq!(decorations(&module, "a_position"), [location(0)]);
    assert_eq!(decorations(&module, "a_unused"), [location(1)]);
    assert_eq!(decorations(&module, "a_basis"), [location(2)]);
    assert_eq!(decorations(&module, "a_weights"), [location(5)]);
    assert_eq!(
        decorations(&module, "gl_Position"),
        [(Decoration::BuiltIn, vec![spirv::BuiltIn::Position as u32])]
    );
    assert_eq!(decorations(&module, "v_basis"), [location(0)]);
    assert_eq!(decorations(&module, "v_weights"), [location(3)]);
    assert_eq!(decorations(&module, "v_uv"), [location(5), component(0)]);
    assert_eq!(
        decorations(&module, "v_fade"),
        [(Decoration::Invariant, vec![]), location(5), component(2)]
    );

    // Every variable is declared once, in its own storage class, and listed
    // by the entry point, including the input the code does not use.
    let variables = |class: StorageClass| {
        module
            .types_global_values
            .iter()
            .filter(|inst| {
                inst.class.opcode == Op::Variable
                    && inst.operands[0] == Operand::StorageClass(class)
            })
            .count()
    };
    assert_eq!(variables(StorageClass::Input), 4);
    assert_eq!(variables(StorageClass::Output), 5);
    assert_eq!(variables(StorageClass::Private), 0);
    let entry_point = &module.entry_points[0];
    // Execution model, function, name, then the interface.
    assert_eq!(entry_point.operands.len() - 3, 9);
}

#[test]
fn compact_keeps_the_interface() {
    let mut module = vertex_module();
    rglsl::compact::compact(&mut module, rglsl::compact::KeepUnused::No);
    let names: Vec<_> = module.entry_points[0]
        .interface
        .iter()
        .map(|&handle| module.global_variables[handle].name.clone().unwrap())
        .collect();
    assert_eq!(names.len(), 9);
    assert!(names.contains(&"a_unused".to_string()));
    compile(&module);
}

#[test]
fn invalid_interfaces_are_rejected() {
    let fragment = |build: &dyn Fn(&mut Builder)| {
        let mut b = Builder::new();
        build(&mut b);
        validate(&b.finish(ShaderStage::Fragment))
    };

    // Overlapping locations: a mat3 at 0 covers 0..=2.
    let error = fragment(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        let mat3 = b.ty(TypeInner::Matrix {
            columns: VectorSize::Tri,
            rows: VectorSize::Tri,
            scalar: Scalar::F32,
        });
        b.variable("m", AddressSpace::Input, mat3, location(0));
        b.variable("v", AddressSpace::Input, vec4, location(2));
    })
    .unwrap_err();
    assert!(error.contains("BindingCollision"), "{error}");

    // Inputs and outputs have separate locations.
    fragment(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        b.variable("i", AddressSpace::Input, vec4, location(0));
        b.variable("o", AddressSpace::Output, vec4, location(0));
    })
    .unwrap();

    // A variable the code uses must be listed.
    let error = fragment(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        let input = b.declare("i", AddressSpace::Input, vec4, location(0));
        let output = b.variable("o", AddressSpace::Output, vec4, location(0));
        b.copy(input, output);
    })
    .unwrap_err();
    assert!(error.contains("NotInInterface"), "{error}");

    // An input cannot be written.
    let error = fragment(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        let a = b.variable("a", AddressSpace::Input, vec4, location(0));
        let c = b.variable("c", AddressSpace::Input, vec4, location(1));
        b.copy(a, c);
    })
    .unwrap_err();
    assert!(
        error.contains("InvalidStorePointer") || error.contains("Store"),
        "{error}"
    );

    // Only inputs and outputs belong in an interface.
    let error = fragment(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        let private = b.module.global_variables.append(
            GlobalVariable {
                name: Some("p".into()),
                space: AddressSpace::Private,
                binding: None,
                ty: vec4,
                init: None,
                memory_decorations: rglsl::MemoryDecorations::empty(),
                io: None,
            },
            Span::UNDEFINED,
        );
        b.interface.push(private);
    })
    .unwrap_err();
    assert!(error.contains("InterfaceNotInputOrOutput"), "{error}");

    // A built-in in the wrong stage.
    let error = fragment(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        b.variable(
            "gl_Position",
            AddressSpace::Output,
            vec4,
            Binding::BuiltIn(BuiltIn::Position { invariant: false }),
        );
    })
    .unwrap_err();
    assert!(error.contains("InvalidBuiltInStage"), "{error}");

    // A component that does not leave room for the value.
    let error = fragment(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        let Binding::Location {
            interpolation,
            sampling,
            ..
        } = location(0)
        else {
            unreachable!()
        };
        b.variable(
            "v",
            AddressSpace::Input,
            vec4,
            Binding::Location {
                location: 0,
                interpolation,
                sampling,
                blend_src: None,
                per_primitive: false,
                component: Some(1),
                invariant: false,
                patch: false,
            },
        );
    })
    .unwrap_err();
    assert!(error.contains("InvalidComponent"), "{error}");
}
