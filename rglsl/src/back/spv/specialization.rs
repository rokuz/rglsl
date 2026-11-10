use alloc::{vec, vec::Vec};

use spirv::{Op, Word};

use super::{Error, Instruction, LookupType, NumericType, Writer, WriterFlags};
use crate::{
    arena::Handle, proc::TypeResolution, valid::ModuleInfo, BinaryOperator, Expression, Literal,
    Module, Scalar, ScalarKind, TypeInner, UnaryOperator, VectorSize,
};

fn literal_words(literal: Literal) -> Vec<Word> {
    match literal {
        Literal::F64(value) => {
            let bits = value.to_bits();
            vec![bits as u32, (bits >> 32) as u32]
        }
        Literal::F32(value) => vec![value.to_bits()],
        Literal::F16(value) => vec![u32::from(value.to_bits())],
        Literal::U8(value) => vec![u32::from(value)],
        Literal::I8(value) => vec![i32::from(value) as u32],
        Literal::U16(value) => vec![u32::from(value)],
        Literal::I16(value) => vec![i32::from(value) as u32],
        Literal::U32(value) => vec![value],
        Literal::I32(value) => vec![value as u32],
        Literal::U64(value) => vec![value as u32, (value >> 32) as u32],
        Literal::I64(value) | Literal::AbstractInt(value) => {
            vec![value as u32, (value >> 32) as u32]
        }
        Literal::AbstractFloat(value) => {
            let bits = value.to_bits();
            vec![bits as u32, (bits >> 32) as u32]
        }
        Literal::Bool(value) => vec![u32::from(value)],
        Literal::BF16(value) => vec![u32::from(value)],
        Literal::FE4M3(value) | Literal::FE5M2(value) => vec![u32::from(value)],
    }
}

const fn zero_literal(scalar: Scalar) -> Option<Literal> {
    Some(match (scalar.kind, scalar.width) {
        (ScalarKind::Bool, _) => Literal::Bool(false),
        (ScalarKind::Sint, 1) => Literal::I8(0),
        (ScalarKind::Sint, 2) => Literal::I16(0),
        (ScalarKind::Sint, 4) => Literal::I32(0),
        (ScalarKind::Sint, 8) => Literal::I64(0),
        (ScalarKind::Uint, 1) => Literal::U8(0),
        (ScalarKind::Uint, 2) => Literal::U16(0),
        (ScalarKind::Uint, 4) => Literal::U32(0),
        (ScalarKind::Uint, 8) => Literal::U64(0),
        (ScalarKind::Float, 2) => Literal::F16(half::f16::ZERO),
        (ScalarKind::Float, 4) => Literal::F32(0.0),
        (ScalarKind::Float, 8) => Literal::F64(0.0),
        _ => return None,
    })
}

const fn one_literal(scalar: Scalar) -> Option<Literal> {
    Some(match (scalar.kind, scalar.width) {
        (ScalarKind::Sint, 1) => Literal::I8(1),
        (ScalarKind::Sint, 2) => Literal::I16(1),
        (ScalarKind::Sint, 4) => Literal::I32(1),
        (ScalarKind::Sint, 8) => Literal::I64(1),
        (ScalarKind::Uint, 1) => Literal::U8(1),
        (ScalarKind::Uint, 2) => Literal::U16(1),
        (ScalarKind::Uint, 4) => Literal::U32(1),
        (ScalarKind::Uint, 8) => Literal::U64(1),
        _ => return None,
    })
}

fn global_operands(module: &Module, handle: Handle<Expression>) -> Vec<Handle<Expression>> {
    match module.global_expressions[handle] {
        Expression::Constant(constant) => vec![module.constants[constant].init],
        Expression::Override(item) => {
            let item = &module.overrides[item];
            match (item.id, item.init) {
                (None, Some(init)) => vec![init],
                _ => Vec::new(),
            }
        }
        Expression::Compose { ref components, .. } => components.clone(),
        Expression::Splat { value, .. } => vec![value],
        Expression::Swizzle { vector, .. } => vec![vector],
        Expression::AccessIndex { base, .. } => vec![base],
        Expression::Access { base, index } => vec![base, index],
        Expression::Unary { expr, .. } | Expression::As { expr, .. } => vec![expr],
        Expression::Binary { left, right, .. } => vec![left, right],
        Expression::Select {
            condition,
            accept,
            reject,
        } => vec![condition, accept, reject],
        _ => Vec::new(),
    }
}

