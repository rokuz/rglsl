use std::collections::BTreeMap;
use std::fmt::Write as _;

use super::{gl, Options};

#[derive(Debug, Clone)]
pub(super) struct Object {
    pub(super) name: String,
    pub(super) offset: i64,
    pub(super) gl_type: i64,
    pub(super) size: i64,
    pub(super) index: i64,
    pub(super) binding: i64,
    pub(super) stages: u32,
    pub(super) num_members: i64,
    pub(super) array_stride: i64,
    pub(super) top_level_array_stride: i64,
}

impl Object {
    pub(super) fn new(
        name: String,
        offset: i64,
        gl_type: i64,
        size: i64,
        index: i64,
        binding: i64,
    ) -> Self {
        Self {
            name,
            offset,
            gl_type,
            size,
            index,
            binding,
            stages: 0,
            num_members: -1,
            array_stride: 0,
            top_level_array_stride: 0,
        }
    }

    pub(super) fn dump(&self, text: &mut String) {
        let _ = write!(
            text,
            "{}: offset {}, type {:x}, size {}, index {}, binding {}, stages {}",
            self.name,
            self.offset,
            self.gl_type as i32 as u32,
            self.size,
            self.index,
            self.binding,
            self.stages
        );
        if self.num_members != -1 {
            let _ = write!(text, ", numMembers {}", self.num_members);
        }
        if self.array_stride != 0 {
            let _ = write!(text, ", arrayStride {}", self.array_stride);
        }
        if self.top_level_array_stride != 0 {
            let _ = write!(
                text,
                ", topLevelArrayStride {}",
                self.top_level_array_stride
            );
        }
        text.push('\n');
    }
}

#[derive(Debug, Default)]
pub(super) struct Database {
    pub(super) names: BTreeMap<String, usize>,
    pub(super) pipe_in_names: BTreeMap<String, usize>,
    pub(super) pipe_out_names: BTreeMap<String, usize>,
    pub(super) uniforms: Vec<Object>,
    pub(super) uniform_blocks: Vec<Object>,
    pub(super) buffer_variables: Vec<Object>,
    pub(super) buffer_blocks: Vec<Object>,
    pub(super) pipe_inputs: Vec<Object>,
    pub(super) pipe_outputs: Vec<Object>,
    pub(super) local_size: [u32; 3],
    pub(super) tile_shading_rate: [i64; 3],
}

impl Database {
    pub(super) fn pipe_input(
        &mut self,
        name: &str,
        scalar: rglsl_sema::types::Scalar,
        bit: u32,
        options: Options,
    ) {
        let (key, names) = if options.unwrap_io_blocks {
            (format!("in {name}"), &mut self.names)
        } else {
            (String::from(name), &mut self.pipe_in_names)
        };
        match names.get(&key).copied() {
            Some(index) => {
                if let Some(object) = self.pipe_inputs.get_mut(index) {
                    object.stages |= bit;
                }
            }
            None => {
                names.insert(key, self.pipe_inputs.len());
                let mut object = Object::new(String::from(name), 0, gl::scalar(scalar), 1, 0, -1);
                object.stages |= bit;
                self.pipe_inputs.push(object);
            }
        }
    }

    pub(super) fn dump(&self) -> String {
        let mut text = String::new();
        let sections: [(&str, &[Object]); 6] = [
            ("Uniform reflection:", &self.uniforms),
            ("Uniform block reflection:", &self.uniform_blocks),
            ("Buffer variable reflection:", &self.buffer_variables),
            ("Buffer block reflection:", &self.buffer_blocks),
            ("Pipeline input reflection:", &self.pipe_inputs),
            ("Pipeline output reflection:", &self.pipe_outputs),
        ];
        for (title, objects) in sections {
            text.push_str(title);
            text.push('\n');
            for object in objects {
                object.dump(&mut text);
            }
            text.push('\n');
        }
        if self.local_size[0] > 1 {
            for (axis, &size) in ["X", "Y", "Z"].iter().zip(&self.local_size) {
                if size > 1 {
                    let _ = writeln!(text, "Local size {axis}: {size}");
                }
            }
            text.push('\n');
        }
        if self.tile_shading_rate[0] > 1 || self.tile_shading_rate[1] > 1 {
            for (axis, size) in ["X", "Y", "Z"].iter().zip(&self.tile_shading_rate) {
                let _ = writeln!(text, "Tile shading rate QCOM {axis}: {size}");
            }
            text.push('\n');
        }
        text
    }
}
