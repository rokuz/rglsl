#![warn(clippy::wildcard_enum_match_arm)]

use core::convert::Infallible;

use crate::arena::{Handle, Range};
use crate::{
    AtomicFunction, AtomicLocation, AttachmentAspect, Block, CollectiveOperation, Constant,
    CooperativeData, CooperativeMatrixFunction, CooperativeVectorBias, CooperativeVectorFunction,
    CooperativeVectorMatMul, DebugPrintfArgument, Expression, Function, GatherMode, GlobalVariable,
    HitObjectFunction, HitObjectSbtRecord, HitObjectTrace, ImageQuery, InterpolationLocation,
    LocalVariable, MeshFunction, Override, RayPipelineFunction, RayQueryFunction, RayTracingData,
    ReorderHint, SampleLevel, SpirvOperand, Statement, SubgroupFunction, Texel, Type,
};

pub trait Visitor<'a> {
    type Error;

    fn expression(&mut self, handle: Handle<Expression>) -> Result<(), Self::Error>;
    fn result(&mut self, handle: Handle<Expression>) -> Result<(), Self::Error>;
    fn emitted(&mut self, range: &Range<Expression>) -> Result<(), Self::Error>;
    fn ty(&mut self, handle: Handle<Type>) -> Result<(), Self::Error>;
    fn constant(&mut self, handle: Handle<Constant>) -> Result<(), Self::Error>;
    fn r#override(&mut self, handle: Handle<Override>) -> Result<(), Self::Error>;
    fn global_variable(&mut self, handle: Handle<GlobalVariable>) -> Result<(), Self::Error>;
    fn local_variable(&mut self, handle: Handle<LocalVariable>) -> Result<(), Self::Error>;
    fn function(&mut self, handle: Handle<Function>) -> Result<(), Self::Error>;
    fn block(&mut self, block: &'a Block) -> Result<(), Self::Error>;
}

pub trait VisitorMut<'a> {
    type Error;

    fn expression(&mut self, handle: &mut Handle<Expression>) -> Result<(), Self::Error>;
    fn result(&mut self, handle: &mut Handle<Expression>) -> Result<(), Self::Error>;
    fn emitted(&mut self, range: &mut Range<Expression>) -> Result<(), Self::Error>;
    fn ty(&mut self, handle: &mut Handle<Type>) -> Result<(), Self::Error>;
    fn constant(&mut self, handle: &mut Handle<Constant>) -> Result<(), Self::Error>;
    fn r#override(&mut self, handle: &mut Handle<Override>) -> Result<(), Self::Error>;
    fn global_variable(&mut self, handle: &mut Handle<GlobalVariable>) -> Result<(), Self::Error>;
    fn local_variable(&mut self, handle: &mut Handle<LocalVariable>) -> Result<(), Self::Error>;
    fn function(&mut self, handle: &mut Handle<Function>) -> Result<(), Self::Error>;
    fn block(&mut self, block: &'a mut Block) -> Result<(), Self::Error>;
}

macro_rules! visitable {
    ($($ty:ty => $body:ident;)*) => {$(
        impl $ty {
            pub fn visit<'a, V: Visitor<'a>>(&'a self, visitor: &mut V) -> Result<(), V::Error> {
                $body!(self, visitor, visit, [], [*]);
                Ok(())
            }

            pub fn visit_mut<'a, V: VisitorMut<'a>>(
                &'a mut self,
                visitor: &mut V,
            ) -> Result<(), V::Error> {
                $body!(self, visitor, visit_mut, [mut], []);
                Ok(())
            }

            pub fn for_each_operand(&self, operand: impl FnMut(Handle<Expression>)) {
                let Ok(()) = self.visit(&mut Parts {
                    operand,
                    block: |_| {},
                    function: |_| {},
                });
            }

            pub fn try_for_each_operand<E>(
                &self,
                operand: impl FnMut(Handle<Expression>) -> Result<(), E>,
            ) -> Result<(), E> {
                self.visit(&mut TryOperands(operand))
            }

            pub fn for_each_operand_mut(&mut self, operand: impl FnMut(&mut Handle<Expression>)) {
                let Ok(()) = self.visit_mut(&mut Parts {
                    operand,
                    block: |_| {},
                    function: |_: &mut Handle<Function>| {},
                });
            }
        }
    )*};
}