fn resolution_inner<'a>(module: &'a Module, resolution: &'a TypeResolution) -> &'a TypeInner {
    resolution.inner_with(&module.types)
}

impl Writer {
    pub(super) fn written_override_id(
        &self,
        handle: Handle<crate::Override>,
    ) -> Result<Word, Error> {
        match self.override_ids.get(handle.index()).copied() {
            Some(id) if id != 0 => Ok(id),
            _ => Err(Error::Validation("override is not written")),
        }
    }

    pub(super) fn prepare_overrides(&mut self, module: &Module) {
        self.override_ids.clear();
        self.override_ids.resize(module.overrides.len(), 0);
        self.spec_composites.clear();
        let tracker = crate::proc::ExpressionKindTracker::from_arena(&module.global_expressions);
        self.override_dependent = module
            .global_expressions
            .iter()
            .map(|(handle, _)| !tracker.is_const(handle))
            .collect();
        let mut referenced = vec![false; module.global_expressions.len()];
        let mut mark = |handle: Handle<Expression>| {
            if let Some(slot) = referenced.get_mut(handle.index()) {
                *slot = true;
            }
        };
        for (handle, _) in module.global_expressions.iter() {
            for operand in global_operands(module, handle) {
                mark(operand);
            }
        }
        for (_, constant) in module.constants.iter() {
            mark(constant.init);
        }
        for (_, variable) in module.global_variables.iter() {
            if let Some(init) = variable.init {
                mark(init);
            }
        }
        for entry in &module.entry_points {
            for size in entry.workgroup_size_overrides.iter().flatten().flatten() {
                mark(*size);
            }
            if let Some(ref info) = entry.mesh_info {
                for handle in [info.max_vertices_override, info.max_primitives_override]
                    .into_iter()
                    .flatten()
                {
                    mark(handle);
                }
            }
        }
        for (_, item) in module.overrides.iter() {
            if let (None, Some(init)) = (item.id, item.init) {
                mark(init);
            }
        }
        self.spec_defaults = vec![false; module.global_expressions.len()];
        for (_, item) in module.overrides.iter() {
            if let (Some(_), Some(init)) = (item.id, item.init) {
                let unreferenced = !referenced.get(init.index()).copied().unwrap_or(true);
                if let Some(slot) = self.spec_defaults.get_mut(init.index()) {
                    *slot = unreferenced;
                }
            }
        }
    }

    pub(super) fn is_spec_default(&self, handle: Handle<Expression>) -> bool {
        self.spec_defaults
            .get(handle.index())
            .copied()
            .unwrap_or(false)
    }

    pub(super) fn is_override_dependent(&self, handle: Handle<Expression>) -> bool {
        self.override_dependent
            .get(handle.index())
            .copied()
            .unwrap_or(false)
    }

    pub(super) fn write_global_expression(
        &mut self,
        handle: Handle<Expression>,
        module: &Module,
        mod_info: &ModuleInfo,
    ) -> Result<Word, Error> {
        if self.constant_ids[handle] != 0 {
            return Ok(self.constant_ids[handle]);
        }
        let mut needed = vec![false; module.global_expressions.len()];
        let mut stack = vec![handle];
        while let Some(current) = stack.pop() {
            if self.constant_ids[current] != 0 {
                continue;
            }
            let Some(slot) = needed.get_mut(current.index()) else {
                return Err(Error::Validation("global expression handle out of range"));
            };
            if *slot {
                continue;
            }
            *slot = true;
            stack.extend(global_operands(module, current));
        }
        for (current, _) in module.global_expressions.iter() {
            if needed.get(current.index()).copied().unwrap_or(false)
                && self.constant_ids[current] == 0
            {
                self.write_constant_expr(current, module, mod_info)?;
            }
        }
        match self.constant_ids[handle] {
            0 => Err(Error::Validation("global expressions are out of order")),
            id => Ok(id),
        }
    }

