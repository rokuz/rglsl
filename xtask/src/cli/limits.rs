use super::Case;

macro_rules! limits {
    ($name:literal) => {
        concat!(env!("CARGO_MANIFEST_DIR"), "/cli/limits/", $name)
    };
}

macro_rules! case {
    ($name:literal, [$($arg:literal),* $(,)?], [$($file:literal),* $(,)?]) => {
        Case::new($name, &[$($arg),*], &[])$(.file_as(limits!($file), $file))*
    };
}

pub(super) fn cases() -> Vec<Case> {
    vec![
        Case::new("limits-dump", &["-c"], &[]),
        case!("limits-dump-and-compile", ["-c", "-V", "simple.vert"], ["simple.vert"]),
        Case::new("limits-dump-skips-conf", &["-c", "absent.conf"], &[]),
        Case::new("limits-dump-before-version", &["-c", "-v"], &[]),
        case!("limits-local-size-default", ["-V", "local-size.comp"], ["local-size.comp"]),
        case!(
            "limits-local-size-large",
            ["-V", "local-size.comp", "large.conf"],
            ["local-size.comp", "large.conf"]
        ),
        case!(
            "limits-local-size-small",
            ["-V", "local-size.comp", "small.conf"],
            ["local-size.comp", "small.conf"]
        ),
        case!(
            "limits-local-size-validate",
            ["local-size.comp", "large.conf"],
            ["local-size.comp", "large.conf"]
        ),
        case!("limits-mesh-nv-default", ["-V", "mesh-nv.mesh"], ["mesh-nv.mesh"]),
        case!(
            "limits-mesh-nv-large",
            ["-V", "mesh-nv.mesh", "large.conf"],
            ["mesh-nv.mesh", "large.conf"]
        ),
        case!(
            "limits-mesh-nv-small",
            ["-V", "mesh-nv.mesh", "small.conf"],
            ["mesh-nv.mesh", "small.conf"]
        ),
        case!("limits-task-nv-default", ["-V", "task-nv.task"], ["task-nv.task"]),
        case!(
            "limits-task-nv-large",
            ["-V", "task-nv.task", "large.conf"],
            ["task-nv.task", "large.conf"]
        ),
        case!(
            "limits-mesh-ext-default",
            ["-V", "--target-env", "spirv1.4", "mesh-ext.mesh"],
            ["mesh-ext.mesh"]
        ),
        case!(
            "limits-mesh-ext-large",
            ["-V", "--target-env", "spirv1.4", "mesh-ext.mesh", "large.conf"],
            ["mesh-ext.mesh", "large.conf"]
        ),
        case!(
            "limits-task-ext-default",
            ["-V", "--target-env", "spirv1.4", "task-ext.task"],
            ["task-ext.task"]
        ),
        case!(
            "limits-task-ext-large",
            ["-V", "--target-env", "spirv1.4", "task-ext.task", "large.conf"],
            ["task-ext.task", "large.conf"]
        ),
        case!("limits-draw-buffers-default", ["-V", "draw-buffers.frag"], ["draw-buffers.frag"]),
        case!(
            "limits-draw-buffers-large",
            ["-V", "draw-buffers.frag", "large.conf"],
            ["draw-buffers.frag", "large.conf"]
        ),
        case!(
            "limits-draw-buffers-partial",
            ["-V", "draw-buffers.frag", "partial.conf"],
            ["draw-buffers.frag", "partial.conf"]
        ),
        case!("limits-clip-size-default", ["-V", "clip-distance.vert"], ["clip-distance.vert"]),
        case!(
            "limits-clip-size-large",
            ["-V", "clip-distance.vert", "large.conf"],
            ["clip-distance.vert", "large.conf"]
        ),
        case!("limits-clip-index-default", ["-V", "clip-index.vert"], ["clip-index.vert"]),
        case!(
            "limits-clip-index-large",
            ["-V", "clip-index.vert", "large.conf"],
            ["clip-index.vert", "large.conf"]
        ),
        case!("limits-constants-default", ["-V", "constants.vert"], ["constants.vert"]),
        case!(
            "limits-constants-large",
            ["-V", "constants.vert", "large.conf"],
            ["constants.vert", "large.conf"]
        ),
        case!("limits-xfb-buffer-default", ["-V", "xfb-buffer.vert"], ["xfb-buffer.vert"]),
        case!(
            "limits-xfb-buffer-large",
            ["-V", "xfb-buffer.vert", "large.conf"],
            ["xfb-buffer.vert", "large.conf"]
        ),
        case!("limits-xfb-stride-default", ["-V", "xfb-stride.vert"], ["xfb-stride.vert"]),
        case!(
            "limits-xfb-stride-large",
            ["-V", "xfb-stride.vert", "large.conf"],
            ["xfb-stride.vert", "large.conf"]
        ),
        case!("limits-xfb-implicit-default", ["-V", "xfb-implicit.vert"], ["xfb-implicit.vert"]),
        case!(
            "limits-xfb-implicit-large",
            ["-V", "xfb-implicit.vert", "large.conf"],
            ["xfb-implicit.vert", "large.conf"]
        ),
        case!(
            "limits-xfb-implicit-small",
            ["-V", "xfb-implicit.vert", "small.conf"],
            ["xfb-implicit.vert", "small.conf"]
        ),
        case!(
            "limits-xfb-link-default",
            ["-V", "xfb-main.vert", "xfb-capture.vert"],
            ["xfb-main.vert", "xfb-capture.vert"]
        ),
        case!(
            "limits-xfb-link-large",
            ["-V", "xfb-main.vert", "xfb-capture.vert", "large.conf"],
            ["xfb-main.vert", "xfb-capture.vert", "large.conf"]
        )
        .exits(
            0,
            "glslang also gives the gl_PerVertex block of a linked program XfbBuffer and XfbStride, rglsl's linker does not",
        ),
        case!("limits-geometry-default", ["-V", "geometry.geom"], ["geometry.geom"]),
        case!(
            "limits-geometry-large",
            ["-V", "geometry.geom", "large.conf"],
            ["geometry.geom", "large.conf"]
        ),
        case!(
            "limits-geometry-small",
            ["-V", "geometry.geom", "small.conf"],
            ["geometry.geom", "small.conf"]
        ),
        case!("limits-patch-tesc-default", ["-V", "patch.tesc"], ["patch.tesc"]),
        case!(
            "limits-patch-tesc-large",
            ["-V", "patch.tesc", "large.conf"],
            ["patch.tesc", "large.conf"]
        ),
        case!("limits-patch-tese-default", ["-V", "patch.tese"], ["patch.tese"]),
        case!(
            "limits-patch-tese-large",
            ["-V", "patch.tese", "large.conf"],
            ["patch.tese", "large.conf"]
        ),
        case!(
            "limits-patch-zero",
            ["-V", "patch.tesc", "zero-patch.conf"],
            ["patch.tesc", "zero-patch.conf"]
        )
        .exits(
            2,
            "gl_in cannot be sized: glslang fails to parse its built-ins and prints them, rglsl reports a compile error",
        ),
        case!("limits-texel-offset-default", ["-V", "texel-offset.frag"], ["texel-offset.frag"]),
        case!(
            "limits-texel-offset-large",
            ["-V", "texel-offset.frag", "large.conf"],
            ["texel-offset.frag", "large.conf"]
        ),
        case!("limits-sample-mask-default", ["-V", "sample-mask.frag"], ["sample-mask.frag"]),
        case!(
            "limits-sample-mask-large",
            ["-V", "sample-mask.frag", "large.conf"],
            ["sample-mask.frag", "large.conf"]
        ),
        case!("limits-while-default", ["-V", "loops.frag"], ["loops.frag"]),
        case!(
            "limits-while-disabled",
            ["-V", "loops.frag", "loops.conf"],
            ["loops.frag", "loops.conf"]
        ),
        case!(
            "limits-do-while-disabled",
            ["-V", "do-while.frag", "loops.conf"],
            ["do-while.frag", "loops.conf"]
        ),
        case!(
            "limits-inductive-condition",
            ["-V", "inductive.frag", "loops.conf"],
            ["inductive.frag", "loops.conf"]
        ),
        case!(
            "limits-inductive-modified",
            ["-V", "inductive-modified.frag", "loops.conf"],
            ["inductive-modified.frag", "loops.conf"]
        ),
        case!(
            "limits-inductive-allowed",
            ["-V", "inductive-ok.frag", "loops.conf"],
            ["inductive-ok.frag", "loops.conf"]
        ),
        case!(
            "limits-variable-index",
            ["-V", "index.frag", "loops.conf"],
            ["index.frag", "loops.conf"]
        ),
        case!(
            "limits-uniform-index",
            ["-V", "uniform-index.frag", "loops.conf"],
            ["uniform-index.frag", "loops.conf"]
        ),
        case!(
            "limits-partial-zeroes-the-rest",
            ["-V", "simple.comp", "partial.conf"],
            ["simple.comp", "partial.conf"]
        ),
        case!(
            "limits-partial-vertex",
            ["-V", "simple.vert", "partial.conf"],
            ["simple.vert", "partial.conf"]
        ),
        case!(
            "limits-unknown-name",
            ["-V", "simple.vert", "unknown.conf"],
            ["simple.vert", "unknown.conf"]
        ),
        case!(
            "limits-bad-value",
            ["-V", "clip-index.vert", "bad-value.conf"],
            ["clip-index.vert", "bad-value.conf"]
        ),
        case!(
            "limits-bad-value-compiles",
            ["-V", "simple.vert", "bad-value.conf"],
            ["simple.vert", "bad-value.conf"]
        ),
        case!(
            "limits-empty-vertex",
            ["-V", "simple.vert", "empty.conf"],
            ["simple.vert", "empty.conf"]
        ),
        case!(
            "limits-empty-compute",
            ["-V", "simple.comp", "empty.conf"],
            ["simple.comp", "empty.conf"]
        ),
        case!(
            "limits-bom-and-whitespace",
            ["-V", "local-size.comp", "bom.conf"],
            ["local-size.comp", "bom.conf"]
        ),
        case!(
            "limits-atoi",
            ["-V", "local-size.comp", "atoi.conf"],
            ["local-size.comp", "atoi.conf"]
        ),
        case!(
            "limits-last-conf-wins",
            ["-V", "local-size.comp", "small.conf", "large.conf"],
            ["local-size.comp", "small.conf", "large.conf"]
        ),
        case!(
            "limits-missing-conf",
            ["-V", "simple.vert", "absent.conf"],
            ["simple.vert"]
        ),
        case!(
            "limits-preprocess",
            ["-E", "simple.vert", "large.conf"],
            ["simple.vert", "large.conf"]
        ),
    ]
}
