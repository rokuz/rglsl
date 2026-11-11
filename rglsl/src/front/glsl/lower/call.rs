use alloc::vec::Vec;

use rglsl_ast::ast::{Expression as AstExpression, FunctionCall, FunctionIdentifier};
use rglsl_sema::scope::Direction;
use rglsl_sema::types::{ArraySize, Scalar as GlslScalar, Type as GlslType, TypeKind};
use rglsl_sema::{Callee, FunctionId};

use super::expression::Place;
use super::function::FunctionLowerer;
use super::types::scalar;
use super::{internal, semantic, unsupported, Result};
use crate::{Expression, Handle, Literal, NonUniform, Span, Statement};

#[derive(Debug)]
struct Writeback {
    place: Place,
    local: Handle<crate::LocalVariable>,
    parameter_ty: GlslType,
    argument_ty: GlslType,
    non_uniform: bool,
}

impl FunctionLowerer<'_, '_> {
    pub(super) fn call(
        &mut self,
        expression: &AstExpression,
        call: &FunctionCall,
    ) -> Result<Option<Handle<Expression>>> {
        let at = self.at(expression.span);
        let analysis = self.lw.analysis;
        let arguments = call.arguments.as_slice();
        match analysis.calls.get(&expression.id) {
            Some(&Callee::Function(id))
                if analysis
                    .function(id)
                    .is_some_and(|function| function.spirv_instruction.is_some()) =>
            {
                self.spirv_call(id, arguments, at)
            }
            Some(&Callee::Function(id)) => self.user_function_call(expression, id, arguments, at),
            Some(&Callee::NonUniform) => self.non_uniform_value(arguments, at).map(Some),
            Some(&Callee::DebugPrintf) => self.debug_printf(arguments, at).map(|()| None),
            Some(&Callee::Abort) => self.abort(arguments, at).map(|()| None),
            Some(&Callee::Builtin(id)) => self.builtin_function_call(expression, id, arguments, at),
            Some(&Callee::Constructor(ref ty)) => self.constructor_call(ty, arguments, at),
            Some(&Callee::Cooperative(kind)) => self.cooperative_call(kind, arguments, at),
            Some(&Callee::Tensor(kind)) => {
                self.tensor_function_call(expression, kind, arguments, at)
            }
            Some(&Callee::TensorArm(kind)) => self.tensor_arm_call(kind, arguments, at),
            Some(&Callee::Matrix(kind)) => {
                self.matrix_function_call(expression, kind, arguments, at)
            }
            Some(&Callee::Length) => self.length_call(call, at),
            None => Err(internal(at)),
        }
    }

    fn user_function_call(
        &mut self,
        expression: &AstExpression,
        id: FunctionId,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let non_uniform = self.info(expression)?.non_uniform;
        self.user_call(id, arguments, non_uniform, at)
    }

    fn builtin_function_call(
        &mut self,
        expression: &AstExpression,
        id: rglsl_sema::BuiltinFunctionId,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let result = &self.info(expression)?.ty;
        self.builtin_call(id, result, arguments, at)
    }

    fn constructor_call(
        &mut self,
        ty: &GlslType,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        if ty
            .as_opaque()
            .is_some_and(rglsl_sema::types::Opaque::is_acceleration_structure)
        {
            return self.acceleration_structure_from(arguments, at).map(Some);
        }
        if ty.is_opaque() {
            return Err(unsupported(
                "combined image samplers outside the first argument of a texture function",
                at,
            ));
        }
        self.construct(ty, arguments, at).map(Some)
    }

    fn tensor_function_call(
        &mut self,
        expression: &AstExpression,
        kind: rglsl_sema::TensorCall,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let result = &self.info(expression)?.ty;
        self.tensor_call(kind, result, arguments, at).map(Some)
    }

    fn matrix_function_call(
        &mut self,
        expression: &AstExpression,
        kind: rglsl_sema::MatrixCall,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let result = &self.info(expression)?.ty;
        self.matrix_call(kind, result, arguments, at)
    }