    pub(super) fn written(&self, handle: Handle<Expression>) -> Result<Word, Error> {
        match self.constant_ids[handle] {
            0 => Err(Error::Validation("global expressions are out of order")),
            id => Ok(id),
        }
    }

    pub(super) fn write_override(
        &mut self,
        handle: Handle<crate::Override>,
        module: &Module,
        mod_info: &ModuleInfo,
    ) -> Result<Word, Error> {
        let index = handle.index();
        match self.override_ids.get(index).copied() {
            Some(0) => {}
            Some(id) => return Ok(id),
            None => return Err(Error::Validation("override handle out of range")),
        }
        let item = &module.overrides[handle];
        let id = match item.id {
            Some(spec_id) => {
                let TypeInner::Scalar(scalar) = module.types[item.ty].inner else {
                    return Err(Error::SpecializationConstant(
                        "a specialization id on a non-scalar constant",
                    ));
                };
                let literal = match item.init.map(|init| &module.global_expressions[init]) {
                    Some(&Expression::Literal(literal)) => literal,
                    None | Some(&Expression::ZeroValue(_)) => {
                        zero_literal(scalar).ok_or(Error::Validation("override type"))?
                    }
                    Some(_) => {
                        return Err(Error::SpecializationConstant(
                            "a default value that is not a literal",
                        ))
                    }
                };
                let type_id = self.get_numeric_type_id(NumericType::Scalar(scalar));
                let id = self.id_gen.next();
                let mut instruction = match literal {
                    Literal::Bool(true) => Instruction::new(Op::SpecConstantTrue),
                    Literal::Bool(false) => Instruction::new(Op::SpecConstantFalse),
                    _ => Instruction::new(Op::SpecConstant),
                };
                instruction.set_type(type_id);
                instruction.set_result(id);
                if !matches!(literal, Literal::Bool(_)) {
                    instruction.add_operands(literal_words(literal));
                }
                instruction.to_words(&mut self.logical_layout.declarations);
                self.decorate(id, spirv::Decoration::SpecId, &[spec_id]);
                if self.flags.contains(WriterFlags::DEBUG) {
                    if let Some(ref name) = item.name {
                        self.debugs.push(Instruction::name(id, name));
                    }
                }
                id
            }
            None => {
                let init = item
                    .init
                    .ok_or(Error::SpecializationConstant("an override without a value"))?;
                let id = self.write_global_expression(init, module, mod_info)?;
                if self.flags.contains(WriterFlags::DEBUG) && self.is_override_dependent(init) {
                    if let Some(ref name) = item.name {
                        self.debugs.push(Instruction::name(id, name));
                    }
                }
                id
            }
        };
        if let Some(slot) = self.override_ids.get_mut(index) {
            *slot = id;
        }
        Ok(id)
    }

    pub(super) fn get_spec_constant_composite(
        &mut self,
        type_id: Word,
        constituents: &[Word],
    ) -> Word {
        match self.spec_composites.get(&(type_id, constituents.to_vec())) {
            Some(&id) => id,
            None => self.write_spec_constant_composite(type_id, constituents),
        }
    }

    fn write_spec_constant_composite(&mut self, type_id: Word, constituents: &[Word]) -> Word {
        let key = (type_id, constituents.to_vec());
        let id = self.id_gen.next();
        let mut instruction = Instruction::new(Op::SpecConstantComposite);
        instruction.set_type(type_id);
        instruction.set_result(id);
        for &constituent in constituents {
            instruction.add_operand(constituent);
        }
        instruction.to_words(&mut self.logical_layout.declarations);
        self.spec_composites.entry(key).or_insert(id);
        id
    }

    fn checked_type_id(&mut self, resolution: &TypeResolution) -> Result<Word, Error> {
        if let TypeResolution::Handle(ty) = *resolution {
            if !self.lookup_type.contains_key(&LookupType::Handle(ty)) {
                return Err(Error::Validation("a type is used before it is declared"));
            }
        }
        self.get_expression_type_id(resolution)
    }

