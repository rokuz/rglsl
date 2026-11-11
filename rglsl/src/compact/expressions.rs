use super::{HandleMap, HandleSet, ModuleMap};
use crate::arena::{Arena, BadHandle, Handle};

pub struct ExpressionTracer<'tracer> {
    pub constants: &'tracer Arena<crate::Constant>,
    pub overrides: &'tracer Arena<crate::Override>,

    /// The arena in which we are currently tracing expressions.
    pub expressions: &'tracer Arena<crate::Expression>,

    /// The used map for `types`.
    pub types_used: &'tracer mut HandleSet<crate::Type>,

    /// The used map for global variables.
    pub global_variables_used: &'tracer mut HandleSet<crate::GlobalVariable>,

    /// The used map for `constants`.
    pub constants_used: &'tracer mut HandleSet<crate::Constant>,

    /// The used map for `overrides`.
    pub overrides_used: &'tracer mut HandleSet<crate::Override>,

    /// The used set for `arena`.
    ///
    /// This points to whatever arena holds the expressions we are
    /// currently tracing: either a function's expression arena, or
    /// the module's constant expression arena.
    pub expressions_used: &'tracer mut HandleSet<crate::Expression>,

    /// The used set for the module's `global_expressions` arena.
    ///
    /// If `None`, we are already tracing the constant expressions,
    /// and `expressions_used` already refers to their handle set.
    pub global_expressions_used: Option<&'tracer mut HandleSet<crate::Expression>>,
}

