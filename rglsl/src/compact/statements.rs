use alloc::{vec, vec::Vec};

use super::functions::FunctionTracer;
use super::FunctionMap;
use crate::arena::{BadHandle, Handle};
use crate::compact::handle_set_map::HandleMap;

impl FunctionTracer<'_> {
    pub fn trace_block(&mut self, block: &[crate::Statement]) {
        let mut worklist: Vec<&[crate::Statement]> = vec![block];
        while let Some(last) = worklist.pop() {
            for stmt in last {
                use crate::Statement as St;
                match *stmt {
                    St::Emit(ref _range) => {
                        // If we come across a statement that actually uses an
                        // expression in this range, it'll get traced from
                        // there. But since evaluating expressions has no
                        // effect, we don't need to assume that everything
                        // emitted is live.
                    }
                    St::Block(ref block) => worklist.push(block),
                    St::If {
                        condition,
                        ref accept,
                        ref reject,
                    } => {
                        self.expressions_used.insert(condition);
                        worklist.push(accept);
                        worklist.push(reject);
                    }
                    St::Switch {
                        selector,
                        ref cases,
                    } => {
                        self.expressions_used.insert(selector);
                        for case in cases {
                            worklist.push(&case.body);
                        }
                    }
                    St::Loop {
                        ref body,
                        ref continuing,
                        break_if,
                        control: _,
                    } => {
                        if let Some(break_if) = break_if {
                            self.expressions_used.insert(break_if);
                        }
                        worklist.push(body);
                        worklist.push(continuing);
                    }
                    St::Return { value: Some(value) } => {
                        self.expressions_used.insert(value);
                    }
                    St::Store { pointer, value } => {
                        self.expressions_used.insert(pointer);
                        self.expressions_used.insert(value);
                    }
                    St::ImageStore {
                        image,
                        coordinate,
                        array_index,
                        value,
                    } => {
                        self.expressions_used.insert(image);
                        self.expressions_used.insert(coordinate);
                        if let Some(array_index) = array_index {
                            self.expressions_used.insert(array_index);
                        }
                        self.expressions_used.insert(value);
                    }
                    St::Atomic {
                        pointer,
                        ref fun,
                        value,
                        result,
                        order: _,
                    } => {
                        self.expressions_used.insert(pointer);
                        self.trace_atomic_function(fun);
                        self.expressions_used.insert(value);
                        if let Some(result) = result {
                            self.expressions_used.insert(result);
                        }
                    }
                    St::ImageAtomic {
                        image,
                        coordinate,
                        array_index,
                        ref fun,
                        value,
                        sample,
                        result,
                        order: _,
                    } => {
                        self.expressions_used.insert(image);
                        self.expressions_used.insert(coordinate);
                        if let Some(array_index) = array_index {
                            self.expressions_used.insert(array_index);
                        }
                        self.trace_atomic_function(fun);
                        self.expressions_used.insert(value);
                        if let Some(sample) = sample {
                            self.expressions_used.insert(sample);
                        }
                        if let Some(result) = result {
                            self.expressions_used.insert(result);
                        }
                    }
                    St::AtomicLoad {
                        ref location,
                        order: _,
                        result,
                    } => {
                        for handle in location.expressions() {
                            self.expressions_used.insert(handle);
                        }
                        self.expressions_used.insert(result);
                    }
                    St::AtomicStore {
                        ref location,
                        value,
                        order: _,
                    } => {
                        for handle in location.expressions() {
                            self.expressions_used.insert(handle);
                        }
                        self.expressions_used.insert(value);
                    }
                    St::WorkGroupUniformLoad { pointer, result } => {
                        self.expressions_used.insert(pointer);
                        self.expressions_used.insert(result);
                    }
                    St::Call {
                        function,
                        ref arguments,
                        result,
                    } => {
                        self.trace_call(function);
                        for expr in arguments {
                            self.expressions_used.insert(*expr);
                        }
                        if let Some(result) = result {
                            self.expressions_used.insert(result);
                        }
                    }
                    St::RayQuery { query, ref fun } => {
                        self.expressions_used.insert(query);
                        self.trace_ray_query_function(fun);
                    }
                    St::SubgroupBallot { result, predicate } => {
                        if let Some(predicate) = predicate {
                            self.expressions_used.insert(predicate);
                        }
                        self.expressions_used.insert(result);
                    }
                    St::SubgroupCollectiveOperation {
                        op: _,
                        ref collective_op,
                        argument,
                        result,
                    } => {
                        if let Some(ballot) = collective_op.partition() {
                            self.expressions_used.insert(ballot);
                        }
                        self.expressions_used.insert(argument);
                        self.expressions_used.insert(result);
                    }
                    St::SubgroupGather {
                        ref mode,
                        argument,
                        result,
                    } => {
                        if let Some(index) = mode.index() {
                            self.expressions_used.insert(index);
                        }
                        self.expressions_used.insert(argument);
                        self.expressions_used.insert(result);
                    }
                    St::SubgroupFunction { ref fun, result } => {
                        for operand in fun.operands().into_iter().flatten() {
                            self.expressions_used.insert(operand);
                        }
                        self.expressions_used.insert(result);
                    }
                    St::CooperativeStore { target, ref data } => {
                        self.expressions_used.insert(target);
                        self.expressions_used.insert_iter(data.operands());
                    }
                    St::RayPipelineFunction(ref func) => {
                        for operand in func.operands() {
                            self.expressions_used.insert(operand);
                        }
                        if let Some(result) = func.result() {
                            self.expressions_used.insert(result);
                        }
                    }
                    St::Assume { condition } => {
                        self.expressions_used.insert(condition);
                    }
                    St::CooperativeVector(ref function) => {
                        self.expressions_used.insert_iter(function.operands());
                    }
                    St::CooperativeMatrix {
                        ref function,
                        result,
                    } => {
                        self.expressions_used.insert_iter(function.operands());
                        if let Some(result) = result {
                            self.expressions_used.insert(result);
                        }
                        for callee in function.functions() {
                            self.trace_call(callee);
                        }
                    }
                    St::MeshFunction(ref function) => {
                        for operand in function.operands() {
                            self.expressions_used.insert(operand);
                        }
                    }
                    St::DebugPrintf { ref arguments, .. } => {
                        for argument in arguments {
                            if let crate::DebugPrintfArgument::Value(value) = *argument {
                                self.expressions_used.insert(value);
                            }
                        }
                    }
                    St::Abort {
                        ty, ref arguments, ..
                    } => {
                        self.types_used.insert(ty);
                        for &argument in arguments {
                            self.expressions_used.insert(argument);
                        }
                    }

                    // Trivial statements.
                    St::Break
                    | St::Continue
                    | St::Kill
                    | St::EmitVertex { .. }
                    | St::EndPrimitive { .. }
                    | St::ControlBarrier(_)
                    | St::ScopedBarrier { .. }
                    | St::MemoryBarrier(_)
                    | St::Return { value: None } => {}
                }
            }
        }
    }

    fn trace_atomic_function(&mut self, fun: &crate::AtomicFunction) {
        use crate::AtomicFunction as Af;
        match *fun {
            Af::Exchange {
                compare: Some(expr),
            } => {
                self.expressions_used.insert(expr);
            }
            Af::Exchange { compare: None }
            | Af::Add
            | Af::Subtract
            | Af::And
            | Af::ExclusiveOr
            | Af::InclusiveOr
            | Af::Min
            | Af::Max => {}
        }
    }

    fn trace_ray_query_function(&mut self, fun: &crate::RayQueryFunction) {
        use crate::RayQueryFunction as Qf;
        match *fun {
            Qf::Initialize { .. }
            | Qf::Proceed { .. }
            | Qf::GenerateIntersection { .. }
            | Qf::ConfirmIntersection
            | Qf::Terminate => {
                for operand in fun.operands().into_iter().chain(fun.result()) {
                    self.expressions_used.insert(operand);
                }
            }
        }
    }
}