    fn spec_op(&mut self, type_id: Word, op: Op, operands: &[Word]) -> Word {
        let id = self.id_gen.next();
        let mut instruction = Instruction::new(Op::SpecConstantOp);
        instruction.set_type(type_id);
        instruction.set_result(id);
        instruction.add_operand(op as u32);
        for &operand in operands {
            instruction.add_operand(operand);
        }
        instruction.to_words(&mut self.logical_layout.declarations);
        id
    }

    fn composite_parts(
        &mut self,
        handle: Handle<Expression>,
        module: &Module,
        mod_info: &ModuleInfo,
        parts: &mut Vec<Word>,
    ) -> Result<(), Error> {
        let id = self.written(handle)?;
        match *resolution_inner(module, &mod_info[handle]) {
            TypeInner::Vector { size, scalar } => {
                let type_id = self.get_numeric_type_id(NumericType::Scalar(scalar));
                for index in 0..size as u32 {
                    parts.push(self.spec_op(type_id, Op::CompositeExtract, &[id, index]));
                }
            }
            _ => parts.push(id),
        }
        Ok(())
    }

    pub(super) fn write_spec_composite(
        &mut self,
        handle: Handle<Expression>,
        module: &Module,
        mod_info: &ModuleInfo,
    ) -> Result<Word, Error> {
        let type_id = self.checked_type_id(&mod_info[handle])?;
        let target_is_vector = matches!(
            *resolution_inner(module, &mod_info[handle]),
            TypeInner::Vector { .. }
        );
        let mut parts = Vec::new();
        match module.global_expressions[handle] {
            Expression::Compose { ty, ref components } => {
                let flattened: Vec<_> = crate::proc::flatten_compose(
                    ty,
                    components,
                    &module.global_expressions,
                    &module.types,
                )
                .collect();
                for component in flattened {
                    if target_is_vector {
                        self.composite_parts(component, module, mod_info, &mut parts)?;
                    } else {
                        parts.push(self.written(component)?);
                    }
                }
            }
            Expression::Splat { size, value } => {
                let id = self.written(value)?;
                parts.extend(core::iter::repeat_n(id, size as usize));
            }
            _ => return Err(Error::Validation("not a composite")),
        }
        Ok(self.write_spec_constant_composite(type_id, &parts))
    }

    fn splat(&mut self, id: Word, size: VectorSize, scalar: Scalar, spec: bool) -> Word {
        let type_id = self.get_numeric_type_id(NumericType::Vector { size, scalar });
        let parts = vec![id; size as usize];
        if spec {
            self.get_spec_constant_composite(type_id, &parts)
        } else {
            self.get_local_constant_composite(
                super::LocalType::Numeric(NumericType::Vector { size, scalar }),
                &parts,
            )
        }
    }

    fn typed_zero(&mut self, inner: &TypeInner, scalar: Scalar, one: bool) -> Result<Word, Error> {
        let literal = if one {
            one_literal(scalar)
        } else {
            zero_literal(scalar)
        }
        .ok_or(Error::SpecializationConstant("this conversion"))?;
        let id = self.get_constant_scalar(literal);
        Ok(match *inner {
            TypeInner::Vector { size, .. } => self.splat(id, size, scalar, false),
            _ => id,
        })
    }

    fn low_bits_mask(
        &mut self,
        inner: &TypeInner,
        scalar: Scalar,
        bytes: u8,
    ) -> Result<Word, Error> {
        let mask = (1_u64 << (u32::from(bytes) * 8)) - 1;
        let literal = match (scalar.kind, scalar.width) {
            (ScalarKind::Sint, 2) => i16::try_from(mask).ok().map(Literal::I16),
            (ScalarKind::Sint, 4) => i32::try_from(mask).ok().map(Literal::I32),
            (ScalarKind::Sint, 8) => i64::try_from(mask).ok().map(Literal::I64),
            (ScalarKind::Uint, 2) => u16::try_from(mask).ok().map(Literal::U16),
            (ScalarKind::Uint, 4) => u32::try_from(mask).ok().map(Literal::U32),
            (ScalarKind::Uint, 8) => Some(Literal::U64(mask)),
            _ => None,
        }
        .ok_or(Error::SpecializationConstant("this conversion"))?;
        let id = self.get_constant_scalar(literal);
        Ok(match *inner {
            TypeInner::Vector { size, .. } => self.splat(id, size, scalar, false),
            _ => id,
        })
    }

