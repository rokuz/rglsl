//! Stage inputs and outputs as global variables (`docs/design/stage-io.md`).
//!
//! The modules are built by hand: these tests cover the IR, the validator and
//! the SPIR-V backend, independently of any front end.

#![cfg(feature = "spv-out")]

use rglsl::{
    back::spv,
    valid::{Capabilities, ValidationFlags, Validator},
    AddressSpace, Binding, BuiltIn, EntryPoint, Expression, Function, GlobalVariable, Handle,
    Module, Scalar, ShaderStage, Span, Statement, StructMember, Type, TypeInner, VectorSize,
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
        self.global(name, space, ty, Some(io))
    }

    fn global(
        &mut self,
        name: &str,
        space: AddressSpace,
        ty: Handle<Type>,
        io: Option<Binding>,
    ) -> Handle<GlobalVariable> {
        self.module.global_variables.append(
            GlobalVariable {
                name: Some(name.into()),
                space,
                binding: None,
                ty,
                init: None,
                memory_decorations: rglsl::MemoryDecorations::empty(),
                io,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
            },
            Span::UNDEFINED,
        )
    }

    fn block_type(
        &mut self,
        name: &str,
        members: &[(&str, Handle<Type>, Binding)],
    ) -> Handle<Type> {
        let members = members
            .iter()
            .enumerate()
            .map(|(index, &(name, ty, ref binding))| StructMember {
                name: Some(name.into()),
                ty,
                binding: Some(binding.clone()),
                offset: 16 * u32::try_from(index).unwrap(),
                matrix_layout: None,
                xfb_offset: None,
                heap: None,
            })
            .collect::<Vec<_>>();
        let span = 16 * u32::try_from(members.len()).unwrap();
        self.module.types.insert(
            Type {
                name: Some(name.into()),
                inner: TypeInner::Struct { members, span },
            },
            Span::UNDEFINED,
        )
    }

    fn block(
        &mut self,
        name: &str,
        space: AddressSpace,
        ty: Handle<Type>,
        io: Option<Binding>,
    ) -> Handle<GlobalVariable> {
        let handle = self.global(name, space, ty, io);
        self.interface.push(handle);
        handle
    }

    fn store_member(
        &mut self,
        block: Handle<GlobalVariable>,
        element: Option<u32>,
        member: u32,
        ty: Handle<Type>,
    ) {
        let expressions = &mut self.function.expressions;
        let mut base = expressions.append(Expression::GlobalVariable(block), Span::UNDEFINED);
        let value = expressions.append(Expression::ZeroValue(ty), Span::UNDEFINED);
        let start = expressions.len();
        if let Some(index) = element {
            base = expressions.append(Expression::AccessIndex { base, index }, Span::UNDEFINED);
        }
        let pointer = expressions.append(
            Expression::AccessIndex {
                base,
                index: member,
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
            transform_feedback: false,
            geometry: None,
            tessellation: None,
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

fn located(location: u32, interpolation: Option<rglsl::Interpolation>) -> Binding {
    Binding::Location {
        location,
        interpolation,
        sampling: interpolation
            .filter(|&i| i != rglsl::Interpolation::Flat)
            .map(|_| rglsl::Sampling::Center),
        blend_src: None,
        per_primitive: false,
        component: None,
        invariant: false,
        patch: false,
    }
}

fn block_location(location: u32) -> Binding {
    located(location, None)
}

pub(crate) fn spirv_val(words: &[u32]) {
    spirv_val_in(words, &["--target-env", "vulkan1.0"]);
}

pub(crate) fn spirv_val_in(words: &[u32], arguments: &[&str]) {
    let validator = std::path::Path::new(concat!(
        env!("CARGO_MANIFEST_DIR"),
        "/../target/oracles/bin/spirv-val"
    ));
    if !validator.exists() {
        println!("spirv-val not found at {}", validator.display());
        return;
    }
    let path = std::env::temp_dir().join(format!(
        "rglsl-stage-io-{}-{:?}.spv",
        std::process::id(),
        std::thread::current().id()
    ));
    let bytes: Vec<u8> = words.iter().flat_map(|word| word.to_le_bytes()).collect();
    std::fs::write(&path, bytes).unwrap();
    let output = std::process::Command::new(validator)
        .args(arguments)
        .arg(&path)
        .output()
        .unwrap();
    let _ = std::fs::remove_file(&path);
    assert!(
        output.status.success(),
        "spirv-val: {}",
        String::from_utf8_lossy(&output.stderr)
    );
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
    spirv_val(&words);
    dr::load_words(words).expect("produced SPIR-V does not parse")
}

fn member_decorations(module: &dr::Module, name: &str) -> Vec<(u32, Decoration, Vec<u32>)> {
    let id = module
        .debug_names
        .iter()
        .find(|inst| {
            inst.class.opcode == Op::Name
                && inst.operands[1] == Operand::LiteralString(name.to_string())
        })
        .unwrap_or_else(|| panic!("nothing named {name}"))
        .operands[0]
        .unwrap_id_ref();
    let mut decorations: Vec<_> = module
        .annotations
        .iter()
        .filter(|inst| {
            inst.class.opcode == Op::MemberDecorate && inst.operands[0] == Operand::IdRef(id)
        })
        .map(|inst| {
            let Operand::LiteralBit32(member) = inst.operands[1] else {
                panic!("OpMemberDecorate without a member");
            };
            let Operand::Decoration(decoration) = inst.operands[2] else {
                panic!("OpMemberDecorate without a decoration");
            };
            let operands = inst.operands[3..]
                .iter()
                .map(|operand| match *operand {
                    Operand::LiteralBit32(value) => value,
                    Operand::BuiltIn(built_in) => built_in as u32,
                    ref other => panic!("unexpected decoration operand {other:?}"),
                })
                .collect();
            (member, decoration, operands)
        })
        .collect();
    decorations.sort_by_key(|&(member, decoration, _)| (member, decoration as u32));
    decorations
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
    rglsl::compact::compact(&mut module, rglsl::compact::KeepUnused::No).unwrap();
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
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
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

fn per_vertex(b: &mut Builder) -> Handle<GlobalVariable> {
    let vec4 = b.vector(VectorSize::Quad);
    let float = b.ty(TypeInner::Scalar(Scalar::F32));
    let distances = b.ty(TypeInner::Array {
        base: float,
        size: rglsl::ArraySize::Constant(1.try_into().unwrap()),
        stride: 4,
    });
    let ty = b.block_type(
        "gl_PerVertex",
        &[
            (
                "gl_Position",
                vec4,
                Binding::BuiltIn(BuiltIn::Position { invariant: true }),
            ),
            ("gl_PointSize", float, Binding::BuiltIn(BuiltIn::PointSize)),
            (
                "gl_ClipDistance",
                distances,
                Binding::BuiltIn(BuiltIn::ClipDistances),
            ),
            (
                "gl_CullDistance",
                distances,
                Binding::BuiltIn(BuiltIn::CullDistance),
            ),
        ],
    );
    b.block("", AddressSpace::Output, ty, None)
}

fn block_module() -> Module {
    let mut b = Builder::new();
    let vec4 = b.vector(VectorSize::Quad);
    let vec3 = b.vector(VectorSize::Tri);
    let vec2 = b.vector(VectorSize::Bi);
    let int = b.ty(TypeInner::Scalar(Scalar::I32));
    let mat2 = b.ty(TypeInner::Matrix {
        columns: VectorSize::Bi,
        rows: VectorSize::Bi,
        scalar: Scalar::F32,
    });
    let perspective = Some(rglsl::Interpolation::Perspective);
    let flat = Some(rglsl::Interpolation::Flat);

    b.variable("a_position", AddressSpace::Input, vec4, location(0));
    let gl = per_vertex(&mut b);

    let members = b.block_type(
        "VS_OUT",
        &[
            ("a", vec4, located(1, perspective)),
            ("b", vec2, located(3, perspective)),
            ("c", int, located(4, flat)),
            ("d", vec4, located(5, Some(rglsl::Interpolation::Linear))),
        ],
    );
    let vs_out = b.block("vs_out", AddressSpace::Output, members, None);

    let centroid = Binding::Location {
        location: 7,
        interpolation: perspective,
        sampling: Some(rglsl::Sampling::Centroid),
        blend_src: None,
        per_primitive: false,
        component: None,
        invariant: false,
        patch: false,
    };
    let located_block = b.block_type(
        "Blk",
        &[
            ("e", vec3, centroid),
            ("m", mat2, located(8, perspective)),
            ("f", vec4, located(10, flat)),
        ],
    );
    let blk = b.block(
        "",
        AddressSpace::Output,
        located_block,
        Some(block_location(7)),
    );

    let element = b.block_type("Arr", &[("t", vec2, located(11, perspective))]);
    let elements = b.ty(TypeInner::Array {
        base: element,
        size: rglsl::ArraySize::Constant(2.try_into().unwrap()),
        stride: 16,
    });
    let arr = b.block(
        "arr",
        AddressSpace::Output,
        elements,
        Some(block_location(11)),
    );

    b.store_member(gl, None, 0, vec4);
    b.store_member(vs_out, None, 2, int);
    b.store_member(blk, None, 1, mat2);
    b.store_member(arr, Some(1), 0, vec2);
    b.finish(ShaderStage::Vertex)
}

#[test]
fn interface_blocks_are_emitted_as_blocks() {
    let module = compile(&block_module());

    for name in ["gl_PerVertex", "VS_OUT", "Blk", "Arr"] {
        assert_eq!(
            decorations(&module, name),
            [(Decoration::Block, vec![])],
            "{name}"
        );
    }
    let built_in = |built_in: spirv::BuiltIn| (Decoration::BuiltIn, vec![built_in as u32]);
    let member =
        |index: u32, (decoration, operands): (Decoration, Vec<u32>)| (index, decoration, operands);
    let location = |location| (Decoration::Location, vec![location]);
    assert_eq!(
        member_decorations(&module, "gl_PerVertex"),
        [
            member(0, built_in(spirv::BuiltIn::Position)),
            member(0, (Decoration::Invariant, vec![])),
            member(1, built_in(spirv::BuiltIn::PointSize)),
            member(2, built_in(spirv::BuiltIn::ClipDistance)),
            member(3, built_in(spirv::BuiltIn::CullDistance)),
        ]
    );
    assert_eq!(
        member_decorations(&module, "VS_OUT"),
        [
            member(0, location(1)),
            member(1, location(3)),
            member(2, (Decoration::Flat, vec![])),
            member(2, location(4)),
            member(3, (Decoration::NoPerspective, vec![])),
            member(3, location(5)),
        ]
    );
    assert!(decorations(&module, "vs_out").is_empty());
    assert_eq!(
        member_decorations(&module, "Blk"),
        [
            member(0, (Decoration::Centroid, vec![])),
            member(2, (Decoration::Flat, vec![])),
        ]
    );
    assert!(member_decorations(&module, "Arr").is_empty());
    assert_eq!(decorations(&module, "arr"), [location(11)]);

    assert!(module.capabilities.iter().all(|inst| !matches!(
        inst.operands[0],
        Operand::Capability(spirv::Capability::ClipDistance | spirv::Capability::CullDistance)
    )));
    assert!(module.annotations.iter().all(|inst| !matches!(
        inst.operands.get(2),
        Some(&Operand::Decoration(Decoration::Offset))
    )));
    let chains = module
        .all_inst_iter()
        .filter(|inst| inst.class.opcode == Op::AccessChain)
        .count();
    assert_eq!(chains, 4);
    let variables = module
        .types_global_values
        .iter()
        .filter(|inst| {
            inst.class.opcode == Op::Variable
                && inst.operands[0] == Operand::StorageClass(StorageClass::Output)
        })
        .count();
    assert_eq!(variables, 4);
    assert_eq!(module.entry_points[0].operands.len() - 3, 5);
}

#[test]
fn fragment_input_blocks() {
    let mut b = Builder::new();
    let vec4 = b.vector(VectorSize::Quad);
    let int = b.ty(TypeInner::Scalar(Scalar::I32));
    let ty = b.block_type(
        "VS_OUT",
        &[
            (
                "a",
                vec4,
                located(2, Some(rglsl::Interpolation::Perspective)),
            ),
            ("c", int, located(3, Some(rglsl::Interpolation::Flat))),
        ],
    );
    let input = b.block("vs_in", AddressSpace::Input, ty, Some(block_location(2)));
    let output = b.variable("o", AddressSpace::Output, vec4, location(0));
    let expressions = &mut b.function.expressions;
    let base = expressions.append(Expression::GlobalVariable(input), Span::UNDEFINED);
    let target = expressions.append(Expression::GlobalVariable(output), Span::UNDEFINED);
    let start = expressions.len();
    let pointer = expressions.append(Expression::AccessIndex { base, index: 0 }, Span::UNDEFINED);
    let value = expressions.append(Expression::Load { pointer }, Span::UNDEFINED);
    let range = expressions.range_from(start);
    b.function
        .body
        .push(Statement::Emit(range), Span::UNDEFINED);
    b.function.body.push(
        Statement::Store {
            pointer: target,
            value,
        },
        Span::UNDEFINED,
    );
    let module = compile(&b.finish(ShaderStage::Fragment));
    assert_eq!(
        decorations(&module, "vs_in"),
        [(Decoration::Location, vec![2])]
    );
    assert_eq!(
        member_decorations(&module, "VS_OUT"),
        [(1, Decoration::Flat, vec![])]
    );
}

#[test]
fn invalid_blocks_are_rejected() {
    let vertex = |build: &dyn Fn(&mut Builder)| {
        let mut b = Builder::new();
        build(&mut b);
        validate(&b.finish(ShaderStage::Vertex))
    };
    let perspective = Some(rglsl::Interpolation::Perspective);

    let error = vertex(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        let ty = b.block_type(
            "Mixed",
            &[
                (
                    "gl_Position",
                    vec4,
                    Binding::BuiltIn(BuiltIn::Position { invariant: false }),
                ),
                ("a", vec4, located(0, perspective)),
            ],
        );
        b.block("", AddressSpace::Output, ty, None);
    })
    .unwrap_err();
    assert!(error.contains("MixedBlockBindings"), "{error}");

    let error = vertex(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        let ty = b.block_type(
            "B",
            &[
                ("a", vec4, located(4, perspective)),
                ("b", vec4, located(6, perspective)),
            ],
        );
        b.block("", AddressSpace::Output, ty, Some(block_location(4)));
    })
    .unwrap_err();
    assert!(error.contains("BlockMemberLocation"), "{error}");

    let error = vertex(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        let ty = b.block_type("B", &[("a", vec4, located(0, perspective))]);
        let array = b.ty(TypeInner::Array {
            base: ty,
            size: rglsl::ArraySize::Constant(2.try_into().unwrap()),
            stride: 16,
        });
        b.block("b", AddressSpace::Output, array, None);
    })
    .unwrap_err();
    assert!(error.contains("MemberLocationInBlockArray"), "{error}");

    let error = vertex(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        let ty = b.block_type("B", &[("a", vec4, located(0, perspective))]);
        let array = b.ty(TypeInner::Array {
            base: ty,
            size: rglsl::ArraySize::Constant(2.try_into().unwrap()),
            stride: 16,
        });
        b.block("b", AddressSpace::Output, array, Some(block_location(0)));
        b.variable("v", AddressSpace::Output, vec4, location(1));
    })
    .unwrap_err();
    assert!(error.contains("BindingCollision"), "{error}");

    let error = vertex(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        per_vertex(b);
        b.variable(
            "gl_Position",
            AddressSpace::Output,
            vec4,
            Binding::BuiltIn(BuiltIn::Position { invariant: false }),
        );
    })
    .unwrap_err();
    assert!(error.contains("DuplicateBuiltIn"), "{error}");

    let error = vertex(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        let ty = b.block_type("B", &[("a", vec4, located(0, None))]);
        b.block("", AddressSpace::Output, ty, None);
    })
    .unwrap_err();
    assert!(error.contains("MissingInterpolation"), "{error}");

    let error = vertex(&|b| {
        let vec4 = b.vector(VectorSize::Quad);
        let ty = b.block_type("B", &[("a", vec4, located(0, perspective))]);
        b.block("", AddressSpace::Output, ty, Some(location(0)));
    })
    .unwrap_err();
    assert!(error.contains("InvalidBlockBinding"), "{error}");
}