macro_rules! expression_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            Expression::Literal(_)
            | Expression::FunctionArgument(_)
            | Expression::RayQueryProceedResult
            | Expression::ReportIntersectionResult
            | Expression::SubgroupBallotResult
            | Expression::IsHelperInvocation
            | Expression::ReadClock {
                source: _,
                pair: _,
            } => {}
            Expression::Constant(ref $($m)? constant) => $v.constant($($d)? constant)?,
            Expression::Override(ref $($m)? r#override) => $v.r#override($($d)? r#override)?,
            Expression::ZeroValue(ref $($m)? ty)
            | Expression::AtomicResult {
                ref $($m)? ty,
                comparison: _,
            }
            | Expression::SubgroupOperationResult { ref $($m)? ty }
            | Expression::SpirvInstructionResult { ref $($m)? ty }
            | Expression::CooperativeMatrixLength { ref $($m)? ty }
            | Expression::CooperativeMatrixResult { ref $($m)? ty }
            | Expression::TensorCreate { ref $($m)? ty } => $v.ty($($d)? ty)?,
            Expression::Compose {
                ref $($m)? ty,
                ref $($m)? components,
            } => {
                $v.ty($($d)? ty)?;
                for component in components {
                    $v.expression($($d)? component)?;
                }
            }
            Expression::Access {
                ref $($m)? base,
                ref $($m)? index,
            } => {
                $v.expression($($d)? base)?;
                $v.expression($($d)? index)?;
            }
            Expression::AccessIndex {
                ref $($m)? base,
                index: _,
            } => $v.expression($($d)? base)?,
            Expression::Splat {
                size: _,
                ref $($m)? value,
            } => $v.expression($($d)? value)?,
            Expression::Swizzle {
                size: _,
                ref $($m)? vector,
                pattern: _,
            } => $v.expression($($d)? vector)?,
            Expression::GlobalVariable(ref $($m)? global) => {
                $v.global_variable($($d)? global)?;
            }
            Expression::LocalVariable(ref $($m)? local) => $v.local_variable($($d)? local)?,
            Expression::Load { ref $($m)? pointer } => $v.expression($($d)? pointer)?,
            Expression::ImageSample {
                ref $($m)? image,
                ref $($m)? sampler,
                gather: _,
                gather_pattern: _,
                ref $($m)? coordinate,
                ref $($m)? array_index,
                ref $($m)? offset,
                ref $($m)? level,
                ref $($m)? depth_ref,
                ref $($m)? min_lod,
                ref $($m)? sparse,
            } => {
                $v.expression($($d)? image)?;
                if let Some(ref $($m)? sampler) = *sampler {
                    $v.expression($($d)? sampler)?;
                }
                $v.expression($($d)? coordinate)?;
                if let Some(ref $($m)? array_index) = *array_index {
                    $v.expression($($d)? array_index)?;
                }
                if let Some(ref $($m)? offset) = *offset {
                    $v.expression($($d)? offset)?;
                }
                level.$visit($v)?;
                if let Some(ref $($m)? depth_ref) = *depth_ref {
                    $v.expression($($d)? depth_ref)?;
                }
                if let Some(ref $($m)? min_lod) = *min_lod {
                    $v.expression($($d)? min_lod)?;
                }
                if let Some(ref $($m)? sparse) = *sparse {
                    $v.ty($($d)? sparse)?;
                }
            }
            Expression::ImageLoad {
                ref $($m)? image,
                ref $($m)? coordinate,
                ref $($m)? array_index,
                ref $($m)? sample,
                ref $($m)? level,
                ref $($m)? sparse,
            } => {
                $v.expression($($d)? image)?;
                $v.expression($($d)? coordinate)?;
                for operand in array_index.into_iter().chain(sample).chain(level) {
                    $v.expression($($d)? operand)?;
                }
                if let Some(ref $($m)? sparse) = *sparse {
                    $v.ty($($d)? sparse)?;
                }
            }
            Expression::ImageQuery {
                ref $($m)? image,
                ref $($m)? query,
            } => {
                $v.expression($($d)? image)?;
                query.$visit($v)?;
            }
            Expression::Unary {
                op: _,
                ref $($m)? expr,
            } => $v.expression($($d)? expr)?,
            Expression::Binary {
                op: _,
                ref $($m)? left,
                ref $($m)? right,
            } => {
                $v.expression($($d)? left)?;
                $v.expression($($d)? right)?;
            }
            Expression::Select {
                ref $($m)? condition,
                ref $($m)? accept,
                ref $($m)? reject,
            } => {
                $v.expression($($d)? condition)?;
                $v.expression($($d)? accept)?;
                $v.expression($($d)? reject)?;
            }
            Expression::Derivative {
                axis: _,
                ctrl: _,
                ref $($m)? expr,
            } => $v.expression($($d)? expr)?,
            Expression::Relational {
                fun: _,
                ref $($m)? argument,
            } => $v.expression($($d)? argument)?,
            Expression::Math {
                fun: _,
                ref $($m)? arg,
                ref $($m)? arg1,
                ref $($m)? arg2,
                ref $($m)? arg3,
            } => {
                $v.expression($($d)? arg)?;
                for operand in arg1.into_iter().chain(arg2).chain(arg3) {
                    $v.expression($($d)? operand)?;
                }
            }
            Expression::As {
                ref $($m)? expr,
                kind: _,
                convert: _,
            } => $v.expression($($d)? expr)?,
            Expression::CallResult(ref $($m)? function) => $v.function($($d)? function)?,
            Expression::ArrayLength(ref $($m)? expr)
            | Expression::WideArrayLength(ref $($m)? expr)
            | Expression::PhysicalAddress {
                pointer: ref $($m)? expr,
                split: _,
            }
            | Expression::BufferPointer {
                descriptor: ref $($m)? expr,
            }
            | Expression::ImageSparseResident {
                code: ref $($m)? expr,
            }
            | Expression::AccelerationStructureFromAddress {
                address: ref $($m)? expr,
            }
            | Expression::RayQueryGet {
                query: ref $($m)? expr,
                value: _,
            }
            | Expression::HitObjectGet {
                object: ref $($m)? expr,
                value: _,
            }
            | Expression::TensorQuerySize {
                tensor: ref $($m)? expr,
                dimension: _,
            } => $v.expression($($d)? expr)?,
            Expression::PhysicalPointer {
                ref $($m)? value,
                ref $($m)? ty,
            } => {
                $v.expression($($d)? value)?;
                $v.ty($($d)? ty)?;
            }
            Expression::HeapOffset {
                ref $($m)? pointer,
                ref $($m)? offset,
            } => {
                $v.expression($($d)? pointer)?;
                $v.expression($($d)? offset)?;
            }
            Expression::FetchMicroTriangleVertex {
                ref $($m)? acceleration_structure,
                ref $($m)? instance_id,
                ref $($m)? geometry_index,
                ref $($m)? primitive_index,
                ref $($m)? barycentric,
                value: _,
            } => {
                $v.expression($($d)? acceleration_structure)?;
                $v.expression($($d)? instance_id)?;
                $v.expression($($d)? geometry_index)?;
                $v.expression($($d)? primitive_index)?;
                $v.expression($($d)? barycentric)?;
            }
            Expression::CooperativeLoad {
                ref $($m)? ty,
                ref $($m)? data,
            } => {
                $v.ty($($d)? ty)?;
                data.$visit($v)?;
            }
            Expression::CooperativeMultiplyAdd {
                ref $($m)? a,
                ref $($m)? b,
                ref $($m)? c,
                saturating: _,
            } => {
                $v.expression($($d)? a)?;
                $v.expression($($d)? b)?;
                $v.expression($($d)? c)?;
            }
            Expression::Replicate {
                ref $($m)? ty,
                ref $($m)? value,
            } => {
                $v.ty($($d)? ty)?;
                $v.expression($($d)? value)?;
            }
            Expression::Expect {
                ref $($m)? value,
                ref $($m)? expected,
            } => {
                $v.expression($($d)? value)?;
                $v.expression($($d)? expected)?;
            }
            Expression::InterpolateAt {
                ref $($m)? pointer,
                ref $($m)? location,
            } => {
                $v.expression($($d)? pointer)?;
                location.$visit($v)?;
            }
            Expression::FragmentFetch {
                ref $($m)? image,
                ref $($m)? coordinate,
                ref $($m)? fragment,
            } => {
                $v.expression($($d)? image)?;
                $v.expression($($d)? coordinate)?;
                if let Some(ref $($m)? fragment) = *fragment {
                    $v.expression($($d)? fragment)?;
                }
            }
            Expression::ImageFootprint {
                ref $($m)? image,
                ref $($m)? coordinate,
                ref $($m)? granularity,
                ref $($m)? coarse,
                ref $($m)? level,
                ref $($m)? min_lod,
                ref $($m)? ty,
            } => {
                $v.expression($($d)? image)?;
                $v.expression($($d)? coordinate)?;
                $v.expression($($d)? granularity)?;
                $v.expression($($d)? coarse)?;
                level.$visit($v)?;
                if let Some(ref $($m)? min_lod) = *min_lod {
                    $v.expression($($d)? min_lod)?;
                }
                $v.ty($($d)? ty)?;
            }
            Expression::AttachmentRead {
                ref $($m)? aspect,
                ref $($m)? sample,
            } => {
                aspect.$visit($v)?;
                if let Some(ref $($m)? sample) = *sample {
                    $v.expression($($d)? sample)?;
                }
            }
            Expression::CooperativeVectorLoad {
                ref $($m)? ty,
                ref $($m)? pointer,
                ref $($m)? offset,
            } => {
                $v.ty($($d)? ty)?;
                $v.expression($($d)? pointer)?;
                $v.expression($($d)? offset)?;
            }
            Expression::CooperativeVectorMatMul {
                ref $($m)? ty,
                ref $($m)? operation,
            } => {
                $v.ty($($d)? ty)?;
                operation.$visit($v)?;
            }
            Expression::Convert {
                ref $($m)? expr,
                ref $($m)? ty,
                saturating: _,
                flavor: _,
            } => {
                $v.expression($($d)? expr)?;
                $v.ty($($d)? ty)?;
            }
            Expression::ImageProcessing {
                operation: _,
                ref $($m)? image,
                ref $($m)? sampler,
                ref $($m)? coordinate,
                ref $($m)? reference,
                ref $($m)? reference_sampler,
                ref $($m)? reference_coordinate,
                ref $($m)? size,
            } => {
                $v.expression($($d)? image)?;
                if let Some(ref $($m)? sampler) = *sampler {
                    $v.expression($($d)? sampler)?;
                }
                $v.expression($($d)? coordinate)?;
                for operand in reference
                    .into_iter()
                    .chain(reference_sampler)
                    .chain(reference_coordinate)
                    .chain(size)
                {
                    $v.expression($($d)? operand)?;
                }
            }
            Expression::ArrayConversion {
                conversion: _,
                ref $($m)? expr,
                ref $($m)? index,
                ref $($m)? ty,
            } => {
                $v.expression($($d)? expr)?;
                if let Some(ref $($m)? index) = *index {
                    $v.expression($($d)? index)?;
                }
                $v.ty($($d)? ty)?;
            }
            Expression::Bitcast {
                ref $($m)? expr,
                ref $($m)? ty,
                ref $($m)? offset,
            } => {
                $v.expression($($d)? expr)?;
                $v.ty($($d)? ty)?;
                if let Some(ref $($m)? offset) = *offset {
                    $v.expression($($d)? offset)?;
                }
            }
            Expression::TensorSet {
                ref $($m)? base,
                operation: _,
                ref $($m)? operands,
            } => {
                $v.expression($($d)? base)?;
                for operand in operands {
                    $v.expression($($d)? operand)?;
                }
            }
            Expression::TensorRead {
                ref $($m)? ty,
                ref $($m)? tensor,
                ref $($m)? coordinates,
                nontemporal: _,
                ref $($m)? out_of_bounds,
            } => {
                $v.ty($($d)? ty)?;
                $v.expression($($d)? tensor)?;
                $v.expression($($d)? coordinates)?;
                if let Some(ref $($m)? out_of_bounds) = *out_of_bounds {
                    $v.expression($($d)? out_of_bounds)?;
                }
            }
        }
    };
}