    fn length_call(&mut self, call: &FunctionCall, at: Span) -> Result<Option<Handle<Expression>>> {
        match call.function.node {
            FunctionIdentifier::Method {
                ref object,
                ref name,
            } if name.node == "length64" => self.wide_length(object, at).map(Some),
            FunctionIdentifier::Method { ref object, .. } => self.length(object, at).map(Some),
            _ => Err(internal(at)),
        }
    }

    fn wide_length(&mut self, object: &AstExpression, at: Span) -> Result<Handle<Expression>> {
        let ty = self.info(object)?.ty.clone();
        if let Some(length) = ty.length() {
            return self.literal(Literal::I64(i64::from(length)), at);
        }
        let builtin = self
            .lw
            .variable_symbol(object)
            .and_then(|symbol| self.lw.symbol(symbol))
            .is_some_and(|symbol| self.lw.builtin_sizes.contains_key(symbol.name.as_str()));
        let runtime = ty.outer_size() == Some(ArraySize::Unsized)
            && !builtin
            && ty.as_cooperative_matrix().is_none()
            && ty.sized_vector_length().is_none();
        if runtime {
            let place = self.place(object)?;
            if place.swizzle.is_some() {
                return Err(internal(at));
            }
            let length = self.add(Expression::WideArrayLength(place.pointer), at)?;
            return self.as_kind(length, crate::Scalar::I64, at);
        }
        let length = self.length(object, at)?;
        self.as_kind(length, crate::Scalar::I64, at)
    }

    fn length(&mut self, object: &AstExpression, at: Span) -> Result<Handle<Expression>> {
        let ty = self.info(object)?.ty.clone();
        if let Some(length) = ty.length() {
            let length = i32::try_from(length).map_err(|_| internal(at))?;
            return self.literal(Literal::I32(length), at);
        }
        if ty.as_cooperative_matrix().is_some() {
            let matrix = self.lw.ir_type(&ty, at)?;
            let length = self.add(Expression::CooperativeMatrixLength { ty: matrix }, at)?;
            return self.as_kind(length, crate::Scalar::I32, at);
        }
        if let Some(ArraySize::Specialized(size)) = ty.outer_size().or(ty.sized_vector_length()) {
            let handle = self.lw.specialized_size(size, at)?;
            let value = self.add(Expression::Override(handle), at)?;
            let size_ty = self.lw.module.overrides[handle].ty;
            return match self.lw.module.types[size_ty].inner {
                crate::TypeInner::Scalar(crate::Scalar::I32) => Ok(value),
                _ => self.as_kind(value, crate::Scalar::I32, at),
            };
        }
        if ty.outer_size() == Some(ArraySize::Unsized) {
            if let Some(symbol) = self.lw.variable_symbol(object) {
                if let Some(name) = self.lw.symbol(symbol).map(|s| s.name.as_str()) {
                    if let Some(size) = self.lw.builtin_sizes.get(name).copied() {
                        let size = i32::try_from(size).map_err(|_| internal(at))?;
                        return self.literal(Literal::I32(size), at);
                    }
                }
            }
        }
        let place = self.place(object)?;
        if place.swizzle.is_some() {
            return Err(internal(at));
        }
        let length = self.add(Expression::ArrayLength(place.pointer), at)?;
        self.as_kind(length, crate::Scalar::I32, at)
    }

    fn non_uniform_value(
        &mut self,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let argument = arguments.first().ok_or_else(|| internal(at))?;
        let (value, ty) = self.typed(argument)?;
        let shared = self.tracker.is_const_or_override(value)
            || matches!(
                self.expressions[value],
                Expression::FunctionArgument(_)
                    | Expression::GlobalVariable(_)
                    | Expression::LocalVariable(_)
            );
        let value = if shared && !ty.is_opaque() {
            let pointer = self.spill(value, &ty, at)?;
            self.add(Expression::Load { pointer }, at)?
        } else {
            value
        };
        self.mark(value, NonUniform::VALUE);
        Ok(value)
    }