fn geometry_info() -> rglsl::GeometryInfo {
    rglsl::GeometryInfo {
        input: rglsl::GeometryInputPrimitive::Triangles,
        output: rglsl::GeometryOutputPrimitive::TriangleStrip,
        max_vertices: 3,
        invocations: 1,
        streams: Vec::new(),
        passthrough: Vec::new(),
    }
}

fn arrayed(b: &mut Builder, base: Handle<Type>, length: u32) -> Handle<Type> {
    b.ty(TypeInner::Array {
        base,
        size: rglsl::ArraySize::Constant(std::num::NonZeroU32::new(length).unwrap()),
        stride: 16,
    })
}

fn patch(location: u32) -> Binding {
    Binding::Location {
        location,
        interpolation: Some(rglsl::Interpolation::Perspective),
        sampling: Some(rglsl::Sampling::Center),
        blend_src: None,
        per_primitive: false,
        component: None,
        invariant: false,
        patch: true,
    }
}

#[test]
fn per_vertex_inputs_take_the_locations_of_one_element() {
    let mut b = Builder::new();
    let vec4 = b.vector(VectorSize::Quad);
    let per_vertex = arrayed(&mut b, vec4, 3);
    b.variable("a", AddressSpace::Input, per_vertex, location(0));
    b.variable("c", AddressSpace::Input, per_vertex, location(1));
    b.variable("o", AddressSpace::Output, vec4, location(0));
    let mut module = b.finish(ShaderStage::Geometry);
    module.entry_points[0].geometry = Some(geometry_info());
    let spirv = compile(&module);
    assert_eq!(decorations(&spirv, "a"), [(Decoration::Location, vec![0])]);
    assert_eq!(decorations(&spirv, "c"), [(Decoration::Location, vec![1])]);
}