impl FunctionMap {
    /// Adjust statements in the body of `function`.
    ///
    /// Adjusts expressions using `self.expressions`, and adjusts calls to other
    /// functions using `function_map`.
    pub fn adjust_body(
        &self,
        function: &mut crate::Function,
        function_map: &HandleMap<crate::Function>,
        type_map: &HandleMap<crate::Type>,
    ) -> Result<(), BadHandle> {
        let block = &mut function.body;
        let mut worklist: Vec<&mut [crate::Statement]> = vec![block];
        let adjust = |handle: &mut Handle<crate::Expression>| self.expressions.adjust(handle);
        while let Some(last) = worklist.pop() {
            for stmt in last {
                use crate::Statement as St;
                match *stmt {
                    St::Emit(ref mut range) => {
                        self.expressions.adjust_range(range, &function.expressions);
                    }
                    St::Block(ref mut block) => worklist.push(block),
                    St::If {
                        ref mut condition,
                        ref mut accept,
                        ref mut reject,
                    } => {
                        adjust(condition)?;
                        worklist.push(accept);
                        worklist.push(reject);
                    }
                    St::Switch {
                        ref mut selector,
                        ref mut cases,
                    } => {
                        adjust(selector)?;
                        for case in cases {
                            worklist.push(&mut case.body);
                        }
                    }
                    St::Loop {
                        ref mut body,
                        ref mut continuing,
                        ref mut break_if,
                        control: _,
                    } => {
                        if let Some(ref mut break_if) = *break_if {
                            adjust(break_if)?;
                        }
                        worklist.push(body);
                        worklist.push(continuing);
                    }
                    St::Return {
                        value: Some(ref mut value),
                    } => adjust(value)?,
                    St::Store {
                        ref mut pointer,
                        ref mut value,
                    } => {
                        adjust(pointer)?;
                        adjust(value)?;
                    }
                    St::ImageStore {
                        ref mut image,
                        ref mut coordinate,
                        ref mut array_index,
                        ref mut value,
                    } => {
                        adjust(image)?;
                        adjust(coordinate)?;
                        if let Some(ref mut array_index) = *array_index {
                            adjust(array_index)?;
                        }
                        adjust(value)?;
                    }
                    St::Atomic {
                        ref mut pointer,
                        ref mut fun,
                        ref mut value,
                        ref mut result,
                        order: _,
                    } => {
                        adjust(pointer)?;
                        self.adjust_atomic_function(fun)?;
                        adjust(value)?;
                        if let Some(ref mut result) = *result {
                            adjust(result)?;
                        }
                    }
                    St::ImageAtomic {
                        ref mut image,
                        ref mut coordinate,
                        ref mut array_index,
                        ref mut fun,
                        ref mut value,
                        ref mut sample,
                        ref mut result,
                        order: _,
                    } => {
                        adjust(image)?;
                        adjust(coordinate)?;
                        if let Some(ref mut array_index) = *array_index {
                            adjust(array_index)?;
                        }
                        self.adjust_atomic_function(fun)?;
                        adjust(value)?;
                        if let Some(ref mut sample) = *sample {
                            adjust(sample)?;
                        }
                        if let Some(ref mut result) = *result {
                            adjust(result)?;
                        }
                    }
                    St::AtomicLoad {
                        ref mut location,
                        order: _,
                        ref mut result,
                    } => {
                        self.adjust_atomic_location(location)?;
                        adjust(result)?;
                    }
                    St::AtomicStore {
                        ref mut location,
                        ref mut value,
                        order: _,
                    } => {
                        self.adjust_atomic_location(location)?;
                        adjust(value)?;
                    }
                    St::WorkGroupUniformLoad {
                        ref mut pointer,
                        ref mut result,
                    } => {
                        adjust(pointer)?;
                        adjust(result)?;
                    }
                    St::Call {
                        ref mut function,
                        ref mut arguments,
                        ref mut result,
                    } => {
                        function_map.adjust(function)?;
                        for expr in arguments {
                            adjust(expr)?;
                        }
                        if let Some(ref mut result) = *result {
                            adjust(result)?;
                        }
                    }
                    St::RayQuery {
                        ref mut query,
                        ref mut fun,
                    } => {
                        adjust(query)?;
                        self.adjust_ray_query_function(fun)?;
                    }
                    St::SubgroupBallot {
                        ref mut result,
                        ref mut predicate,
                    } => {
                        if let Some(ref mut predicate) = *predicate {
                            adjust(predicate)?;
                        }
                        adjust(result)?;
                    }
                    St::SubgroupCollectiveOperation {
                        op: _,
                        ref mut collective_op,
                        ref mut argument,
                        ref mut result,
                    } => {
                        if let Some(ballot) = collective_op.partition_mut() {
                            adjust(ballot)?;
                        }
                        adjust(argument)?;
                        adjust(result)?;
                    }
                    St::SubgroupGather {
                        ref mut mode,
                        ref mut argument,
                        ref mut result,
                    } => {
                        if let Some(index) = mode.index_mut() {
                            adjust(index)?;
                        }
                        adjust(argument)?;
                        adjust(result)?;
                    }
                    St::SubgroupFunction {
                        ref mut fun,
                        ref mut result,
                    } => {
                        for operand in fun.operands_mut().into_iter().flatten() {
                            adjust(operand)?;
                        }
                        adjust(result)?;
                    }
                    St::CooperativeStore {
                        ref mut target,
                        ref mut data,
                    } => {
                        adjust(target)?;
                        for operand in data.operands_mut() {
                            adjust(operand)?;
                        }
                    }
                    St::RayPipelineFunction(ref mut func) => {
                        for operand in func.operands_mut() {
                            adjust(operand)?;
                        }
                        if let Some(result) = func.result_mut() {
                            adjust(result)?;
                        }
                    }
                    St::Assume { ref mut condition } => adjust(condition)?,
                    St::CooperativeVector(ref mut function) => {
                        for operand in function.operands_mut() {
                            adjust(operand)?;
                        }
                    }
                    St::CooperativeMatrix {
                        ref mut function,
                        ref mut result,
                    } => {
                        for operand in function.operands_mut() {
                            adjust(operand)?;
                        }
                        for callee in function.functions_mut() {
                            function_map.adjust(callee)?;
                        }
                        if let Some(ref mut result) = *result {
                            adjust(result)?;
                        }
                    }
                    St::MeshFunction(ref mut function) => {
                        for operand in function.operands_mut() {
                            adjust(operand)?;
                        }
                    }
                    St::DebugPrintf {
                        ref mut arguments, ..
                    } => {
                        for argument in arguments.iter_mut() {
                            if let crate::DebugPrintfArgument::Value(ref mut value) = *argument {
                                adjust(value)?;
                            }
                        }
                    }
                    St::Abort {
                        ref mut ty,
                        ref mut arguments,
                        ..
                    } => {
                        type_map.adjust(ty)?;
                        for argument in arguments.iter_mut() {
                            adjust(argument)?;
                        }
                    }

                    // Trivial statements.
                    St::Break
                    | St::Continue
                    | St::Kill
                    | St::EmitVertex { .. }
                    | St::EndPrimitive { .. }
                    | St::ControlBarrier(_)
                    | St::ScopedBarrier { .. }
                    | St::MemoryBarrier(_)
                    | St::Return { value: None } => {}
                }
            }
        }
        Ok(())
    }

