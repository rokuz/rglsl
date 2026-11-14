use rglsl_types::extension::Extension::*;

use super::BuiltinFunction;
use super::Floats::DoublesAndHalves;
use crate::builtins::kind::{
    AtomicOperation, Attachment, Barrier, BuiltinKind, InterpolateAt, MemoryBarrier, Mesh,
    Primitive, SplitPhase,
};
use crate::builtins::{COMPUTE, FRAGMENT, GEOMETRY, MESH, TASK, TESS_CONTROL};

pub(super) const FUNCTIONS: &[BuiltinFunction] = builtins! {
    "atomicAdd": BuiltinKind::Atomic(AtomicOperation::Add) => [
        uint(inout uint, uint),
        int(inout int, int),
        uint64_t(inout uint64_t, uint64_t),
        int64_t(inout int64_t, int64_t),
        uint(inout uint, uint, int, int, int),
        int(inout int, int, int, int, int),
        uint64_t(inout uint64_t, uint64_t, int, int, int),
        int64_t(inout int64_t, int64_t, int, int, int),
        float16_t(inout float16_t, float16_t),
        float16_t(inout float16_t, float16_t, int, int, int),
        float(inout float, float),
        float(inout float, float, int, int, int),
        double(inout double, double),
        double(inout double, double, int, int, int),
    ]
    "atomicMin": BuiltinKind::Atomic(AtomicOperation::Min) => [
        uint(inout uint, uint),
        int(inout int, int),
        uint64_t(inout uint64_t, uint64_t),
        int64_t(inout int64_t, int64_t),
        uint(inout uint, uint, int, int, int),
        int(inout int, int, int, int, int),
        uint64_t(inout uint64_t, uint64_t, int, int, int),
        int64_t(inout int64_t, int64_t, int, int, int),
        float16_t(inout float16_t, float16_t),
        float16_t(inout float16_t, float16_t, int, int, int),
        float(inout float, float),
        float(inout float, float, int, int, int),
        double(inout double, double),
        double(inout double, double, int, int, int),
    ]
    "atomicMax": BuiltinKind::Atomic(AtomicOperation::Max) => [
        uint(inout uint, uint),
        int(inout int, int),
        uint64_t(inout uint64_t, uint64_t),
        int64_t(inout int64_t, int64_t),
        uint(inout uint, uint, int, int, int),
        int(inout int, int, int, int, int),
        uint64_t(inout uint64_t, uint64_t, int, int, int),
        int64_t(inout int64_t, int64_t, int, int, int),
        float16_t(inout float16_t, float16_t),
        float16_t(inout float16_t, float16_t, int, int, int),
        float(inout float, float),
        float(inout float, float, int, int, int),
        double(inout double, double),
        double(inout double, double, int, int, int),
    ]
    "atomicAnd": BuiltinKind::Atomic(AtomicOperation::And) => [
        uint(inout uint, uint),
        int(inout int, int),
        uint64_t(inout uint64_t, uint64_t),
        int64_t(inout int64_t, int64_t),
        uint(inout uint, uint, int, int, int),
        int(inout int, int, int, int, int),
        uint64_t(inout uint64_t, uint64_t, int, int, int),
        int64_t(inout int64_t, int64_t, int, int, int),
    ]
    "atomicOr": BuiltinKind::Atomic(AtomicOperation::Or) => [
        uint(inout uint, uint),
        int(inout int, int),
        uint64_t(inout uint64_t, uint64_t),
        int64_t(inout int64_t, int64_t),
        uint(inout uint, uint, int, int, int),
        int(inout int, int, int, int, int),
        uint64_t(inout uint64_t, uint64_t, int, int, int),
        int64_t(inout int64_t, int64_t, int, int, int),
    ]
    "atomicXor": BuiltinKind::Atomic(AtomicOperation::Xor) => [
        uint(inout uint, uint),
        int(inout int, int),
        uint64_t(inout uint64_t, uint64_t),
        int64_t(inout int64_t, int64_t),
        uint(inout uint, uint, int, int, int),
        int(inout int, int, int, int, int),
        uint64_t(inout uint64_t, uint64_t, int, int, int),
        int64_t(inout int64_t, int64_t, int, int, int),
    ]
    "atomicExchange": BuiltinKind::Atomic(AtomicOperation::Exchange) => [
        uint(inout uint, uint),
        int(inout int, int),
        uint64_t(inout uint64_t, uint64_t),
        int64_t(inout int64_t, int64_t),
        uint(inout uint, uint, int, int, int),
        int(inout int, int, int, int, int),
        uint64_t(inout uint64_t, uint64_t, int, int, int),
        int64_t(inout int64_t, int64_t, int, int, int),
        float16_t(inout float16_t, float16_t),
        float16_t(inout float16_t, float16_t, int, int, int),
        float(inout float, float),
        float(inout float, float, int, int, int),
        double(inout double, double),
        double(inout double, double, int, int, int),
    ]
    "atomicCompSwap": BuiltinKind::Atomic(AtomicOperation::CompareSwap) => [
        uint(inout uint, uint, uint),
        int(inout int, int, int),
        uint64_t(inout uint64_t, uint64_t, uint64_t),
        int64_t(inout int64_t, int64_t, int64_t),
        uint(inout uint, uint, uint, int, int, int, int, int),
        int(inout int, int, int, int, int, int, int, int),
        uint64_t(inout uint64_t, uint64_t, uint64_t, int, int, int, int, int),
        int64_t(inout int64_t, int64_t, int64_t, int, int, int, int, int),
    ]
    "atomicLoad": BuiltinKind::Atomic(AtomicOperation::Load) => [
        uint(uint, int, int, int),
        int(int, int, int, int),
        uint64_t(uint64_t, int, int, int),
        int64_t(int64_t, int, int, int),
        float16_t(float16_t, int, int, int),
        float(float, int, int, int),
        double(double, int, int, int),
    ]
    "atomicStore": BuiltinKind::Atomic(AtomicOperation::Store) => [
        void(out uint, uint, int, int, int),
        void(out int, int, int, int, int),
        void(out uint64_t, uint64_t, int, int, int),
        void(out int64_t, int64_t, int, int, int),
        void(out float16_t, float16_t, int, int, int),
        void(out float, float, int, int, int),
        void(out double, double, int, int, int),
    ]
    "interpolateAtCentroid": BuiltinKind::Interpolate(InterpolateAt::Centroid) => [genF(genF)] {
        stages: FRAGMENT,
        floats: DoublesAndHalves,
        precision_operands: Some(1),
    }
    "interpolateAtSample": BuiltinKind::Interpolate(InterpolateAt::Sample) => [genF(genF, int)] {
        stages: FRAGMENT,
        floats: DoublesAndHalves,
        precision_operands: Some(1),
    }
    "interpolateAtOffset": BuiltinKind::Interpolate(InterpolateAt::Offset) => [genF(genF, vec2)] {
        stages: FRAGMENT,
        floats: DoublesAndHalves,
        precision_operands: Some(1),
    }
    "EmitStreamVertex": BuiltinKind::Primitive(Primitive::Emit) => [void(int)] {
        stages: GEOMETRY,
    }
    "EndStreamPrimitive": BuiltinKind::Primitive(Primitive::End) => [void(int)] {
        stages: GEOMETRY,
    }
    "EmitVertex": BuiltinKind::Primitive(Primitive::Emit) => [void()] {
        stages: GEOMETRY,
    }
    "EndPrimitive": BuiltinKind::Primitive(Primitive::End) => [void()] {
        stages: GEOMETRY,
    }
    "barrier": BuiltinKind::Barrier(Barrier::Execution) => [void()] {
        stages: TESS_CONTROL | COMPUTE | MESH | TASK,
    }
    "memoryBarrier": BuiltinKind::Barrier(Barrier::Memory(MemoryBarrier::All)) => [void()]
    "memoryBarrierBuffer": BuiltinKind::Barrier(Barrier::Memory(MemoryBarrier::Buffer)) => [void()]
    "memoryBarrierImage": BuiltinKind::Barrier(Barrier::Memory(MemoryBarrier::Image)) => [void()]
    "controlBarrier": BuiltinKind::Barrier(Barrier::ScopedControl) => [void(int, int, int, int)]
    "memoryBarrier": BuiltinKind::Barrier(Barrier::ScopedMemory) => [void(int, int, int)]
    "controlBarrierArrive": BuiltinKind::Barrier(Barrier::Split { phase: SplitPhase::Arrive, scoped: true }) => [
        void(int, int, int, int),
    ] {
        requires: &[ExtSplitBarrier],
    }
    "controlBarrierWait": BuiltinKind::Barrier(Barrier::Split { phase: SplitPhase::Wait, scoped: true }) => [
        void(int, int, int, int),
    ] {
        requires: &[ExtSplitBarrier],
    }
    "controlBarrierArrive": BuiltinKind::Barrier(Barrier::Split { phase: SplitPhase::Arrive, scoped: false }) => [
        void(),
    ] {
        requires: &[ExtSplitBarrier],
        stages: COMPUTE,
    }
    "controlBarrierWait": BuiltinKind::Barrier(Barrier::Split { phase: SplitPhase::Wait, scoped: false }) => [
        void(),
    ] {
        requires: &[ExtSplitBarrier],
        stages: COMPUTE,
    }
    "beginInvocationInterlockARB": BuiltinKind::Interlock { begin: true } => [void()] {
        stages: FRAGMENT,
    }
    "endInvocationInterlockARB": BuiltinKind::Interlock { begin: false } => [void()] {
        stages: FRAGMENT,
    }
    "helperInvocationEXT": BuiltinKind::HelperInvocation => [bool()] {
        requires: &[ExtDemoteToHelperInvocation],
        stages: FRAGMENT,
    }
    "stencilAttachmentReadEXT": BuiltinKind::AttachmentRead(Attachment::Stencil) => [
        uint(),
        uint(int),
    ] {
        requires: &[ExtShaderTileImage],
        flags: flags!(LOWP_RESULT),
        stages: FRAGMENT,
    }
    "depthAttachmentReadEXT": BuiltinKind::AttachmentRead(Attachment::Depth) => [
        float(),
        float(int),
    ] {
        requires: &[ExtShaderTileImage],
        stages: FRAGMENT,
    }
    "colorAttachmentReadEXT": BuiltinKind::AttachmentRead(Attachment::Color) => [
        vec4(attachmentEXT),
        vec4(attachmentEXT, int),
        ivec4(iattachmentEXT),
        ivec4(iattachmentEXT, int),
        uvec4(uattachmentEXT),
        uvec4(uattachmentEXT, int),
    ] {
        requires: &[ExtShaderTileImage],
        stages: FRAGMENT,
    }
    "memoryBarrierShared": BuiltinKind::Barrier(Barrier::Memory(MemoryBarrier::Shared)) => [
        void(),
    ] {
        stages: COMPUTE | MESH | TASK,
    }
    "groupMemoryBarrier": BuiltinKind::Barrier(Barrier::Memory(MemoryBarrier::Workgroup)) => [
        void(),
    ] {
        stages: COMPUTE | MESH | TASK,
    }
    "SetMeshOutputsEXT": BuiltinKind::Mesh(Mesh::SetOutputs) => [void(uint, uint)] {
        requires: &[ExtMeshShader],
        stages: MESH,
    }
    "writePackedPrimitiveIndices4x8NV": BuiltinKind::Mesh(Mesh::WritePackedPrimitiveIndices) => [
        void(uint, uint),
    ] {
        requires: &[NvMeshShader],
        stages: MESH,
    }
    "EmitMeshTasksEXT": BuiltinKind::Mesh(Mesh::EmitTasks) => [void(uint, uint, uint)] {
        requires: &[ExtMeshShader],
        stages: TASK,
    }
};
