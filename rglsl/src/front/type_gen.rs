/*!
Type generators.
*/

use alloc::{string::ToString, vec};

use crate::{arena::Handle, span::Span};

impl crate::Module {
    /// Make sure the types for the vertex return are in the module's type
    pub fn generate_vertex_return_type(&mut self) -> Handle<crate::Type> {
        if let Some(handle) = self.special_types.ray_vertex_return {
            return handle;
        }
        let ty_vec3f = self.types.insert(
            crate::Type {
                name: None,
                inner: crate::TypeInner::Vector {
                    size: crate::VectorSize::Tri,
                    scalar: crate::Scalar::F32,
                },
            },
            Span::UNDEFINED,
        );
        let array = self.types.insert(
            crate::Type {
                name: None,
                inner: crate::TypeInner::Array {
                    base: ty_vec3f,
                    size: crate::ArraySize::Constant(
                        const { core::num::NonZeroU32::MIN.saturating_add(2) },
                    ),
                    stride: 16,
                },
            },
            Span::UNDEFINED,
        );
        self.special_types.ray_vertex_return = Some(array);
        array
    }

    /// Populate this module's [`SpecialTypes::predeclared_types`] type and return the handle.
    ///
    /// [`SpecialTypes::predeclared_types`]: crate::SpecialTypes::predeclared_types
    pub fn generate_predeclared_type(
        &mut self,
        special_type: crate::PredeclaredType,
    ) -> Handle<crate::Type> {
        if let Some(value) = self.special_types.predeclared_types.get(&special_type) {
            return *value;
        }

        let name = special_type.struct_name();
        let ty = match special_type {
            crate::PredeclaredType::AtomicCompareExchangeWeakResult(scalar) => {
                let bool_ty = self.types.insert(
                    crate::Type {
                        name: None,
                        inner: crate::TypeInner::Scalar(crate::Scalar::BOOL),
                    },
                    Span::UNDEFINED,
                );
                let scalar_ty = self.types.insert(
                    crate::Type {
                        name: None,
                        inner: crate::TypeInner::Scalar(scalar),
                    },
                    Span::UNDEFINED,
                );

                crate::Type {
                    name: Some(name),
                    inner: crate::TypeInner::Struct {
                        members: vec![
                            crate::StructMember {
                                name: Some("old_value".to_string()),
                                ty: scalar_ty,
                                binding: None,
                                offset: 0,
                                matrix_layout: None,
                                xfb_offset: None,
                                heap: None,
                                memory_decorations: crate::MemoryDecorations::empty(),
                                relaxed_precision: false,
                            },
                            crate::StructMember {
                                name: Some("exchanged".to_string()),
                                ty: bool_ty,
                                binding: None,
                                offset: scalar.width as u32,
                                matrix_layout: None,
                                xfb_offset: None,
                                heap: None,
                                memory_decorations: crate::MemoryDecorations::empty(),
                                relaxed_precision: false,
                            },
                        ],
                        span: scalar.width as u32 * 2,
                    },
                }
            }
            crate::PredeclaredType::ModfResult { size, scalar } => {
                let float_ty = self.types.insert(
                    crate::Type {
                        name: None,
                        inner: crate::TypeInner::Scalar(scalar),
                    },
                    Span::UNDEFINED,
                );

                let (member_ty, second_offset) = if let Some(size) = size {
                    let vec_ty = self.types.insert(
                        crate::Type {
                            name: None,
                            inner: crate::TypeInner::Vector { size, scalar },
                        },
                        Span::UNDEFINED,
                    );
                    (vec_ty, size as u32 * scalar.width as u32)
                } else {
                    (float_ty, scalar.width as u32)
                };

                crate::Type {
                    name: Some(name),
                    inner: crate::TypeInner::Struct {
                        members: vec![
                            crate::StructMember {
                                name: Some("fract".to_string()),
                                ty: member_ty,
                                binding: None,
                                offset: 0,
                                matrix_layout: None,
                                xfb_offset: None,
                                heap: None,
                                memory_decorations: crate::MemoryDecorations::empty(),
                                relaxed_precision: false,
                            },
                            crate::StructMember {
                                name: Some("whole".to_string()),
                                ty: member_ty,
                                binding: None,
                                offset: second_offset,
                                matrix_layout: None,
                                xfb_offset: None,
                                heap: None,
                                memory_decorations: crate::MemoryDecorations::empty(),
                                relaxed_precision: false,
                            },
                        ],
                        span: second_offset * 2,
                    },
                }
            }
            crate::PredeclaredType::FrexpResult { size, scalar } => {
                let float_ty = self.types.insert(
                    crate::Type {
                        name: None,
                        inner: crate::TypeInner::Scalar(scalar),
                    },
                    Span::UNDEFINED,
                );

                let int_ty = self.types.insert(
                    crate::Type {
                        name: None,
                        inner: crate::TypeInner::Scalar(crate::Scalar::I32),
                    },
                    Span::UNDEFINED,
                );

                let (fract_member_ty, exp_member_ty, second_offset) = if let Some(size) = size {
                    let vec_float_ty = self.types.insert(
                        crate::Type {
                            name: None,
                            inner: crate::TypeInner::Vector { size, scalar },
                        },
                        Span::UNDEFINED,
                    );
                    let vec_int_ty = self.types.insert(
                        crate::Type {
                            name: None,
                            inner: crate::TypeInner::Vector {
                                size,
                                scalar: crate::Scalar::I32,
                            },
                        },
                        Span::UNDEFINED,
                    );
                    (vec_float_ty, vec_int_ty, size as u32)
                } else {
                    (float_ty, int_ty, 1)
                };
                let fract_size = second_offset * scalar.width as u32;
                let second_offset = fract_size.next_multiple_of(4);
                let span = (second_offset + fract_size.div_ceil(scalar.width as u32) * 4)
                    .next_multiple_of(u32::from(scalar.width).max(4));

                crate::Type {
                    name: Some(name),
                    inner: crate::TypeInner::Struct {
                        members: vec![
                            crate::StructMember {
                                name: Some("fract".to_string()),
                                ty: fract_member_ty,
                                binding: None,
                                offset: 0,
                                matrix_layout: None,
                                xfb_offset: None,
                                heap: None,
                                memory_decorations: crate::MemoryDecorations::empty(),
                                relaxed_precision: false,
                            },
                            crate::StructMember {
                                name: Some("exp".to_string()),
                                ty: exp_member_ty,
                                binding: None,
                                offset: second_offset,
                                matrix_layout: None,
                                xfb_offset: None,
                                heap: None,
                                memory_decorations: crate::MemoryDecorations::empty(),
                                relaxed_precision: false,
                            },
                        ],
                        span,
                    },
                }
            }
            crate::PredeclaredType::F32Array { size, length } => {
                let scalar = crate::Scalar::F32;
                let inner = match size {
                    Some(size) => crate::TypeInner::Vector { size, scalar },
                    None => crate::TypeInner::Scalar(scalar),
                };
                let stride = match size {
                    Some(crate::VectorSize::Bi) => 8,
                    Some(crate::VectorSize::Tri | crate::VectorSize::Quad) => 16,
                    None => 4,
                };
                let base = self
                    .types
                    .insert(crate::Type { name: None, inner }, Span::UNDEFINED);
                crate::Type {
                    name: None,
                    inner: crate::TypeInner::Array {
                        base,
                        size: crate::ArraySize::Constant(length),
                        stride,
                    },
                }
            }
            crate::PredeclaredType::WideResult { size, scalar } => {
                let inner = match size {
                    Some(size) => crate::TypeInner::Vector { size, scalar },
                    None => crate::TypeInner::Scalar(scalar),
                };
                let width = u32::from(scalar.width);
                let second_offset = size.map_or(width, |size| size as u32 * width);
                let member_ty = self
                    .types
                    .insert(crate::Type { name: None, inner }, Span::UNDEFINED);
                let member = |name: &str, offset: u32| crate::StructMember {
                    name: Some(name.to_string()),
                    ty: member_ty,
                    binding: None,
                    offset,
                    matrix_layout: None,
                    xfb_offset: None,
                    heap: None,
                    memory_decorations: crate::MemoryDecorations::empty(),
                    relaxed_precision: false,
                };
                crate::Type {
                    name: Some(name),
                    inner: crate::TypeInner::Struct {
                        members: vec![member("low", 0), member("high", second_offset)],
                        span: second_offset * 2,
                    },
                }
            }
        };

        let handle = self.types.insert(ty, Span::UNDEFINED);
        self.special_types
            .predeclared_types
            .insert(special_type, handle);
        handle
    }
}