    pub(super) fn write_spec_operation(
        &mut self,
        handle: Handle<Expression>,
        module: &Module,
        mod_info: &ModuleInfo,
    ) -> Result<Word, Error> {
        let type_id = self.checked_type_id(&mod_info[handle])?;
        let result_inner = resolution_inner(module, &mod_info[handle]).clone();
        let operand_inner = |operand: Handle<Expression>| -> (TypeInner, Option<Scalar>) {
            let inner = resolution_inner(module, &mod_info[operand]).clone();
            let scalar = inner.scalar();
            (inner, scalar)
        };
        let not_allowed = Error::SpecializationConstant;
        let id = match module.global_expressions[handle] {
            Expression::CooperativeMatrixLength { ty } => {
                let matrix_type = self.get_handle_type_id(ty)?;
                let opcode = match module.types[ty].inner {
                    TypeInner::CooperativeMatrix {
                        class: crate::CooperativeMatrixClass::Nv,
                        ..
                    } => Op::CooperativeMatrixLengthNV,
                    _ => Op::CooperativeMatrixLengthKHR,
                };
                self.spec_op(type_id, opcode, &[matrix_type])
            }
            Expression::Unary { op, expr } => {
                let operand = self.written(expr)?;
                let (_, scalar) = operand_inner(expr);
                let kind = scalar.map(|scalar| scalar.kind);
                let opcode = match (op, kind) {
                    (UnaryOperator::Negate, Some(ScalarKind::Sint | ScalarKind::Uint)) => {
                        Op::SNegate
                    }
                    (UnaryOperator::LogicalNot, _)
                    | (UnaryOperator::BitwiseNot, Some(ScalarKind::Bool)) => Op::LogicalNot,
                    (UnaryOperator::BitwiseNot, Some(ScalarKind::Sint | ScalarKind::Uint)) => {
                        Op::Not
                    }
                    _ => return Err(not_allowed("this unary operation")),
                };
                self.spec_op(type_id, opcode, &[operand])
            }
            Expression::Binary { op, left, right } => {
                let mut left_id = self.written(left)?;
                let mut right_id = self.written(right)?;
                let (left_inner, left_scalar) = operand_inner(left);
                let (right_inner, _) = operand_inner(right);
                let scalar = left_scalar.ok_or(not_allowed("this binary operation"))?;
                let shift = matches!(op, BinaryOperator::ShiftLeft | BinaryOperator::ShiftRight);
                match (&left_inner, &right_inner) {
                    (&TypeInner::Vector { size, .. }, &TypeInner::Scalar(right_scalar)) => {
                        let spec = self.is_override_dependent(right);
                        right_id = self.splat(right_id, size, right_scalar, spec);
                    }
                    (&TypeInner::Scalar(left_scalar), &TypeInner::Vector { size, .. })
                        if !shift =>
                    {
                        let spec = self.is_override_dependent(left);
                        left_id = self.splat(left_id, size, left_scalar, spec);
                    }
                    _ => {}
                }
                let signed = scalar.kind == ScalarKind::Sint;
                let opcode = match (op, scalar.kind) {
                    (_, ScalarKind::Float | ScalarKind::AbstractFloat) => {
                        return Err(not_allowed("floating-point arithmetic"))
                    }
                    (BinaryOperator::Add, ScalarKind::Sint | ScalarKind::Uint) => Op::IAdd,
                    (BinaryOperator::Subtract, ScalarKind::Sint | ScalarKind::Uint) => Op::ISub,
                    (BinaryOperator::Multiply, ScalarKind::Sint | ScalarKind::Uint) => Op::IMul,
                    (BinaryOperator::Divide, ScalarKind::Sint) => Op::SDiv,
                    (BinaryOperator::Divide, ScalarKind::Uint) => Op::UDiv,
                    (BinaryOperator::Modulo, ScalarKind::Sint) => Op::SMod,
                    (BinaryOperator::Modulo, ScalarKind::Uint) => Op::UMod,
                    (BinaryOperator::Equal, ScalarKind::Bool) => Op::LogicalEqual,
                    (BinaryOperator::NotEqual, ScalarKind::Bool)
                    | (BinaryOperator::ExclusiveOr, ScalarKind::Bool) => Op::LogicalNotEqual,
                    (BinaryOperator::Equal, _) => Op::IEqual,
                    (BinaryOperator::NotEqual, _) => Op::INotEqual,
                    (BinaryOperator::Less, _) if signed => Op::SLessThan,
                    (BinaryOperator::Less, _) => Op::ULessThan,
                    (BinaryOperator::LessEqual, _) if signed => Op::SLessThanEqual,
                    (BinaryOperator::LessEqual, _) => Op::ULessThanEqual,
                    (BinaryOperator::Greater, _) if signed => Op::SGreaterThan,
                    (BinaryOperator::Greater, _) => Op::UGreaterThan,
                    (BinaryOperator::GreaterEqual, _) if signed => Op::SGreaterThanEqual,
                    (BinaryOperator::GreaterEqual, _) => Op::UGreaterThanEqual,
                    (BinaryOperator::And | BinaryOperator::LogicalAnd, ScalarKind::Bool) => {
                        Op::LogicalAnd
                    }
                    (BinaryOperator::InclusiveOr | BinaryOperator::LogicalOr, ScalarKind::Bool) => {
                        Op::LogicalOr
                    }
                    (BinaryOperator::And, _) => Op::BitwiseAnd,
                    (BinaryOperator::InclusiveOr, _) => Op::BitwiseOr,
                    (BinaryOperator::ExclusiveOr, _) => Op::BitwiseXor,
                    (BinaryOperator::ShiftLeft, _) => Op::ShiftLeftLogical,
                    (BinaryOperator::ShiftRight, _) if signed => Op::ShiftRightArithmetic,
                    (BinaryOperator::ShiftRight, _) => Op::ShiftRightLogical,
                    _ => return Err(not_allowed("this binary operation")),
                };
                self.spec_op(type_id, opcode, &[left_id, right_id])
            }
            Expression::As {
                expr,
                kind,
                convert,
            } => {
                let operand = self.written(expr)?;
                let (source_inner, source) = operand_inner(expr);
                let source = source.ok_or(not_allowed("this conversion"))?;
                let target_width = convert.unwrap_or(source.width);
                let target = Scalar {
                    kind,
                    width: target_width,
                };
                if convert.is_none() && source.width == target.width && source.kind != kind {
                    return Err(not_allowed("a bit cast"));
                }
                match (source.kind, kind) {
                    (from, to) if from == to && source.width == target_width => operand,
                    (ScalarKind::Sint | ScalarKind::Uint, ScalarKind::Bool) => {
                        let zero = self.typed_zero(&source_inner, source, false)?;
                        self.spec_op(type_id, Op::INotEqual, &[operand, zero])
                    }
                    (ScalarKind::Bool, ScalarKind::Sint | ScalarKind::Uint) => {
                        let one = self.typed_zero(&result_inner, target, true)?;
                        let zero = self.typed_zero(&result_inner, target, false)?;
                        self.spec_op(type_id, Op::Select, &[operand, one, zero])
                    }
                    (ScalarKind::Sint | ScalarKind::Uint, ScalarKind::Sint | ScalarKind::Uint)
                        if source.width == target_width =>
                    {
                        let zero = self.typed_zero(&result_inner, target, false)?;
                        self.spec_op(type_id, Op::IAdd, &[operand, zero])
                    }
                    (ScalarKind::Sint, ScalarKind::Sint | ScalarKind::Uint) => {
                        self.spec_op(type_id, Op::SConvert, &[operand])
                    }
                    (ScalarKind::Uint, ScalarKind::Sint | ScalarKind::Uint)
                        if self.lang_version() >= (1, 4) =>
                    {
                        self.spec_op(type_id, Op::UConvert, &[operand])
                    }
                    (ScalarKind::Uint, ScalarKind::Sint | ScalarKind::Uint)
                        if target_width < source.width =>
                    {
                        self.spec_op(type_id, Op::SConvert, &[operand])
                    }
                    (ScalarKind::Uint, ScalarKind::Sint | ScalarKind::Uint) => {
                        let extended = self.spec_op(type_id, Op::SConvert, &[operand]);
                        let mask = self.low_bits_mask(&result_inner, target, source.width)?;
                        self.spec_op(type_id, Op::BitwiseAnd, &[extended, mask])
                    }
                    (ScalarKind::Float, ScalarKind::Float) => {
                        self.spec_op(type_id, Op::FConvert, &[operand])
                    }
                    _ => return Err(not_allowed("this conversion")),
                }
            }
            Expression::Select {
                condition,
                accept,
                reject,
            } => {
                let mut condition_id = self.written(condition)?;
                let accept_id = self.written(accept)?;
                let reject_id = self.written(reject)?;
                let (condition_inner, _) = operand_inner(condition);
                if let (&TypeInner::Scalar(scalar), &TypeInner::Vector { size, .. }) =
                    (&condition_inner, &result_inner)
                {
                    let spec = self.is_override_dependent(condition);
                    condition_id = self.splat(condition_id, size, scalar, spec);
                }
                self.spec_op(type_id, Op::Select, &[condition_id, accept_id, reject_id])
            }
            Expression::Swizzle {
                size,
                vector,
                pattern,
            } => {
                let vector_id = self.written(vector)?;
                let mut operands = vec![vector_id, vector_id];
                operands.extend(
                    pattern
                        .iter()
                        .take(size as usize)
                        .map(|component| *component as u32),
                );
                self.spec_op(type_id, Op::VectorShuffle, &operands)
            }
            Expression::AccessIndex { base, index } => {
                let base_id = self.written(base)?;
                self.spec_op(type_id, Op::CompositeExtract, &[base_id, index])
            }
            Expression::Access { base, index } => {
                let base_id = self.written(base)?;
                let index = match module.global_expressions[index] {
                    Expression::Literal(Literal::I32(value)) => u32::try_from(value).ok(),
                    Expression::Literal(Literal::U32(value)) => Some(value),
                    _ => None,
                }
                .ok_or(not_allowed("an index that is not a constant"))?;
                self.spec_op(type_id, Op::CompositeExtract, &[base_id, index])
            }
            _ => return Err(not_allowed("this expression")),
        };
        Ok(id)
    }