impl ExpressionTracer<'_> {
    /// Propagate usage through `self.expressions`, starting with `self.expressions_used`.
    ///
    /// Treat `self.expressions_used` as the initial set of "known
    /// live" expressions, and follow through to identify all
    /// transitively used expressions.
    ///
    /// Mark types, constants, and constant expressions used directly
    /// by `self.expressions` as used. Items used indirectly are not
    /// marked.
    ///
    /// [fe]: crate::Function::expressions
    /// [ce]: crate::Module::global_expressions
    pub fn trace_expressions(&mut self) {
        log::trace!(
            "entering trace_expression of {}",
            if self.global_expressions_used.is_some() {
                "function expressions"
            } else {
                "const expressions"
            }
        );

        // We don't need recursion or a work list. Because an
        // expression may only refer to other expressions that precede
        // it in the arena, it suffices to make a single pass over the
        // arena from back to front, marking the referents of used
        // expressions as used themselves.
        for (handle, expr) in self.expressions.iter().rev() {
            // If this expression isn't used, it doesn't matter what it uses.
            if !self.expressions_used.contains(handle) {
                continue;
            }

            log::trace!("tracing new expression {expr:?}");
            self.trace_expression(expr);
        }
    }

    pub fn trace_expression(&mut self, expr: &crate::Expression) {
        use crate::Expression as Ex;
        match *expr {
            // Expressions that do not contain handles that need to be traced.
            Ex::Literal(_)
            | Ex::FunctionArgument(_)
            | Ex::LocalVariable(_)
            | Ex::SubgroupBallotResult
            | Ex::RayQueryProceedResult
            | Ex::ReportIntersectionResult => {}

            // Expressions can refer to constants and overrides, which can refer
            // in turn to expressions, which complicates our nice one-pass
            // algorithm. But since constants and overrides don't refer to each
            // other directly, only via expressions, we can get around this by
            // looking *through* each constant/override and marking its
            // initializer expression as used immediately. Since `expr` refers
            // to the constant/override, which then refers to the initializer,
            // the initializer must precede `expr` in the arena, so we know we
            // have yet to visit the initializer, so it's not too late to mark
            // it.
            Ex::Constant(handle) => {
                self.constants_used.insert(handle);
                let constant = &self.constants[handle];
                self.types_used.insert(constant.ty);
                match self.global_expressions_used {
                    Some(ref mut used) => used.insert(constant.init),
                    None => self.expressions_used.insert(constant.init),
                };
            }
            Ex::Override(handle) => {
                self.overrides_used.insert(handle);
                let r#override = &self.overrides[handle];
                self.types_used.insert(r#override.ty);
                if let Some(init) = r#override.init {
                    match self.global_expressions_used {
                        Some(ref mut used) => used.insert(init),
                        None => self.expressions_used.insert(init),
                    };
                }
            }
            Ex::ZeroValue(ty) => {
                self.types_used.insert(ty);
            }
            Ex::Compose { ty, ref components } => {
                self.types_used.insert(ty);
                self.expressions_used
                    .insert_iter(components.iter().cloned());
            }
            Ex::Access { base, index } => self.expressions_used.insert_iter([base, index]),
            Ex::AccessIndex { base, index: _ } => {
                self.expressions_used.insert(base);
            }
            Ex::Splat { size: _, value } => {
                self.expressions_used.insert(value);
            }
            Ex::Swizzle {
                size: _,
                vector,
                pattern: _,
            } => {
                self.expressions_used.insert(vector);
            }
            Ex::GlobalVariable(handle) => {
                self.global_variables_used.insert(handle);
            }
            Ex::Load { pointer } => {
                self.expressions_used.insert(pointer);
            }
            Ex::ImageSample {
                image,
                sampler,
                gather: _,
                gather_pattern: _,
                coordinate,
                array_index,
                offset,
                ref level,
                depth_ref,
                clamp_to_edge: _,
            } => {
                self.expressions_used.insert_iter([image, coordinate]);
                self.expressions_used.insert_iter(sampler);
                self.expressions_used.insert_iter(array_index);
                self.expressions_used.insert_iter(offset);
                use crate::SampleLevel as Sl;
                match *level {
                    Sl::Auto | Sl::Zero => {}
                    Sl::Exact(expr) | Sl::Bias(expr) => {
                        self.expressions_used.insert(expr);
                    }
                    Sl::Gradient { x, y } => self.expressions_used.insert_iter([x, y]),
                }
                self.expressions_used.insert_iter(depth_ref);
            }
            Ex::ImageLoad {
                image,
                coordinate,
                array_index,
                sample,
                level,
            } => {
                self.expressions_used.insert(image);
                self.expressions_used.insert(coordinate);
                self.expressions_used.insert_iter(array_index);
                self.expressions_used.insert_iter(sample);
                self.expressions_used.insert_iter(level);
            }
            Ex::ImageQuery { image, ref query } => {
                self.expressions_used.insert(image);
                use crate::ImageQuery as Iq;
                match *query {
                    Iq::Size { level } => self.expressions_used.insert_iter(level),
                    Iq::NumLevels | Iq::NumLayers | Iq::NumSamples => {}
                }
            }
            Ex::RayQueryGet { query, value: _ } => {
                self.expressions_used.insert(query);
            }
            Ex::AccelerationStructureFromAddress { address } => {
                self.expressions_used.insert(address);
            }
            Ex::HitObjectGet { object, value: _ } => {
                self.expressions_used.insert(object);
            }
            Ex::FetchMicroTriangleVertex {
                acceleration_structure,
                instance_id,
                geometry_index,
                primitive_index,
                barycentric,
                value: _,
            } => {
                self.expressions_used.insert_iter([
                    acceleration_structure,
                    instance_id,
                    geometry_index,
                    primitive_index,
                    barycentric,
                ]);
            }
            Ex::Unary { op: _, expr } => {
                self.expressions_used.insert(expr);
            }
            Ex::Binary { op: _, left, right } => {
                self.expressions_used.insert_iter([left, right]);
            }
            Ex::Select {
                condition,
                accept,
                reject,
            } => self
                .expressions_used
                .insert_iter([condition, accept, reject]),
            Ex::Derivative {
                axis: _,
                ctrl: _,
                expr,
            } => {
                self.expressions_used.insert(expr);
            }
            Ex::Relational { fun: _, argument } => {
                self.expressions_used.insert(argument);
            }
            Ex::Math {
                fun: _,
                arg,
                arg1,
                arg2,
                arg3,
            } => {
                self.expressions_used.insert(arg);
                self.expressions_used.insert_iter(arg1);
                self.expressions_used.insert_iter(arg2);
                self.expressions_used.insert_iter(arg3);
            }
            Ex::As {
                expr,
                kind: _,
                convert: _,
            } => {
                self.expressions_used.insert(expr);
            }
            Ex::ArrayLength(expr)
            | Ex::WideArrayLength(expr)
            | Ex::PhysicalAddress { pointer: expr, .. }
            | Ex::BufferPointer { descriptor: expr } => {
                self.expressions_used.insert(expr);
            }
            Ex::HeapOffset { pointer, offset } => {
                self.expressions_used.insert(pointer);
                self.expressions_used.insert(offset);
            }
            Ex::PhysicalPointer { value, ty } => {
                self.expressions_used.insert(value);
                self.types_used.insert(ty);
            }
            // `CallResult` expressions do contain a function handle, but any used
            // `CallResult` expression should have an associated `ir::Statement::Call`
            // that we will trace.
            Ex::CallResult(_) => {}
            Ex::AtomicResult { ty, comparison: _ }
            | Ex::WorkGroupUniformLoadResult { ty }
            | Ex::SubgroupOperationResult { ty } => {
                self.types_used.insert(ty);
            }
            Ex::CooperativeLoad { ty, ref data } => {
                self.types_used.insert(ty);
                self.expressions_used.insert_iter(data.operands());
            }
            Ex::CooperativeMultiplyAdd { a, b, c, .. } => {
                self.expressions_used.insert(a);
                self.expressions_used.insert(b);
                self.expressions_used.insert(c);
            }
            Ex::CooperativeMatrixLength { ty } => {
                self.types_used.insert(ty);
            }
            Ex::Replicate { ty, value } => {
                self.types_used.insert(ty);
                self.expressions_used.insert(value);
            }
            Ex::Expect { value, expected } => {
                self.expressions_used.insert(value);
                self.expressions_used.insert(expected);
            }
            Ex::CooperativeVectorLoad {
                ty,
                pointer,
                offset,
            } => {
                self.types_used.insert(ty);
                self.expressions_used.insert(pointer);
                self.expressions_used.insert(offset);
            }
            Ex::Convert { expr, ty, .. } => {
                self.types_used.insert(ty);
                self.expressions_used.insert(expr);
            }
            Ex::CooperativeMatrixResult { ty } | Ex::TensorCreate { ty } => {
                self.types_used.insert(ty);
            }
            Ex::ImageProcessing {
                operation: _,
                image,
                sampler,
                coordinate,
                reference,
                reference_sampler,
                reference_coordinate,
                size,
            } => {
                self.expressions_used.insert_iter([image, coordinate]);
                self.expressions_used.insert_iter(sampler);
                self.expressions_used.insert_iter(reference);
                self.expressions_used.insert_iter(reference_sampler);
                self.expressions_used.insert_iter(reference_coordinate);
                self.expressions_used.insert_iter(size);
            }
            Ex::ArrayConversion {
                conversion: _,
                expr,
                index,
                ty,
            } => {
                self.types_used.insert(ty);
                self.expressions_used.insert(expr);
                self.expressions_used.insert_iter(index);
            }
            Ex::TensorSet {
                base, ref operands, ..
            } => {
                self.expressions_used.insert(base);
                self.expressions_used.insert_iter(operands.iter().copied());
            }
            Ex::CooperativeVectorMatMul { ty, ref operation } => {
                self.types_used.insert(ty);
                self.expressions_used.insert_iter(operation.operands());
            }
            Ex::TensorRead {
                ty,
                tensor,
                coordinates,
                out_of_bounds,
                ..
            } => {
                self.types_used.insert(ty);
                self.expressions_used.insert(tensor);
                self.expressions_used.insert(coordinates);
                if let Some(value) = out_of_bounds {
                    self.expressions_used.insert(value);
                }
            }
            Ex::TensorQuerySize { tensor, .. } => {
                self.expressions_used.insert(tensor);
            }
        }
    }
}