#[test]
fn invalid_geometry_and_tessellation_interfaces_are_rejected() {
    let mut b = Builder::new();
    let vec4 = b.vector(VectorSize::Quad);
    b.variable("a", AddressSpace::Input, vec4, location(0));
    let mut module = b.finish(ShaderStage::Geometry);
    module.entry_points[0].geometry = Some(geometry_info());
    let error = validate(&module).unwrap_err();
    assert!(error.contains("ArrayedInterfaceNotArray"), "{error}");

    let mut b = Builder::new();
    let vec4 = b.vector(VectorSize::Quad);
    let per_vertex = arrayed(&mut b, vec4, 3);
    b.variable("a", AddressSpace::Input, per_vertex, location(0));
    let error = validate(&b.finish(ShaderStage::Geometry)).unwrap_err();
    assert!(error.contains("ExpectedGeometryInfo"), "{error}");

    let mut b = Builder::new();
    let vec4 = b.vector(VectorSize::Quad);
    b.variable("p", AddressSpace::Input, vec4, patch(0));
    let error = validate(&b.finish(ShaderStage::Fragment)).unwrap_err();
    assert!(error.contains("patch"), "{error}");

    let mut module = Builder::new().finish(ShaderStage::TessControl);
    let error = validate(&module).unwrap_err();
    assert!(error.contains("ExpectedOutputVertices"), "{error}");
    module.entry_points[0].tessellation = Some(rglsl::TessellationInfo {
        output_vertices: Some(4),
        ..rglsl::TessellationInfo::default()
    });
    validate(&module).unwrap();

    let mut module = Builder::new().finish(ShaderStage::Vertex);
    module.entry_points[0].geometry = Some(geometry_info());
    let error = validate(&module).unwrap_err();
    assert!(error.contains("UnexpectedGeometryInfo"), "{error}");

    let mut b = Builder::new();
    b.function
        .body
        .push(Statement::EmitVertex { stream: None }, Span::UNDEFINED);
    let error = validate(&b.finish(ShaderStage::Vertex)).unwrap_err();
    assert!(error.contains("ForbiddenStageOperations"), "{error}");
}

