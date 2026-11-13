use alloc::vec::Vec;

use arrayvec::ArrayVec;
use spirv::Word;

use crate::{Handle, UniqueArena};

pub(super) fn bytes_to_words(bytes: &[u8]) -> Vec<Word> {
    bytes
        .chunks(4)
        .map(|chars| chars.iter().rev().fold(0u32, |u, c| (u << 8) | *c as u32))
        .collect()
}

pub(super) fn string_to_words(input: &str) -> Vec<Word> {
    let bytes = input.as_bytes();

    str_bytes_to_words(bytes)
}

pub(super) fn str_bytes_to_words(bytes: &[u8]) -> Vec<Word> {
    let mut words = bytes_to_words(bytes);
    if bytes.len().is_multiple_of(4) {
        // nul-termination
        words.push(0x0u32);
    }

    words
}

pub(super) const fn map_storage_class(space: crate::AddressSpace) -> spirv::StorageClass {
    match space {
        crate::AddressSpace::Handle => spirv::StorageClass::UniformConstant,
        crate::AddressSpace::Function => spirv::StorageClass::Function,
        crate::AddressSpace::Private => spirv::StorageClass::Private,
        crate::AddressSpace::Storage { .. } => spirv::StorageClass::StorageBuffer,
        crate::AddressSpace::Uniform => spirv::StorageClass::Uniform,
        crate::AddressSpace::WorkGroup => spirv::StorageClass::Workgroup,
        crate::AddressSpace::Immediate => spirv::StorageClass::PushConstant,
        crate::AddressSpace::TaskPayload => spirv::StorageClass::TaskPayloadWorkgroupEXT,
        // We can't require capabilities here but we request capabilities on the ray pipeline stages
        // and when writing global variables - global variables because we may be writing an
        // uncompacted module and pipeline stages for all other cases because these can only be
        //accessed in a ray tracing pipeline stage.
        crate::AddressSpace::RayPayload => spirv::StorageClass::RayPayloadKHR,
        crate::AddressSpace::IncomingRayPayload => spirv::StorageClass::IncomingRayPayloadKHR,
        crate::AddressSpace::HitAttribute => spirv::StorageClass::HitAttributeKHR,
        crate::AddressSpace::CallableData => spirv::StorageClass::CallableDataKHR,
        crate::AddressSpace::IncomingCallableData => spirv::StorageClass::IncomingCallableDataKHR,
        crate::AddressSpace::HitObjectAttribute {
            kind: crate::HitObjectKind::Nv,
        } => spirv::StorageClass::HitObjectAttributeNV,
        crate::AddressSpace::HitObjectAttribute {
            kind: crate::HitObjectKind::Ext,
        } => spirv::StorageClass::HitObjectAttributeEXT,
        crate::AddressSpace::ShaderRecord => spirv::StorageClass::ShaderRecordBufferKHR,
        crate::AddressSpace::Input => spirv::StorageClass::Input,
        crate::AddressSpace::Output => spirv::StorageClass::Output,
        crate::AddressSpace::PhysicalStorage { .. } => spirv::StorageClass::PhysicalStorageBuffer,
        crate::AddressSpace::DescriptorHeap(_) => spirv::StorageClass::UniformConstant,
    }
}

pub(super) fn contains_builtin(
    binding: Option<&crate::Binding>,
    ty: Handle<crate::Type>,
    arena: &UniqueArena<crate::Type>,
    built_in: crate::BuiltIn,
) -> bool {
    let mut pending = Vec::from([(binding, ty)]);
    while let Some((binding, ty)) = pending.pop() {
        if let Some(&crate::Binding::BuiltIn(bi)) = binding {
            if bi == built_in {
                return true;
            }
        } else if let crate::TypeInner::Struct { ref members, .. } = arena[ty].inner {
            pending.extend(
                members
                    .iter()
                    .rev()
                    .map(|member| (member.binding.as_ref(), member.ty)),
            );
        }
    }
    false
}

impl crate::AddressSpace {
    pub(super) const fn to_spirv_semantics_and_scope(
        self,
    ) -> (spirv::MemorySemantics, spirv::Scope) {
        match self {
            Self::Storage { .. } => (spirv::MemorySemantics::empty(), spirv::Scope::Device),
            Self::WorkGroup => (spirv::MemorySemantics::empty(), spirv::Scope::Workgroup),
            Self::Uniform => (spirv::MemorySemantics::empty(), spirv::Scope::Device),
            Self::Handle => (spirv::MemorySemantics::empty(), spirv::Scope::Device),
            _ => (spirv::MemorySemantics::empty(), spirv::Scope::Invocation),
        }
    }
}

/// Return true if the global requires a type decorated with `Block`.
///
/// See [`back::spv::GlobalVariable`] for details.
///
/// [`back::spv::GlobalVariable`]: super::GlobalVariable
pub fn global_needs_wrapper(ir_module: &crate::Module, var: &crate::GlobalVariable) -> bool {
    match var.space {
        crate::AddressSpace::Uniform
        | crate::AddressSpace::Storage { .. }
        | crate::AddressSpace::ShaderRecord
        | crate::AddressSpace::Immediate => {}
        _ => return false,
    };
    match ir_module.types[var.ty].inner {
        crate::TypeInner::Struct { .. } => is_nested_type(ir_module, var.ty),
        crate::TypeInner::BindingArray { .. } => false,
        _ => true,
    }
}

fn is_nested_type(ir_module: &crate::Module, ty: Handle<crate::Type>) -> bool {
    ir_module.types.iter().any(|(_, other)| match other.inner {
        crate::TypeInner::Array { base, .. } => base == ty,
        crate::TypeInner::Struct { ref members, .. } => {
            members.iter().any(|member| member.ty == ty)
        }
        _ => false,
    })
}

#[derive(Debug)]
pub enum BindingDecorations {
    BuiltIn(spirv::BuiltIn, ArrayVec<spirv::Decoration, 2>),
    Location {
        location: u32,
        others: ArrayVec<spirv::Decoration, 7>,
        /// If this is `Some`, use Decoration::Index with blend_src as an operand
        blend_src: Option<Word>,
        /// If this is `Some`, use Decoration::Component with it as an operand
        component: Option<Word>,
    },
    None,
}