    fn user_call(
        &mut self,
        id: FunctionId,
        arguments: &[AstExpression],
        non_uniform: bool,
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let analysis = self.lw.analysis;
        let function = analysis.function(id).ok_or_else(|| internal(at))?;
        let handle = self.user_call_target(id, arguments, at)?;
        let parameter_types: Vec<Handle<crate::Type>> = self.lw.module.functions[handle]
            .arguments
            .iter()
            .map(|argument| argument.ty)
            .collect();
        let (values, writebacks) =
            self.user_call_arguments(arguments, &function.parameters, &parameter_types, at)?;
        let returns = !function.return_type.is_void();
        self.user_call_finish(handle, values, writebacks, returns, non_uniform, at)
    }

    fn user_call_arguments(
        &mut self,
        arguments: &[AstExpression],
        parameters: &[rglsl_sema::scope::Parameter],
        parameter_types: &[Handle<crate::Type>],
        at: Span,
    ) -> Result<(Vec<Handle<Expression>>, Vec<Writeback>)> {
        let mut values = Vec::with_capacity(arguments.len());
        let mut writebacks = Vec::new();
        for ((argument, parameter), &parameter_ty) in
            arguments.iter().zip(parameters).zip(parameter_types)
        {
            let writeback =
                self.user_call_argument(argument, parameter, parameter_ty, &mut values, at)?;
            writebacks.extend(writeback);
        }
        Ok((values, writebacks))
    }