macro_rules! statement_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            Statement::Break
            | Statement::Continue
            | Statement::Kill
            | Statement::Demote
            | Statement::BeginInvocationInterlock
            | Statement::EndInvocationInterlock
            | Statement::EmitVertex { stream: _ }
            | Statement::EndPrimitive { stream: _ }
            | Statement::ControlBarrier(_)
            | Statement::MemoryBarrier(_)
            | Statement::ScopedBarrier {
                execution: _,
                memory: _,
                semantics: _,
            }
            | Statement::SplitBarrier {
                phase: _,
                execution: _,
                memory: _,
                semantics: _,
            } => {}
            Statement::Emit(ref $($m)? range) => $v.emitted(range)?,
            Statement::Block(ref $($m)? block) => $v.block(block)?,
            Statement::If {
                ref $($m)? condition,
                ref $($m)? accept,
                ref $($m)? reject,
                control: _,
            } => {
                $v.expression($($d)? condition)?;
                $v.block(accept)?;
                $v.block(reject)?;
            }
            Statement::Switch {
                ref $($m)? selector,
                ref $($m)? cases,
                control: _,
            } => {
                $v.expression($($d)? selector)?;
                for case in cases {
                    $v.block(& $($m)? case.body)?;
                }
            }
            Statement::Loop {
                ref $($m)? body,
                ref $($m)? continuing,
                ref $($m)? break_if,
                control: _,
            } => {
                $v.block(body)?;
                $v.block(continuing)?;
                if let Some(ref $($m)? break_if) = *break_if {
                    $v.expression($($d)? break_if)?;
                }
            }
            Statement::Return { ref $($m)? value } => {
                if let Some(ref $($m)? value) = *value {
                    $v.expression($($d)? value)?;
                }
            }
            Statement::Store {
                ref $($m)? pointer,
                ref $($m)? value,
            } => {
                $v.expression($($d)? pointer)?;
                $v.expression($($d)? value)?;
            }
            Statement::ImageStore {
                ref $($m)? image,
                ref $($m)? coordinate,
                ref $($m)? array_index,
                ref $($m)? sample,
                ref $($m)? level,
                ref $($m)? value,
            } => {
                $v.expression($($d)? image)?;
                $v.expression($($d)? coordinate)?;
                for operand in array_index.into_iter().chain(sample).chain(level) {
                    $v.expression($($d)? operand)?;
                }
                $v.expression($($d)? value)?;
            }
            Statement::Atomic {
                ref $($m)? pointer,
                ref $($m)? fun,
                ref $($m)? value,
                ref $($m)? result,
                order: _,
            } => {
                $v.expression($($d)? pointer)?;
                fun.$visit($v)?;
                $v.expression($($d)? value)?;
                if let Some(ref $($m)? result) = *result {
                    $v.result($($d)? result)?;
                }
            }
            Statement::AtomicLoad {
                ref $($m)? location,
                order: _,
                ref $($m)? result,
            } => {
                location.$visit($v)?;
                $v.result($($d)? result)?;
            }
            Statement::AtomicStore {
                ref $($m)? location,
                ref $($m)? value,
                order: _,
            } => {
                location.$visit($v)?;
                $v.expression($($d)? value)?;
            }
            Statement::ImageAtomic {
                ref $($m)? image,
                ref $($m)? coordinate,
                ref $($m)? array_index,
                ref $($m)? fun,
                ref $($m)? value,
                ref $($m)? sample,
                ref $($m)? result,
                order: _,
            } => {
                $v.expression($($d)? image)?;
                $v.expression($($d)? coordinate)?;
                if let Some(ref $($m)? array_index) = *array_index {
                    $v.expression($($d)? array_index)?;
                }
                fun.$visit($v)?;
                $v.expression($($d)? value)?;
                if let Some(ref $($m)? sample) = *sample {
                    $v.expression($($d)? sample)?;
                }
                if let Some(ref $($m)? result) = *result {
                    $v.result($($d)? result)?;
                }
            }
            Statement::Call {
                ref $($m)? function,
                ref $($m)? arguments,
                ref $($m)? result,
            } => {
                $v.function($($d)? function)?;
                for argument in arguments {
                    $v.expression($($d)? argument)?;
                }
                if let Some(ref $($m)? result) = *result {
                    $v.result($($d)? result)?;
                }
            }
            Statement::RayQuery {
                ref $($m)? query,
                ref $($m)? fun,
            } => {
                $v.expression($($d)? query)?;
                fun.$visit($v)?;
            }
            Statement::RayPipelineFunction(ref $($m)? fun) => fun.$visit($v)?,
            Statement::HitObject {
                ref $($m)? object,
                ref $($m)? fun,
            } => {
                $v.expression($($d)? object)?;
                fun.$visit($v)?;
            }
            Statement::ReorderThread {
                flavor: _,
                ref $($m)? hint,
                ref $($m)? bits,
            } => {
                $v.expression($($d)? hint)?;
                $v.expression($($d)? bits)?;
            }
            Statement::MeshFunction(ref $($m)? fun) => fun.$visit($v)?,
            Statement::SubgroupBallot {
                ref $($m)? result,
                ref $($m)? predicate,
            } => {
                if let Some(ref $($m)? predicate) = *predicate {
                    $v.expression($($d)? predicate)?;
                }
                $v.result($($d)? result)?;
            }
            Statement::SubgroupGather {
                ref $($m)? mode,
                ref $($m)? argument,
                ref $($m)? result,
            } => {
                mode.$visit($v)?;
                $v.expression($($d)? argument)?;
                $v.result($($d)? result)?;
            }
            Statement::SubgroupCollectiveOperation {
                op: _,
                ref $($m)? collective_op,
                ref $($m)? argument,
                ref $($m)? result,
            } => {
                collective_op.$visit($v)?;
                $v.expression($($d)? argument)?;
                $v.result($($d)? result)?;
            }
            Statement::SubgroupFunction {
                ref $($m)? fun,
                ref $($m)? result,
            } => {
                fun.$visit($v)?;
                $v.result($($d)? result)?;
            }
            Statement::CooperativeStore {
                ref $($m)? target,
                ref $($m)? data,
            } => {
                $v.expression($($d)? target)?;
                data.$visit($v)?;
            }
            Statement::DebugPrintf {
                format: _,
                ref $($m)? arguments,
            } => {
                for argument in arguments {
                    argument.$visit($v)?;
                }
            }
            Statement::Assume { ref $($m)? condition } => $v.expression($($d)? condition)?,
            Statement::CooperativeVector(ref $($m)? fun) => fun.$visit($v)?,
            Statement::CooperativeMatrix {
                ref $($m)? function,
                ref $($m)? result,
            } => {
                function.$visit($v)?;
                if let Some(ref $($m)? result) = *result {
                    $v.result($($d)? result)?;
                }
            }
            Statement::Abort {
                message: _,
                ref $($m)? ty,
                ref $($m)? arguments,
            } => {
                $v.ty($($d)? ty)?;
                for argument in arguments {
                    $v.expression($($d)? argument)?;
                }
            }
            Statement::TensorWrite {
                ref $($m)? tensor,
                ref $($m)? coordinates,
                ref $($m)? value,
                nontemporal: _,
            } => {
                $v.expression($($d)? tensor)?;
                $v.expression($($d)? coordinates)?;
                $v.expression($($d)? value)?;
            }
            Statement::SpirvInstruction {
                instruction: _,
                ref $($m)? operands,
                ref $($m)? result,
            } => {
                for operand in operands {
                    operand.$visit($v)?;
                }
                if let Some(ref $($m)? result) = *result {
                    $v.result($($d)? result)?;
                }
            }
        }
    };
}

