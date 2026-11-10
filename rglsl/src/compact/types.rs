use super::{BadHandle, HandleSet, ModuleMap};
use crate::Handle;

pub struct TypeTracer<'a> {
    pub overrides: &'a crate::Arena<crate::Override>,
    pub types_used: &'a mut HandleSet<crate::Type>,
    pub expressions_used: &'a mut HandleSet<crate::Expression>,
    pub overrides_used: &'a mut HandleSet<crate::Override>,
}

impl TypeTracer<'_> {
    fn trace_cooperative_size(&mut self, size: crate::CooperativeSize) {
        if let crate::CooperativeSize::Pending(handle) = size {
            self.overrides_used.insert(handle);
            let r#override = &self.overrides[handle];
            self.types_used.insert(r#override.ty);
            if let Some(expr) = r#override.init {
                self.expressions_used.insert(expr);
            }
        }
    }

    pub fn trace_type(&mut self, ty: &crate::Type) {
        use crate::TypeInner as Ti;
        match ty.inner {
            // Types that do not contain handles.
            Ti::Scalar { .. }
            | Ti::Vector { .. }
            | Ti::Matrix { .. }
            | Ti::Atomic { .. }
            | Ti::ValuePointer { .. }
            | Ti::Image { .. }
            | Ti::SampledImage { .. }
            | Ti::Sampler { .. }
            | Ti::AccelerationStructure { .. }
            | Ti::RayQuery { .. } => {}

            Ti::CooperativeMatrix {
                columns,
                rows,
                scope,
                ..
            } => {
                for size in [columns, rows, scope] {
                    self.trace_cooperative_size(size);
                }
            }
            Ti::LongVector { size, .. } => self.trace_cooperative_size(size),
            Ti::TensorLayout {
                dimensions,
                clamp_mode,
            } => {
                self.trace_cooperative_size(dimensions);
                if let Some(clamp_mode) = clamp_mode {
                    self.trace_cooperative_size(clamp_mode);
                }
            }
            Ti::TensorView { dimensions, .. } => self.trace_cooperative_size(dimensions),

            // Types that do contain handles.
            Ti::Array {
                base,
                size,
                stride: _,
            }
            | Ti::BindingArray { base, size } => {
                self.types_used.insert(base);
                match size {
                    crate::ArraySize::Pending(handle) => {
                        self.overrides_used.insert(handle);
                        let r#override = &self.overrides[handle];
                        self.types_used.insert(r#override.ty);
                        if let Some(expr) = r#override.init {
                            self.expressions_used.insert(expr);
                        }
                    }
                    crate::ArraySize::Constant(_) | crate::ArraySize::Dynamic => {}
                }
            }
            Ti::Pointer { base, space: _ } | Ti::BufferDescriptor { base, space: _ } => {
                self.types_used.insert(base);
            }
            Ti::Struct {
                ref members,
                span: _,
            } => {
                self.types_used.insert_iter(members.iter().map(|m| m.ty));
            }
        }
    }
}

impl ModuleMap {
    pub fn adjust_type(&self, ty: &mut crate::Type) -> Result<(), BadHandle> {
        let adjust = |ty: &mut Handle<crate::Type>| self.types.adjust(ty);

        use crate::TypeInner as Ti;
        match ty.inner {
            // Types that do not contain handles.
            Ti::Scalar(_)
            | Ti::Vector { .. }
            | Ti::Matrix { .. }
            | Ti::Atomic(_)
            | Ti::ValuePointer { .. }
            | Ti::Image { .. }
            | Ti::SampledImage { .. }
            | Ti::Sampler { .. }
            | Ti::AccelerationStructure { .. }
            | Ti::RayQuery { .. } => {}

            Ti::CooperativeMatrix {
                ref mut columns,
                ref mut rows,
                ref mut scope,
                ..
            } => {
                for size in [columns, rows, scope] {
                    if let crate::CooperativeSize::Pending(ref mut r#override) = *size {
                        self.overrides.adjust(r#override)?;
                    }
                }
            }
            Ti::LongVector { ref mut size, .. }
            | Ti::TensorView {
                dimensions: ref mut size,
                ..
            } => {
                if let crate::CooperativeSize::Pending(ref mut r#override) = *size {
                    self.overrides.adjust(r#override)?;
                }
            }
            Ti::TensorLayout {
                ref mut dimensions,
                ref mut clamp_mode,
            } => {
                for size in [Some(dimensions), clamp_mode.as_mut()]
                    .into_iter()
                    .flatten()
                {
                    if let crate::CooperativeSize::Pending(ref mut r#override) = *size {
                        self.overrides.adjust(r#override)?;
                    }
                }
            }

            // Types that do contain handles.
            Ti::Pointer {
                ref mut base,
                space: _,
            }
            | Ti::BufferDescriptor {
                ref mut base,
                space: _,
            } => adjust(base)?,
            Ti::Array {
                ref mut base,
                ref mut size,
                stride: _,
            }
            | Ti::BindingArray {
                ref mut base,
                ref mut size,
            } => {
                adjust(base)?;
                match *size {
                    crate::ArraySize::Pending(ref mut r#override) => {
                        self.overrides.adjust(r#override)?;
                    }
                    crate::ArraySize::Constant(_) | crate::ArraySize::Dynamic => {}
                }
            }
            Ti::Struct {
                ref mut members,
                span: _,
            } => {
                for member in members {
                    self.types.adjust(&mut member.ty)?;
                }
            }
        };
        Ok(())
    }
}