    fn user_call_target(
        &self,
        id: FunctionId,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<crate::Function>> {
        let analysis = self.lw.analysis;
        let handle = *self
            .lw
            .functions
            .get(&id)
            .ok_or_else(|| unsupported("calls to `main` or to functions without a body", at))?;
        for argument in arguments {
            let inner = super::prepass::strip(argument);
            if let Some(&Callee::Constructor(ref ty)) = analysis.calls.get(&inner.id) {
                if ty.is_opaque() {
                    return Err(semantic(
                        "sampler constructor must appear at point of use",
                        self.at(inner.span),
                    ));
                }
            }
        }
        Ok(handle)
    }

    fn user_call_argument(
        &mut self,
        argument: &AstExpression,
        parameter: &rglsl_sema::scope::Parameter,
        parameter_ty: Handle<crate::Type>,
        values: &mut Vec<Handle<Expression>>,
        at: Span,
    ) -> Result<Option<Writeback>> {
        let input = parameter.direction == Direction::In;
        if input
            && parameter
                .ty
                .as_opaque()
                .is_some_and(rglsl_sema::types::Opaque::is_private_object)
        {
            return self.private_argument(argument, values).map(|()| None);
        }
        if input && matches!(parameter.ty.kind, TypeKind::Spirv(_)) {
            return self
                .spirv_in_argument(argument, &parameter.ty, values, at)
                .map(|()| None);
        }
        if input {
            return self
                .in_argument_value(argument, parameter, parameter_ty, values, at)
                .map(|()| None);
        }
        self.out_argument_place(argument, parameter, values, at)
            .map(Some)
    }

    fn private_argument(
        &mut self,
        argument: &AstExpression,
        values: &mut Vec<Handle<Expression>>,
    ) -> Result<()> {
        let pointer = self.ray_query_pointer(argument)?;
        values.push(pointer);
        Ok(())
    }

    fn spirv_in_argument(
        &mut self,
        argument: &AstExpression,
        ty: &GlslType,
        values: &mut Vec<Handle<Expression>>,
        at: Span,
    ) -> Result<()> {
        let value = self.rvalue(argument)?;
        let pointer = self.spirv_argument(ty, value, at)?;
        values.push(pointer);
        Ok(())
    }

    fn in_argument_value(
        &mut self,
        argument: &AstExpression,
        parameter: &rglsl_sema::scope::Parameter,
        parameter_ty: Handle<crate::Type>,
        values: &mut Vec<Handle<Expression>>,
        at: Span,
    ) -> Result<()> {
        let value = self.rvalue(argument)?;
        let value = self.in_argument(value, parameter, parameter_ty, at)?;
        values.push(value);
        Ok(())
    }

    fn out_argument_place(
        &mut self,
        argument: &AstExpression,
        parameter: &rglsl_sema::scope::Parameter,
        values: &mut Vec<Handle<Expression>>,
        at: Span,
    ) -> Result<Writeback> {
        let place = self.place(argument)?;
        let (pointer, writeback) = self.out_argument(argument, place, parameter, at)?;
        values.push(pointer);
        Ok(writeback)
    }

    fn spirv_argument(
        &mut self,
        ty: &GlslType,
        value: Handle<Expression>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let local = self.local(ty, None, at)?;
        let pointer = self.local_pointer(local, at)?;
        self.push(Statement::Store { pointer, value }, at);
        self.local_pointer(local, at)
    }

    fn in_argument(
        &mut self,
        value: Handle<Expression>,
        parameter: &rglsl_sema::scope::Parameter,
        parameter_ty: Handle<crate::Type>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let source = match self.expressions[value] {
            Expression::Load { pointer } => pointer,
            _ => value,
        };
        if parameter.ty.is_opaque() && self.heap_pointee(source).is_some() {
            return Err(unsupported(
                "passing a descriptor heap resource to a user function",
                at,
            ));
        }
        self.requalify_to(value, parameter_ty, at)
    }

    fn out_argument(
        &mut self,
        argument: &AstExpression,
        place: Place,
        parameter: &rglsl_sema::scope::Parameter,
        at: Span,
    ) -> Result<(Handle<Expression>, Writeback)> {
        let argument_info = self.info(argument)?;
        let argument_ty = argument_info.ty.clone();
        let argument_non_uniform = argument_info.non_uniform;
        let local = self.local(&parameter.ty, None, at)?;
        if parameter.direction == Direction::Inout {
            let value = self.load(&place, at)?;
            let value = self.convert(value, &argument_ty, &parameter.ty, at)?;
            let pointer = self.local_pointer(local, at)?;
            self.push(Statement::Store { pointer, value }, at);
        }
        let pointer = self.local_pointer(local, at)?;
        Ok((
            pointer,
            Writeback {
                place,
                local,
                parameter_ty: parameter.ty.clone(),
                argument_ty,
                non_uniform: argument_non_uniform,
            },
        ))
    }

    fn user_call_finish(
        &mut self,
        handle: Handle<crate::Function>,
        values: Vec<Handle<Expression>>,
        writebacks: Vec<Writeback>,
        returns: bool,
        non_uniform: bool,
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let result = self.call_statement(handle, values, returns, at);
        if let (Some(result), true) = (result, non_uniform) {
            self.mark(result, NonUniform::VALUE);
        }
        for writeback in writebacks {
            let pointer = self.local_pointer(writeback.local, at)?;
            let value = self.add(Expression::Load { pointer }, at)?;
            if writeback.non_uniform {
                self.mark(value, NonUniform::VALUE);
            }
            let value = self.convert(value, &writeback.parameter_ty, &writeback.argument_ty, at)?;
            self.store(&writeback.place, value, at)?;
        }
        Ok(result)
    }

    pub(super) fn component(
        &mut self,
        value: Handle<Expression>,
        index: u32,
        at: Span,
    ) -> Result<Handle<Expression>> {
        self.add(Expression::AccessIndex { base: value, index }, at)
    }

    fn scalar_to(
        &mut self,
        value: Handle<Expression>,
        from: GlslScalar,
        to: GlslScalar,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if from == to {
            return Ok(value);
        }
        self.as_kind(value, scalar(to), at)
    }

    fn flatten(
        &mut self,
        arguments: &[(Handle<Expression>, GlslType)],
        target: GlslScalar,
        at: Span,
    ) -> Result<Vec<Handle<Expression>>> {
        let mut components = Vec::new();
        for &(value, ref ty) in arguments {
            let source = ty.base_scalar().ok_or_else(|| internal(at))?;
            match ty.kind {
                TypeKind::Scalar(_) => components.push(self.scalar_to(value, source, target, at)?),
                TypeKind::Vector { .. }
                | TypeKind::LongVector {
                    size: ArraySize::Sized(_),
                    ..
                }
                | TypeKind::CooperativeVector {
                    size: ArraySize::Sized(_),
                    ..
                } => {
                    let size = ty.component_count().ok_or_else(|| internal(at))?;
                    let converted = self.convert(value, ty, &ty.with_scalar(target), at)?;
                    for index in 0..size {
                        components.push(self.component(converted, index, at)?);
                    }
                }
                TypeKind::Matrix { columns, rows, .. } => {
                    for column in 0..u32::from(columns) {
                        let vector = self.component(value, column, at)?;
                        for row in 0..u32::from(rows) {
                            let part = self.component(vector, row, at)?;
                            components.push(self.scalar_to(part, source, target, at)?);
                        }
                    }
                }
                _ => return Err(internal(at)),
            }
        }
        Ok(components)
    }

    pub(super) fn construct(
        &mut self,
        ty: &GlslType,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        if let &[ref argument] = arguments {
            let from_reference = self.info(argument)?.ty.is_reference();
            let numeric = ty.is_scalar() || ty.is_vector();
            if ty.is_reference() || (from_reference && numeric) {
                return self.reference_construct(ty, argument, at);
            }
        }
        if ty.is_array() || ty.is_struct() {
            return self.construct_composite(ty, arguments, at);
        }
        let mut values = Vec::with_capacity(arguments.len());
        for argument in arguments {
            values.push(self.typed(argument)?);
        }
        self.construct_values(ty, at, values)
    }

    fn construct_composite(
        &mut self,
        ty: &GlslType,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let mut components = Vec::with_capacity(arguments.len());
        for argument in arguments {
            components.push(self.rvalue(argument)?);
        }
        let ir = self.lw.ir_type(ty, at)?;
        self.add(Expression::Compose { ty: ir, components }, at)
    }

    fn construct_values(
        &mut self,
        ty: &GlslType,
        at: Span,
        values: Vec<(Handle<Expression>, GlslType)>,
    ) -> Result<Handle<Expression>> {
        let target = ty.base_scalar().ok_or_else(|| internal(at))?;
        if matches!(
            ty.kind,
            TypeKind::LongVector { .. }
                | TypeKind::CooperativeVector { .. }
                | TypeKind::CooperativeMatrix(_)
        ) {
            return self.construct_cooperative(ty, target, &values, at);
        }
        match (ty.kind, values.as_slice()) {
            (TypeKind::Scalar(_), &[(value, ref from), ..]) => {
                let source = from.base_scalar().ok_or_else(|| internal(at))?;
                let mut first = value;
                if from.is_vector() || from.sized_vector_length().is_some() {
                    first = self.component(first, 0, at)?;
                } else if from.is_matrix() {
                    first = self.component(first, 0, at)?;
                    first = self.component(first, 0, at)?;
                }
                self.scalar_to(first, source, target, at)
            }
            (TypeKind::Vector { size, .. }, &[(value, ref from)]) if from.is_scalar() => {
                let source = from.base_scalar().ok_or_else(|| internal(at))?;
                let converted = self.scalar_to(value, source, target, at)?;
                self.splat(converted, size, at)
            }
            (TypeKind::Vector { size, .. }, &[(value, ref from)])
                if from.is_vector() && from.component_count() == Some(u32::from(size)) =>
            {
                self.convert(value, from, ty, at)
            }
            (TypeKind::Vector { size, .. }, _) => {
                let mut components = self.flatten(&values, target, at)?;
                components.truncate(usize::from(size));
                let ir = self.lw.ir_type(ty, at)?;
                self.add(Expression::Compose { ty: ir, components }, at)
            }
            (TypeKind::Matrix { columns, rows, .. }, &[(value, ref from)]) if from.is_scalar() => {
                let source = from.base_scalar().ok_or_else(|| internal(at))?;
                let diagonal = self.scalar_to(value, source, target, at)?;
                let zero = Literal::zero(scalar(target)).ok_or_else(|| internal(at))?;
                let zero = self.literal(zero, at)?;
                let column_ty = self.lw.ir_type(&GlslType::vector(target, rows), at)?;
                let mut components = Vec::with_capacity(usize::from(columns));
                for column in 0..columns {
                    let parts = (0..rows)
                        .map(|row| if row == column { diagonal } else { zero })
                        .collect();
                    components.push(self.add(
                        Expression::Compose {
                            ty: column_ty,
                            components: parts,
                        },
                        at,
                    )?);
                }
                let ir = self.lw.ir_type(ty, at)?;
                self.add(Expression::Compose { ty: ir, components }, at)
            }
            (TypeKind::Matrix { columns, rows, .. }, &[(value, ref from)]) if from.is_matrix() => {
                let TypeKind::Matrix {
                    columns: source_columns,
                    rows: source_rows,
                    scalar: source,
                } = from.kind
                else {
                    return Err(internal(at));
                };
                let zero = Literal::zero(scalar(target)).ok_or_else(|| internal(at))?;
                let one = Literal::one(scalar(target)).ok_or_else(|| internal(at))?;
                let zero = self.literal(zero, at)?;
                let one = self.literal(one, at)?;
                let column_ty = self.lw.ir_type(&GlslType::vector(target, rows), at)?;
                let mut components = Vec::with_capacity(usize::from(columns));
                for column in 0..columns {
                    let source_column = if column < source_columns {
                        Some(self.component(value, u32::from(column), at)?)
                    } else {
                        None
                    };
                    let mut parts = Vec::with_capacity(usize::from(rows));
                    for row in 0..rows {
                        let part = match source_column {
                            Some(vector) if row < source_rows => {
                                let part = self.component(vector, u32::from(row), at)?;
                                self.scalar_to(part, source, target, at)?
                            }
                            _ if row == column => one,
                            _ => zero,
                        };
                        parts.push(part);
                    }
                    components.push(self.add(
                        Expression::Compose {
                            ty: column_ty,
                            components: parts,
                        },
                        at,
                    )?);
                }
                let ir = self.lw.ir_type(ty, at)?;
                self.add(Expression::Compose { ty: ir, components }, at)
            }
            (TypeKind::Matrix { columns, rows, .. }, _) => {
                let flattened = self.flatten(&values, target, at)?;
                let column_ty = self.lw.ir_type(&GlslType::vector(target, rows), at)?;
                let mut components = Vec::with_capacity(usize::from(columns));
                for chunk in flattened
                    .chunks(usize::from(rows))
                    .take(usize::from(columns))
                {
                    components.push(self.add(
                        Expression::Compose {
                            ty: column_ty,
                            components: chunk.to_vec(),
                        },
                        at,
                    )?);
                }
                let ir = self.lw.ir_type(ty, at)?;
                self.add(Expression::Compose { ty: ir, components }, at)
            }
            _ => Err(internal(at)),
        }
    }

    fn construct_cooperative(
        &mut self,
        ty: &GlslType,
        target: GlslScalar,
        values: &[(Handle<Expression>, GlslType)],
        at: Span,
    ) -> Result<Handle<Expression>> {
        match *values {
            [(value, ref from)] if from.is_scalar() => {
                let source = from.base_scalar().ok_or_else(|| internal(at))?;
                let converted = self.scalar_to(value, source, target, at)?;
                self.replicate(converted, ty, at)
            }
            [(value, ref from)] if from.same_shape(ty) => self.convert(value, from, ty, at),
            [(expr, ref from)] if from.as_cooperative_matrix().is_some() => {
                let ty = self.lw.ir_type(ty, at)?;
                self.add(
                    Expression::Convert {
                        expr,
                        ty,
                        saturating: false,
                        family: self.cooperative_family(),
                    },
                    at,
                )
            }
            _ if ty.as_cooperative_matrix().is_some() => Err(internal(at)),
            _ => {
                let mut components = self.flatten(values, target, at)?;
                let count = ty
                    .component_count()
                    .or(ty.sized_vector_length().and_then(ArraySize::nominal))
                    .ok_or_else(|| internal(at))?;
                components.truncate(usize::try_from(count).map_err(|_| internal(at))?);
                let ir = self.lw.ir_type(ty, at)?;
                self.add(Expression::Compose { ty: ir, components }, at)
            }
        }
    }
}