macro_rules! sample_level_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            SampleLevel::Auto | SampleLevel::Zero => {}
            SampleLevel::Exact(ref $($m)? level) | SampleLevel::Bias(ref $($m)? level) => {
                $v.expression($($d)? level)?;
            }
            SampleLevel::Gradient {
                ref $($m)? x,
                ref $($m)? y,
            } => {
                $v.expression($($d)? x)?;
                $v.expression($($d)? y)?;
            }
        }
    };
}

macro_rules! image_query_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            ImageQuery::NumLevels | ImageQuery::NumLayers | ImageQuery::NumSamples => {}
            ImageQuery::Size { ref $($m)? level } => {
                if let Some(ref $($m)? level) = *level {
                    $v.expression($($d)? level)?;
                }
            }
            ImageQuery::Lod {
                ref $($m)? sampler,
                ref $($m)? coordinate,
            } => {
                if let Some(ref $($m)? sampler) = *sampler {
                    $v.expression($($d)? sampler)?;
                }
                $v.expression($($d)? coordinate)?;
            }
        }
    };
}

macro_rules! interpolation_location_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            InterpolationLocation::Centroid => {}
            InterpolationLocation::Sample(ref $($m)? operand)
            | InterpolationLocation::Offset(ref $($m)? operand) => {
                $v.expression($($d)? operand)?;
            }
        }
    };
}

macro_rules! attachment_aspect_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            AttachmentAspect::Depth | AttachmentAspect::Stencil => {}
            AttachmentAspect::Color(ref $($m)? image) => $v.expression($($d)? image)?,
        }
    };
}