    pub(super) fn write_workgroup_size(
        &mut self,
        function_id: Word,
        entry_point: &crate::EntryPoint,
    ) -> Result<(), Error> {
        let Some(overrides) = entry_point.workgroup_size_overrides else {
            Instruction::execution_mode(
                function_id,
                spirv::ExecutionMode::LocalSize,
                &entry_point.workgroup_size,
            )
            .to_words(&mut self.logical_layout.execution_modes);
            return Ok(());
        };
        let mut ids = [0; 3];
        for ((slot, size), item) in ids
            .iter_mut()
            .zip(entry_point.workgroup_size)
            .zip(overrides)
        {
            *slot = match item {
                Some(handle) => self.written(handle)?,
                None => self.get_constant_scalar(Literal::U32(size)),
            };
        }
        if self.lang_version() >= (1, 6) {
            let mut instruction = Instruction::new(Op::ExecutionModeId);
            instruction.add_operand(function_id);
            instruction.add_operand(spirv::ExecutionMode::LocalSizeId as u32);
            for id in ids {
                instruction.add_operand(id);
            }
            instruction.to_words(&mut self.logical_layout.execution_modes);
            return Ok(());
        }
        Instruction::execution_mode(
            function_id,
            spirv::ExecutionMode::LocalSize,
            &entry_point.workgroup_size,
        )
        .to_words(&mut self.logical_layout.execution_modes);
        let type_id = self.get_numeric_type_id(NumericType::Vector {
            size: VectorSize::Tri,
            scalar: Scalar::U32,
        });
        let composite = self.get_spec_constant_composite(type_id, &ids);
        self.decorate(
            composite,
            spirv::Decoration::BuiltIn,
            &[spirv::BuiltIn::WorkgroupSize as u32],
        );
        Ok(())
    }
}