#[test]
fn patch_outputs_have_their_own_locations() {
    let mut b = Builder::new();
    let vec4 = b.vector(VectorSize::Quad);
    let per_vertex = arrayed(&mut b, vec4, 4);
    b.variable("v", AddressSpace::Output, per_vertex, location(0));
    b.variable("p", AddressSpace::Output, vec4, patch(0));
    let mut module = b.finish(ShaderStage::TessControl);
    module.entry_points[0].tessellation = Some(rglsl::TessellationInfo {
        output_vertices: Some(4),
        ..rglsl::TessellationInfo::default()
    });
    let spirv = compile(&module);
    assert_eq!(
        decorations(&spirv, "p"),
        [
            (Decoration::Patch, Vec::new()),
            (Decoration::Location, vec![0])
        ]
    );
    assert_eq!(decorations(&spirv, "v"), [(Decoration::Location, vec![0])]);
}

#[test]
fn tessellation_levels_are_patch_built_ins() {
    let mut b = Builder::new();
    let float = b.ty(TypeInner::Scalar(Scalar::F32));
    let outer = arrayed(&mut b, float, 4);
    b.variable(
        "gl_TessLevelOuter",
        AddressSpace::Output,
        outer,
        Binding::BuiltIn(BuiltIn::TessLevelOuter),
    );
    let mut module = b.finish(ShaderStage::TessControl);
    module.entry_points[0].tessellation = Some(rglsl::TessellationInfo {
        output_vertices: Some(3),
        ..rglsl::TessellationInfo::default()
    });
    let spirv = compile(&module);
    assert_eq!(
        decorations(&spirv, "gl_TessLevelOuter"),
        [
            (
                Decoration::BuiltIn,
                vec![spirv::BuiltIn::TessLevelOuter as u32]
            ),
            (Decoration::Patch, Vec::new())
        ]
    );
}