macro_rules! cooperative_data_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        let CooperativeData {
            ref $($m)? pointer,
            ref $($m)? stride,
            ref $($m)? layout,
        } = *$this;
        $v.expression($($d)? pointer)?;
        if let Some(ref $($m)? stride) = *stride {
            $v.expression($($d)? stride)?;
        }
        $v.expression($($d)? layout)?;
    };
}

macro_rules! cooperative_vector_mat_mul_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        let CooperativeVectorMatMul {
            ref $($m)? input,
            ref $($m)? input_interpretation,
            ref $($m)? matrix,
            ref $($m)? matrix_offset,
            ref $($m)? matrix_interpretation,
            ref $($m)? bias,
            ref $($m)? rows,
            ref $($m)? columns,
            ref $($m)? layout,
            ref $($m)? transpose,
            ref $($m)? stride,
        } = *$this;
        $v.expression($($d)? input)?;
        $v.expression($($d)? input_interpretation)?;
        $v.expression($($d)? matrix)?;
        $v.expression($($d)? matrix_offset)?;
        $v.expression($($d)? matrix_interpretation)?;
        $v.expression($($d)? rows)?;
        $v.expression($($d)? columns)?;
        $v.expression($($d)? layout)?;
        $v.expression($($d)? transpose)?;
        $v.expression($($d)? stride)?;
        if let Some(ref $($m)? bias) = *bias {
            bias.$visit($v)?;
        }
    };
}

macro_rules! cooperative_vector_bias_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        let CooperativeVectorBias {
            ref $($m)? pointer,
            ref $($m)? offset,
            ref $($m)? interpretation,
        } = *$this;
        $v.expression($($d)? pointer)?;
        $v.expression($($d)? offset)?;
        $v.expression($($d)? interpretation)?;
    };
}

macro_rules! atomic_function_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            AtomicFunction::Add
            | AtomicFunction::Subtract
            | AtomicFunction::And
            | AtomicFunction::ExclusiveOr
            | AtomicFunction::InclusiveOr
            | AtomicFunction::Min
            | AtomicFunction::Max => {}
            AtomicFunction::Exchange { ref $($m)? compare } => {
                if let Some(ref $($m)? compare) = *compare {
                    $v.expression($($d)? compare)?;
                }
            }
        }
    };
}

macro_rules! atomic_location_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            AtomicLocation::Pointer(ref $($m)? pointer) => $v.expression($($d)? pointer)?,
            AtomicLocation::Texel(ref $($m)? texel) => texel.$visit($v)?,
        }
    };
}

macro_rules! texel_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        let Texel {
            ref $($m)? image,
            ref $($m)? coordinate,
            ref $($m)? array_index,
            ref $($m)? sample,
        } = *$this;
        $v.expression($($d)? image)?;
        $v.expression($($d)? coordinate)?;
        for operand in array_index.into_iter().chain(sample) {
            $v.expression($($d)? operand)?;
        }
    };
}

macro_rules! collective_operation_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            CollectiveOperation::Reduce
            | CollectiveOperation::InclusiveScan
            | CollectiveOperation::ExclusiveScan
            | CollectiveOperation::ClusteredReduce(_) => {}
            CollectiveOperation::PartitionedReduce(ref $($m)? ballot)
            | CollectiveOperation::PartitionedInclusiveScan(ref $($m)? ballot)
            | CollectiveOperation::PartitionedExclusiveScan(ref $($m)? ballot) => {
                $v.expression($($d)? ballot)?;
            }
        }
    };
}

macro_rules! gather_mode_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            GatherMode::BroadcastFirst | GatherMode::QuadSwap(_) => {}
            GatherMode::Broadcast(ref $($m)? index)
            | GatherMode::Shuffle(ref $($m)? index)
            | GatherMode::ShuffleDown(ref $($m)? index)
            | GatherMode::ShuffleUp(ref $($m)? index)
            | GatherMode::ShuffleXor(ref $($m)? index)
            | GatherMode::QuadBroadcast(ref $($m)? index)
            | GatherMode::Rotate {
                delta: ref $($m)? index,
                cluster_size: _,
            } => $v.expression($($d)? index)?,
        }
    };
}

macro_rules! subgroup_function_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            SubgroupFunction::Elect => {}
            SubgroupFunction::AllEqual(ref $($m)? value)
            | SubgroupFunction::QuadAll(ref $($m)? value)
            | SubgroupFunction::QuadAny(ref $($m)? value)
            | SubgroupFunction::InverseBallot(ref $($m)? value)
            | SubgroupFunction::BallotFindLsb(ref $($m)? value)
            | SubgroupFunction::BallotFindMsb(ref $($m)? value)
            | SubgroupFunction::Partition(ref $($m)? value)
            | SubgroupFunction::KhrBallot(ref $($m)? value)
            | SubgroupFunction::KhrReadFirstInvocation(ref $($m)? value)
            | SubgroupFunction::KhrAll(ref $($m)? value)
            | SubgroupFunction::KhrAny(ref $($m)? value)
            | SubgroupFunction::KhrAllEqual(ref $($m)? value)
            | SubgroupFunction::AmdMbcnt(ref $($m)? value)
            | SubgroupFunction::AmdSwizzle {
                argument: ref $($m)? value,
                offset: _,
            }
            | SubgroupFunction::AmdSwizzleMasked {
                argument: ref $($m)? value,
                mask: _,
            } => $v.expression($($d)? value)?,
            SubgroupFunction::Group {
                op: _,
                ref $($m)? collective_op,
                ref $($m)? argument,
                non_uniform: _,
            } => {
                collective_op.$visit($v)?;
                $v.expression($($d)? argument)?;
            }
            SubgroupFunction::BallotBitExtract {
                ref $($m)? ballot,
                ref $($m)? index,
            } => {
                $v.expression($($d)? ballot)?;
                $v.expression($($d)? index)?;
            }
            SubgroupFunction::KhrReadInvocation {
                ref $($m)? argument,
                ref $($m)? index,
            } => {
                $v.expression($($d)? argument)?;
                $v.expression($($d)? index)?;
            }
            SubgroupFunction::BallotBitCount {
                ref $($m)? ballot,
                ref $($m)? collective_op,
            } => {
                $v.expression($($d)? ballot)?;
                collective_op.$visit($v)?;
            }
            SubgroupFunction::AmdWriteInvocation {
                ref $($m)? argument,
                ref $($m)? value,
                ref $($m)? index,
            } => {
                $v.expression($($d)? argument)?;
                $v.expression($($d)? value)?;
                $v.expression($($d)? index)?;
            }
        }
    };
}