    fn adjust_atomic_function(&self, fun: &mut crate::AtomicFunction) -> Result<(), BadHandle> {
        use crate::AtomicFunction as Af;
        match *fun {
            Af::Exchange {
                compare: Some(ref mut expr),
            } => {
                self.expressions.adjust(expr)?;
            }
            Af::Exchange { compare: None }
            | Af::Add
            | Af::Subtract
            | Af::And
            | Af::ExclusiveOr
            | Af::InclusiveOr
            | Af::Min
            | Af::Max => {}
        }
        Ok(())
    }

    fn adjust_atomic_location(
        &self,
        location: &mut crate::AtomicLocation,
    ) -> Result<(), BadHandle> {
        match *location {
            crate::AtomicLocation::Pointer(ref mut pointer) => self.expressions.adjust(pointer)?,
            crate::AtomicLocation::Texel(ref mut texel) => {
                self.expressions.adjust(&mut texel.image)?;
                self.expressions.adjust(&mut texel.coordinate)?;
                if let Some(ref mut array_index) = texel.array_index {
                    self.expressions.adjust(array_index)?;
                }
                if let Some(ref mut sample) = texel.sample {
                    self.expressions.adjust(sample)?;
                }
            }
        }
        Ok(())
    }

    fn adjust_ray_query_function(
        &self,
        fun: &mut crate::RayQueryFunction,
    ) -> Result<(), BadHandle> {
        use crate::RayQueryFunction as Qf;
        match *fun {
            Qf::Initialize { .. }
            | Qf::Proceed { .. }
            | Qf::GenerateIntersection { .. }
            | Qf::ConfirmIntersection
            | Qf::Terminate => {
                for operand in fun.operands_mut() {
                    self.expressions.adjust(operand)?;
                }
            }
        }
        Ok(())
    }
}