impl ModuleMap {
    /// Fix up all handles in `expr`.
    ///
    /// Use the expression handle remappings in `operand_map`, and all
    /// other mappings from `self`.
    pub fn adjust_expression(
        &self,
        expr: &mut crate::Expression,
        operand_map: &HandleMap<crate::Expression>,
    ) -> Result<(), BadHandle> {
        let adjust = |expr: &mut Handle<crate::Expression>| operand_map.adjust(expr);

        use crate::Expression as Ex;
        match *expr {
            // Expressions that do not contain handles that need to be adjusted.
            Ex::Literal(_)
            | Ex::FunctionArgument(_)
            | Ex::LocalVariable(_)
            | Ex::SubgroupBallotResult
            | Ex::RayQueryProceedResult
            | Ex::ReportIntersectionResult => {}

            // Expressions that contain handles that need to be adjusted.
            Ex::Constant(ref mut constant) => self.constants.adjust(constant)?,
            Ex::Override(ref mut r#override) => self.overrides.adjust(r#override)?,
            Ex::ZeroValue(ref mut ty) => self.types.adjust(ty)?,
            Ex::Compose {
                ref mut ty,
                ref mut components,
            } => {
                self.types.adjust(ty)?;
                for component in components {
                    adjust(component)?;
                }
            }
            Ex::Access {
                ref mut base,
                ref mut index,
            } => {
                adjust(base)?;
                adjust(index)?;
            }
            Ex::AccessIndex {
                ref mut base,
                index: _,
            } => adjust(base)?,
            Ex::Splat {
                size: _,
                ref mut value,
            } => adjust(value)?,
            Ex::Swizzle {
                size: _,
                ref mut vector,
                pattern: _,
            } => adjust(vector)?,
            Ex::GlobalVariable(ref mut handle) => self.globals.adjust(handle)?,
            Ex::Load { ref mut pointer } => adjust(pointer)?,
            Ex::ImageSample {
                ref mut image,
                ref mut sampler,
                gather: _,
                gather_pattern: _,
                ref mut coordinate,
                ref mut array_index,
                ref mut offset,
                ref mut level,
                ref mut depth_ref,
                clamp_to_edge: _,
            } => {
                adjust(image)?;
                operand_map.adjust_option(sampler)?;
                adjust(coordinate)?;
                operand_map.adjust_option(array_index)?;
                operand_map.adjust_option(offset)?;
                self.adjust_sample_level(level, operand_map)?;
                operand_map.adjust_option(depth_ref)?;
            }
            Ex::ImageLoad {
                ref mut image,
                ref mut coordinate,
                ref mut array_index,
                ref mut sample,
                ref mut level,
            } => {
                adjust(image)?;
                adjust(coordinate)?;
                operand_map.adjust_option(array_index)?;
                operand_map.adjust_option(sample)?;
                operand_map.adjust_option(level)?;
            }
            Ex::ImageQuery {
                ref mut image,
                ref mut query,
            } => {
                adjust(image)?;
                self.adjust_image_query(query, operand_map)?;
            }
            Ex::Unary {
                op: _,
                ref mut expr,
            } => adjust(expr)?,
            Ex::Binary {
                op: _,
                ref mut left,
                ref mut right,
            } => {
                adjust(left)?;
                adjust(right)?;
            }
            Ex::Select {
                ref mut condition,
                ref mut accept,
                ref mut reject,
            } => {
                adjust(condition)?;
                adjust(accept)?;
                adjust(reject)?;
            }
            Ex::Derivative {
                axis: _,
                ctrl: _,
                ref mut expr,
            } => adjust(expr)?,
            Ex::Relational {
                fun: _,
                ref mut argument,
            } => adjust(argument)?,
            Ex::Math {
                fun: _,
                ref mut arg,
                ref mut arg1,
                ref mut arg2,
                ref mut arg3,
            } => {
                adjust(arg)?;
                operand_map.adjust_option(arg1)?;
                operand_map.adjust_option(arg2)?;
                operand_map.adjust_option(arg3)?;
            }
            Ex::As {
                ref mut expr,
                kind: _,
                convert: _,
            } => adjust(expr)?,
            Ex::CallResult(ref mut function) => {
                self.functions.adjust(function)?;
            }
            Ex::AtomicResult {
                ref mut ty,
                comparison: _,
            } => self.types.adjust(ty)?,
            Ex::WorkGroupUniformLoadResult { ref mut ty } => self.types.adjust(ty)?,
            Ex::SubgroupOperationResult { ref mut ty } => self.types.adjust(ty)?,
            Ex::ArrayLength(ref mut expr) | Ex::WideArrayLength(ref mut expr) => adjust(expr)?,
            Ex::PhysicalAddress {
                ref mut pointer,
                split: _,
            } => adjust(pointer)?,
            Ex::BufferPointer { ref mut descriptor } => adjust(descriptor)?,
            Ex::HeapOffset {
                ref mut pointer,
                ref mut offset,
            } => {
                adjust(pointer)?;
                adjust(offset)?;
            }
            Ex::PhysicalPointer {
                ref mut value,
                ref mut ty,
            } => {
                adjust(value)?;
                self.types.adjust(ty)?;
            }
            Ex::RayQueryGet {
                ref mut query,
                value: _,
            } => adjust(query)?,
            Ex::AccelerationStructureFromAddress { ref mut address } => adjust(address)?,
            Ex::HitObjectGet {
                ref mut object,
                value: _,
            } => adjust(object)?,
            Ex::FetchMicroTriangleVertex {
                ref mut acceleration_structure,
                ref mut instance_id,
                ref mut geometry_index,
                ref mut primitive_index,
                ref mut barycentric,
                value: _,
            } => {
                adjust(acceleration_structure)?;
                adjust(instance_id)?;
                adjust(geometry_index)?;
                adjust(primitive_index)?;
                adjust(barycentric)?;
            }
            Ex::CooperativeLoad {
                ref mut ty,
                ref mut data,
            } => {
                self.types.adjust(ty)?;
                for operand in data.operands_mut() {
                    adjust(operand)?;
                }
            }
            Ex::CooperativeMultiplyAdd {
                ref mut a,
                ref mut b,
                ref mut c,
                ..
            } => {
                adjust(a)?;
                adjust(b)?;
                adjust(c)?;
            }
            Ex::CooperativeMatrixLength { ref mut ty } => self.types.adjust(ty)?,
            Ex::Replicate {
                ref mut ty,
                ref mut value,
            } => {
                self.types.adjust(ty)?;
                adjust(value)?;
            }
            Ex::Expect {
                ref mut value,
                ref mut expected,
            } => {
                adjust(value)?;
                adjust(expected)?;
            }
            Ex::CooperativeVectorLoad {
                ref mut ty,
                ref mut pointer,
                ref mut offset,
            } => {
                self.types.adjust(ty)?;
                adjust(pointer)?;
                adjust(offset)?;
            }
            Ex::Convert {
                ref mut expr,
                ref mut ty,
                ..
            } => {
                self.types.adjust(ty)?;
                adjust(expr)?;
            }
            Ex::CooperativeMatrixResult { ref mut ty } | Ex::TensorCreate { ref mut ty } => {
                self.types.adjust(ty)?;
            }
            Ex::ImageProcessing {
                operation: _,
                ref mut image,
                ref mut sampler,
                ref mut coordinate,
                ref mut reference,
                ref mut reference_sampler,
                ref mut reference_coordinate,
                ref mut size,
            } => {
                adjust(image)?;
                operand_map.adjust_option(sampler)?;
                adjust(coordinate)?;
                operand_map.adjust_option(reference)?;
                operand_map.adjust_option(reference_sampler)?;
                operand_map.adjust_option(reference_coordinate)?;
                operand_map.adjust_option(size)?;
            }
            Ex::ArrayConversion {
                conversion: _,
                ref mut expr,
                ref mut index,
                ref mut ty,
            } => {
                self.types.adjust(ty)?;
                adjust(expr)?;
                operand_map.adjust_option(index)?;
            }
            Ex::TensorSet {
                ref mut base,
                ref mut operands,
                ..
            } => {
                adjust(base)?;
                for operand in operands {
                    adjust(operand)?;
                }
            }
            Ex::CooperativeVectorMatMul {
                ref mut ty,
                ref mut operation,
            } => {
                self.types.adjust(ty)?;
                for operand in operation.operands_mut() {
                    adjust(operand)?;
                }
            }
            Ex::TensorRead {
                ref mut ty,
                ref mut tensor,
                ref mut coordinates,
                ref mut out_of_bounds,
                ..
            } => {
                self.types.adjust(ty)?;
                adjust(tensor)?;
                adjust(coordinates)?;
                if let Some(value) = out_of_bounds.as_mut() {
                    adjust(value)?;
                }
            }
            Ex::TensorQuerySize { ref mut tensor, .. } => adjust(tensor)?,
        }
        Ok(())
    }

    fn adjust_sample_level(
        &self,
        level: &mut crate::SampleLevel,
        operand_map: &HandleMap<crate::Expression>,
    ) -> Result<(), BadHandle> {
        let adjust = |expr: &mut Handle<crate::Expression>| operand_map.adjust(expr);

        use crate::SampleLevel as Sl;
        match *level {
            Sl::Auto | Sl::Zero => {}
            Sl::Exact(ref mut expr) => adjust(expr)?,
            Sl::Bias(ref mut expr) => adjust(expr)?,
            Sl::Gradient {
                ref mut x,
                ref mut y,
            } => {
                adjust(x)?;
                adjust(y)?;
            }
        }
        Ok(())
    }

    fn adjust_image_query(
        &self,
        query: &mut crate::ImageQuery,
        operand_map: &HandleMap<crate::Expression>,
    ) -> Result<(), BadHandle> {
        use crate::ImageQuery as Iq;

        match *query {
            Iq::Size { ref mut level } => operand_map.adjust_option(level)?,
            Iq::NumLevels | Iq::NumLayers | Iq::NumSamples => {}
        }
        Ok(())
    }
}