macro_rules! ray_query_function_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            RayQueryFunction::Initialize {
                ref $($m)? acceleration_structure,
                ref $($m)? flags,
                ref $($m)? cull_mask,
                ref $($m)? origin,
                ref $($m)? tmin,
                ref $($m)? direction,
                ref $($m)? tmax,
            } => {
                $v.expression($($d)? acceleration_structure)?;
                $v.expression($($d)? flags)?;
                $v.expression($($d)? cull_mask)?;
                $v.expression($($d)? origin)?;
                $v.expression($($d)? tmin)?;
                $v.expression($($d)? direction)?;
                $v.expression($($d)? tmax)?;
            }
            RayQueryFunction::Proceed { ref $($m)? result } => $v.result($($d)? result)?,
            RayQueryFunction::GenerateIntersection { ref $($m)? hit_t } => {
                $v.expression($($d)? hit_t)?;
            }
            RayQueryFunction::ConfirmIntersection | RayQueryFunction::Terminate => {}
        }
    };
}

macro_rules! ray_pipeline_function_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            RayPipelineFunction::TraceRay {
                ref $($m)? acceleration_structure,
                ref $($m)? flags,
                ref $($m)? cull_mask,
                ref $($m)? sbt_offset,
                ref $($m)? sbt_stride,
                ref $($m)? miss_index,
                ref $($m)? origin,
                ref $($m)? tmin,
                ref $($m)? direction,
                ref $($m)? tmax,
                ref $($m)? time,
                ref $($m)? payload,
            } => {
                $v.expression($($d)? acceleration_structure)?;
                $v.expression($($d)? flags)?;
                $v.expression($($d)? cull_mask)?;
                $v.expression($($d)? sbt_offset)?;
                $v.expression($($d)? sbt_stride)?;
                $v.expression($($d)? miss_index)?;
                $v.expression($($d)? origin)?;
                $v.expression($($d)? tmin)?;
                $v.expression($($d)? direction)?;
                $v.expression($($d)? tmax)?;
                if let Some(ref $($m)? time) = *time {
                    $v.expression($($d)? time)?;
                }
                payload.$visit($v)?;
            }
            RayPipelineFunction::ExecuteCallable {
                ref $($m)? sbt_index,
                ref $($m)? data,
            } => {
                $v.expression($($d)? sbt_index)?;
                data.$visit($v)?;
            }
            RayPipelineFunction::ReportIntersection {
                ref $($m)? hit_t,
                ref $($m)? hit_kind,
                ref $($m)? result,
            } => {
                $v.expression($($d)? hit_t)?;
                $v.expression($($d)? hit_kind)?;
                $v.result($($d)? result)?;
            }
            RayPipelineFunction::IgnoreIntersection { flavor: _ }
            | RayPipelineFunction::TerminateRay { flavor: _ } => {}
        }
    };
}

macro_rules! ray_tracing_data_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            RayTracingData::Pointer(ref $($m)? pointer) => $v.expression($($d)? pointer)?,
            RayTracingData::Location(_) => {}
        }
    };
}

macro_rules! hit_object_trace_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        let HitObjectTrace {
            ref $($m)? acceleration_structure,
            ref $($m)? flags,
            ref $($m)? cull_mask,
            ref $($m)? sbt_offset,
            ref $($m)? sbt_stride,
            ref $($m)? miss_index,
            ref $($m)? origin,
            ref $($m)? tmin,
            ref $($m)? direction,
            ref $($m)? tmax,
            ref $($m)? time,
            ref $($m)? payload,
        } = *$this;
        $v.expression($($d)? acceleration_structure)?;
        $v.expression($($d)? flags)?;
        $v.expression($($d)? cull_mask)?;
        $v.expression($($d)? sbt_offset)?;
        $v.expression($($d)? sbt_stride)?;
        $v.expression($($d)? miss_index)?;
        $v.expression($($d)? origin)?;
        $v.expression($($d)? tmin)?;
        $v.expression($($d)? direction)?;
        $v.expression($($d)? tmax)?;
        if let Some(ref $($m)? time) = *time {
            $v.expression($($d)? time)?;
        }
        $v.expression($($d)? payload)?;
    };
}

macro_rules! reorder_hint_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        let ReorderHint {
            ref $($m)? hint,
            ref $($m)? bits,
        } = *$this;
        $v.expression($($d)? hint)?;
        $v.expression($($d)? bits)?;
    };
}

macro_rules! hit_object_sbt_record_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            HitObjectSbtRecord::OffsetStride {
                ref $($m)? offset,
                ref $($m)? stride,
            } => {
                $v.expression($($d)? offset)?;
                $v.expression($($d)? stride)?;
            }
            HitObjectSbtRecord::Index(ref $($m)? index) => $v.expression($($d)? index)?,
        }
    };
}

macro_rules! hit_object_function_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            HitObjectFunction::TraceRay(ref $($m)? trace) => trace.$visit($v)?,
            HitObjectFunction::TraceReorderExecute {
                ref $($m)? trace,
                ref $($m)? hint,
            } => {
                trace.$visit($v)?;
                if let Some(ref $($m)? hint) = *hint {
                    hint.$visit($v)?;
                }
            }
            HitObjectFunction::RecordHit {
                ref $($m)? acceleration_structure,
                ref $($m)? instance_id,
                ref $($m)? primitive_id,
                ref $($m)? geometry_index,
                ref $($m)? hit_kind,
                ref $($m)? sbt_record,
                ref $($m)? origin,
                ref $($m)? tmin,
                ref $($m)? direction,
                ref $($m)? tmax,
                ref $($m)? time,
                ref $($m)? attributes,
            } => {
                $v.expression($($d)? acceleration_structure)?;
                $v.expression($($d)? instance_id)?;
                $v.expression($($d)? primitive_id)?;
                $v.expression($($d)? geometry_index)?;
                $v.expression($($d)? hit_kind)?;
                sbt_record.$visit($v)?;
                $v.expression($($d)? origin)?;
                $v.expression($($d)? tmin)?;
                $v.expression($($d)? direction)?;
                $v.expression($($d)? tmax)?;
                if let Some(ref $($m)? time) = *time {
                    $v.expression($($d)? time)?;
                }
                $v.expression($($d)? attributes)?;
            }
            HitObjectFunction::RecordMiss {
                ref $($m)? flags,
                ref $($m)? miss_index,
                ref $($m)? origin,
                ref $($m)? tmin,
                ref $($m)? direction,
                ref $($m)? tmax,
                ref $($m)? time,
            } => {
                if let Some(ref $($m)? flags) = *flags {
                    $v.expression($($d)? flags)?;
                }
                $v.expression($($d)? miss_index)?;
                $v.expression($($d)? origin)?;
                $v.expression($($d)? tmin)?;
                $v.expression($($d)? direction)?;
                $v.expression($($d)? tmax)?;
                if let Some(ref $($m)? time) = *time {
                    $v.expression($($d)? time)?;
                }
            }
            HitObjectFunction::RecordEmpty => {}
            HitObjectFunction::RecordFromQuery {
                ref $($m)? query,
                ref $($m)? sbt_record_index,
                ref $($m)? attributes,
                ref $($m)? hit_kind,
            } => {
                $v.expression($($d)? query)?;
                $v.expression($($d)? sbt_record_index)?;
                $v.expression($($d)? attributes)?;
                if let Some(ref $($m)? hit_kind) = *hit_kind {
                    $v.expression($($d)? hit_kind)?;
                }
            }
            HitObjectFunction::ExecuteShader { ref $($m)? payload } => {
                $v.expression($($d)? payload)?;
            }
            HitObjectFunction::ReorderExecute {
                ref $($m)? payload,
                ref $($m)? hint,
            } => {
                $v.expression($($d)? payload)?;
                if let Some(ref $($m)? hint) = *hint {
                    hint.$visit($v)?;
                }
            }
            HitObjectFunction::GetAttributes { ref $($m)? attributes } => {
                $v.expression($($d)? attributes)?;
            }
            HitObjectFunction::SetShaderBindingTableRecordIndex { ref $($m)? index } => {
                $v.expression($($d)? index)?;
            }
            HitObjectFunction::ReorderThread { ref $($m)? hint } => {
                if let Some(ref $($m)? hint) = *hint {
                    hint.$visit($v)?;
                }
            }
        }
    };
}

macro_rules! mesh_function_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            MeshFunction::SetMeshOutputs {
                ref $($m)? vertex_count,
                ref $($m)? primitive_count,
            } => {
                $v.expression($($d)? vertex_count)?;
                $v.expression($($d)? primitive_count)?;
            }
            MeshFunction::EmitMeshTasks { ref $($m)? group_count } => {
                for count in group_count {
                    $v.expression($($d)? count)?;
                }
            }
            MeshFunction::WritePackedPrimitiveIndices {
                ref $($m)? index_offset,
                ref $($m)? packed_indices,
            } => {
                $v.expression($($d)? index_offset)?;
                $v.expression($($d)? packed_indices)?;
            }
        }
    };
}

macro_rules! debug_printf_argument_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            DebugPrintfArgument::Value(ref $($m)? value) => $v.expression($($d)? value)?,
            DebugPrintfArgument::String(_) => {}
        }
    };
}

macro_rules! spirv_operand_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            SpirvOperand::Value(ref $($m)? value) | SpirvOperand::Pointer(ref $($m)? value) => {
                $v.expression($($d)? value)?;
            }
            SpirvOperand::Literal(_) => {}
        }
    };
}

macro_rules! cooperative_vector_function_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            CooperativeVectorFunction::Store {
                ref $($m)? value,
                ref $($m)? pointer,
                ref $($m)? offset,
            }
            | CooperativeVectorFunction::ReduceSumAccumulate {
                ref $($m)? value,
                ref $($m)? pointer,
                ref $($m)? offset,
            } => {
                $v.expression($($d)? value)?;
                $v.expression($($d)? pointer)?;
                $v.expression($($d)? offset)?;
            }
            CooperativeVectorFunction::OuterProductAccumulate {
                ref $($m)? a,
                ref $($m)? b,
                ref $($m)? matrix,
                ref $($m)? offset,
                ref $($m)? stride,
                ref $($m)? layout,
                ref $($m)? interpretation,
            } => {
                $v.expression($($d)? a)?;
                $v.expression($($d)? b)?;
                $v.expression($($d)? matrix)?;
                $v.expression($($d)? offset)?;
                $v.expression($($d)? stride)?;
                $v.expression($($d)? layout)?;
                $v.expression($($d)? interpretation)?;
            }
        }
    };
}

macro_rules! cooperative_matrix_function_handles {
    ($this:ident, $v:ident, $visit:ident, [$($m:tt)?], [$($d:tt)?]) => {
        match *$this {
            CooperativeMatrixFunction::Transpose {
                ref $($m)? matrix,
                flavor: _,
            } => $v.expression($($d)? matrix)?,
            CooperativeMatrixFunction::Reduce {
                ref $($m)? matrix,
                mask: _,
                ref $($m)? combine,
                flavor: _,
            } => {
                $v.expression($($d)? matrix)?;
                $v.function($($d)? combine)?;
            }
            CooperativeMatrixFunction::PerElement {
                ref $($m)? matrix,
                ref $($m)? function,
                ref $($m)? arguments,
                flavor: _,
            } => {
                $v.expression($($d)? matrix)?;
                $v.function($($d)? function)?;
                for argument in arguments {
                    $v.expression($($d)? argument)?;
                }
            }
            CooperativeMatrixFunction::GetCoordinate {
                ref $($m)? matrix,
                ref $($m)? index,
            } => {
                $v.expression($($d)? matrix)?;
                $v.expression($($d)? index)?;
            }
            CooperativeMatrixFunction::LoadTensor {
                ref $($m)? pointer,
                ref $($m)? object,
                ref $($m)? layout,
                ref $($m)? view,
                ref $($m)? decode,
                ref $($m)? decode_vector,
            } => {
                $v.expression($($d)? pointer)?;
                $v.expression($($d)? object)?;
                $v.expression($($d)? layout)?;
                if let Some(ref $($m)? view) = *view {
                    $v.expression($($d)? view)?;
                }
                for decode in decode.into_iter().chain(decode_vector) {
                    $v.function($($d)? decode)?;
                }
            }
            CooperativeMatrixFunction::StoreTensor {
                ref $($m)? pointer,
                ref $($m)? value,
                ref $($m)? layout,
                ref $($m)? view,
            } => {
                $v.expression($($d)? pointer)?;
                $v.expression($($d)? value)?;
                $v.expression($($d)? layout)?;
                if let Some(ref $($m)? view) = *view {
                    $v.expression($($d)? view)?;
                }
            }
        }
    };
}

visitable! {
    Expression => expression_handles;
    Statement => statement_handles;
    SampleLevel => sample_level_handles;
    ImageQuery => image_query_handles;
    InterpolationLocation => interpolation_location_handles;
    AttachmentAspect => attachment_aspect_handles;
    CooperativeData => cooperative_data_handles;
    CooperativeVectorMatMul => cooperative_vector_mat_mul_handles;
    CooperativeVectorBias => cooperative_vector_bias_handles;
    AtomicFunction => atomic_function_handles;
    AtomicLocation => atomic_location_handles;
    Texel => texel_handles;
    CollectiveOperation => collective_operation_handles;
    GatherMode => gather_mode_handles;
    SubgroupFunction => subgroup_function_handles;
    RayQueryFunction => ray_query_function_handles;
    RayPipelineFunction => ray_pipeline_function_handles;
    RayTracingData => ray_tracing_data_handles;
    HitObjectTrace => hit_object_trace_handles;
    ReorderHint => reorder_hint_handles;
    HitObjectSbtRecord => hit_object_sbt_record_handles;
    HitObjectFunction => hit_object_function_handles;
    MeshFunction => mesh_function_handles;
    DebugPrintfArgument => debug_printf_argument_handles;
    SpirvOperand => spirv_operand_handles;
    CooperativeVectorFunction => cooperative_vector_function_handles;
    CooperativeMatrixFunction => cooperative_matrix_function_handles;
}

struct TryOperands<O>(O);

impl<'a, E, O: FnMut(Handle<Expression>) -> Result<(), E>> Visitor<'a> for TryOperands<O> {
    type Error = E;

    fn expression(&mut self, handle: Handle<Expression>) -> Result<(), E> {
        (self.0)(handle)
    }

    fn result(&mut self, _: Handle<Expression>) -> Result<(), E> {
        Ok(())
    }

    fn emitted(&mut self, _: &Range<Expression>) -> Result<(), E> {
        Ok(())
    }

    fn ty(&mut self, _: Handle<Type>) -> Result<(), E> {
        Ok(())
    }

    fn constant(&mut self, _: Handle<Constant>) -> Result<(), E> {
        Ok(())
    }

    fn r#override(&mut self, _: Handle<Override>) -> Result<(), E> {
        Ok(())
    }

    fn global_variable(&mut self, _: Handle<GlobalVariable>) -> Result<(), E> {
        Ok(())
    }

    fn local_variable(&mut self, _: Handle<LocalVariable>) -> Result<(), E> {
        Ok(())
    }

    fn function(&mut self, _: Handle<Function>) -> Result<(), E> {
        Ok(())
    }

    fn block(&mut self, _: &'a Block) -> Result<(), E> {
        Ok(())
    }
}

struct Parts<O, B, F> {
    operand: O,
    block: B,
    function: F,
}

impl<'a, O, B, F> Visitor<'a> for Parts<O, B, F>
where
    O: FnMut(Handle<Expression>),
    B: FnMut(&'a Block),
    F: FnMut(Handle<Function>),
{
    type Error = Infallible;

    fn expression(&mut self, handle: Handle<Expression>) -> Result<(), Infallible> {
        (self.operand)(handle);
        Ok(())
    }

    fn result(&mut self, _: Handle<Expression>) -> Result<(), Infallible> {
        Ok(())
    }

    fn emitted(&mut self, _: &Range<Expression>) -> Result<(), Infallible> {
        Ok(())
    }

    fn ty(&mut self, _: Handle<Type>) -> Result<(), Infallible> {
        Ok(())
    }

    fn constant(&mut self, _: Handle<Constant>) -> Result<(), Infallible> {
        Ok(())
    }

    fn r#override(&mut self, _: Handle<Override>) -> Result<(), Infallible> {
        Ok(())
    }

    fn global_variable(&mut self, _: Handle<GlobalVariable>) -> Result<(), Infallible> {
        Ok(())
    }

    fn local_variable(&mut self, _: Handle<LocalVariable>) -> Result<(), Infallible> {
        Ok(())
    }

    fn function(&mut self, handle: Handle<Function>) -> Result<(), Infallible> {
        (self.function)(handle);
        Ok(())
    }

    fn block(&mut self, block: &'a Block) -> Result<(), Infallible> {
        (self.block)(block);
        Ok(())
    }
}

impl<'a, O, B, F> VisitorMut<'a> for Parts<O, B, F>
where
    O: FnMut(&mut Handle<Expression>),
    B: FnMut(&'a mut Block),
    F: FnMut(&mut Handle<Function>),
{
    type Error = Infallible;

    fn expression(&mut self, handle: &mut Handle<Expression>) -> Result<(), Infallible> {
        (self.operand)(handle);
        Ok(())
    }

    fn result(&mut self, _: &mut Handle<Expression>) -> Result<(), Infallible> {
        Ok(())
    }

    fn emitted(&mut self, _: &mut Range<Expression>) -> Result<(), Infallible> {
        Ok(())
    }

    fn ty(&mut self, _: &mut Handle<Type>) -> Result<(), Infallible> {
        Ok(())
    }

    fn constant(&mut self, _: &mut Handle<Constant>) -> Result<(), Infallible> {
        Ok(())
    }

    fn r#override(&mut self, _: &mut Handle<Override>) -> Result<(), Infallible> {
        Ok(())
    }

    fn global_variable(&mut self, _: &mut Handle<GlobalVariable>) -> Result<(), Infallible> {
        Ok(())
    }

    fn local_variable(&mut self, _: &mut Handle<LocalVariable>) -> Result<(), Infallible> {
        Ok(())
    }

    fn function(&mut self, handle: &mut Handle<Function>) -> Result<(), Infallible> {
        (self.function)(handle);
        Ok(())
    }

    fn block(&mut self, block: &'a mut Block) -> Result<(), Infallible> {
        (self.block)(block);
        Ok(())
    }
}

impl Statement {
    pub fn for_each_child_block<'a>(&'a self, block: impl FnMut(&'a Block)) {
        let Ok(()) = self.visit(&mut Parts {
            operand: |_| {},
            block,
            function: |_| {},
        });
    }

    pub fn for_each_child_block_mut<'a>(&'a mut self, block: impl FnMut(&'a mut Block)) {
        let Ok(()) = self.visit_mut(&mut Parts {
            operand: |_: &mut Handle<Expression>| {},
            block,
            function: |_: &mut Handle<Function>| {},
        });
    }

    pub fn for_each_callee(&self, function: impl FnMut(Handle<Function>)) {
        let Ok(()) = self.visit(&mut Parts {
            operand: |_| {},
            block: |_| {},
            function,
        });
    }
}
