use std::collections::VecDeque;

use super::batch::Outputs;
use super::reflect::{Layout, Pointee};

pub const MAX_NODES: usize = 32;
pub const PER_LAYOUT: usize = 4;
pub const SLACK: u32 = 256;
pub const TABLE: &str = "rglsl_refs";
const SYMBOLIC: u64 = 0xadd5 << 48;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Root {
    pub holder: String,
    pub offset: u32,
    pub pointee: Pointee,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Node {
    pub name: String,
    pub layout: Layout,
    pub length: u32,
    pub size: u32,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Link {
    pub node: usize,
    pub holder: String,
    pub offset: u32,
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Graph {
    pub nodes: Vec<Node>,
    pub links: Vec<Link>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Table {
    pub dump: String,
    pub sizes: Vec<u32>,
}

struct Pending {
    holder: String,
    offset: u32,
    pointee: Pointee,
    enclosing: Vec<usize>,
}

pub fn node_name(index: usize) -> String {
    format!("rglsl_ref{index}")
}

pub fn build(roots: Vec<Root>, length: impl Fn(&Layout) -> u32) -> Result<Graph, String> {
    let mut graph = Graph::default();
    let mut queue: VecDeque<Pending> = roots
        .into_iter()
        .map(|root| Pending {
            holder: root.holder,
            offset: root.offset,
            pointee: root.pointee,
            enclosing: Vec::new(),
        })
        .collect();
    while let Some(pending) = queue.pop_front() {
        let node = match &pending.pointee {
            Pointee::Enclosing(up) => usize::try_from(*up)
                .ok()
                .and_then(|up| pending.enclosing.len().checked_sub(up + 1))
                .and_then(|index| pending.enclosing.get(index).copied())
                .ok_or("a buffer reference to an enclosing block outside the reference chain")?,
            Pointee::Block(layout) => {
                let same: Vec<usize> = graph
                    .nodes
                    .iter()
                    .enumerate()
                    .filter(|(_, node)| node.layout == **layout)
                    .map(|(index, _)| index)
                    .collect();
                if same.len() >= PER_LAYOUT || (graph.nodes.len() >= MAX_NODES && !same.is_empty())
                {
                    let reused = graph.links.len() % same.len();
                    same.get(reused).copied().ok_or("no block to reuse")?
                } else if graph.nodes.len() >= MAX_NODES {
                    return Err(format!(
                        "buffer references to more than {MAX_NODES} distinct blocks"
                    ));
                } else {
                    let index = graph.nodes.len();
                    let runtime = if layout.has_runtime_array() {
                        length(layout)
                    } else {
                        0
                    };
                    let size = layout.size(runtime);
                    graph.nodes.push(Node {
                        name: node_name(index),
                        layout: layout.as_ref().clone(),
                        length: runtime,
                        size,
                    });
                    let mut inner = Vec::new();
                    layout.pointers(0, runtime, &mut inner);
                    let mut enclosing = pending.enclosing.clone();
                    enclosing.push(index);
                    for (offset, pointee) in inner {
                        queue.push_back(Pending {
                            holder: node_name(index),
                            offset,
                            pointee: pointee.clone(),
                            enclosing: enclosing.clone(),
                        });
                    }
                    index
                }
            }
        };
        graph.links.push(Link {
            node,
            holder: pending.holder,
            offset: pending.offset,
        });
    }
    Ok(graph)
}

fn read_u64(bytes: &[u8], at: usize) -> Option<u64> {
    let raw: [u8; 8] = bytes.get(at..at.checked_add(8)?)?.try_into().ok()?;
    Some(u64::from_le_bytes(raw))
}

pub fn symbolic(outputs: &Outputs, table: &Table) -> Outputs {
    let bases: Vec<u64> = outputs.get(&table.dump).map_or_else(Vec::new, |bytes| {
        (0..table.sizes.len())
            .map_while(|index| read_u64(bytes, index * 8))
            .collect()
    });
    let lookup = |value: u64| {
        bases
            .iter()
            .zip(&table.sizes)
            .enumerate()
            .find_map(|(index, (base, size))| {
                let offset = value.checked_sub(*base)?;
                (offset <= u64::from(*size)).then(|| {
                    let index = u64::try_from(index).unwrap_or(u64::MAX >> 16);
                    SYMBOLIC | (index << 32) | offset
                })
            })
    };
    outputs
        .iter()
        .map(|(dump, bytes)| {
            let mut bytes = bytes.clone();
            if *dump != table.dump {
                let mut at = 0;
                while let Some(value) = read_u64(&bytes, at) {
                    match lookup(value) {
                        Some(symbol) => {
                            if let Some(field) = bytes.get_mut(at..at + 8) {
                                field.copy_from_slice(&symbol.to_le_bytes());
                            }
                            at += 8;
                        }
                        None => at += 4,
                    }
                }
            }
            (dump.clone(), bytes)
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::exec::reflect::{Scalar, ScalarKind};

    const U32: Scalar = Scalar {
        kind: ScalarKind::Uint,
        width: 32,
    };

    fn node_layout() -> Layout {
        Layout::Struct {
            members: vec![
                (0, Layout::Scalar(U32)),
                (8, Layout::Pointer(Pointee::Enclosing(0))),
            ],
        }
    }

    #[test]
    fn a_self_referencing_block_points_at_itself() -> Result<(), String> {
        let graph = build(
            vec![Root {
                holder: "r0_0".into(),
                offset: 8,
                pointee: Pointee::Block(Box::new(node_layout())),
            }],
            |_| 0,
        )?;
        assert_eq!(graph.nodes.len(), 1);
        assert_eq!(graph.nodes[0].size, 16);
        assert_eq!(
            graph.links,
            vec![
                Link {
                    node: 0,
                    holder: "r0_0".into(),
                    offset: 8
                },
                Link {
                    node: 0,
                    holder: "rglsl_ref0".into(),
                    offset: 8
                },
            ]
        );
        Ok(())
    }

    #[test]
    fn reuses_blocks_of_one_layout() -> Result<(), String> {
        let leaf = Layout::Struct {
            members: vec![(0, Layout::Scalar(U32))],
        };
        let roots = (0..20)
            .map(|index| Root {
                holder: "push".into(),
                offset: index * 8,
                pointee: Pointee::Block(Box::new(leaf.clone())),
            })
            .collect();
        let graph = build(roots, |_| 0)?;
        assert_eq!(graph.nodes.len(), PER_LAYOUT);
        assert_eq!(graph.links.len(), 20);
        assert!(graph.links.iter().all(|link| link.node < PER_LAYOUT));
        Ok(())
    }

    #[test]
    fn addresses_become_buffer_and_offset() {
        let table = Table {
            dump: "dump:0:2".into(),
            sizes: vec![16, 32],
        };
        let base_a: u64 = 0x1_0000_1000;
        let base_b: u64 = 0x1_0000_2000;
        let mut first = Outputs::new();
        let mut table_bytes = base_a.to_le_bytes().to_vec();
        table_bytes.extend(base_b.to_le_bytes());
        first.insert("dump:0:2".into(), table_bytes);
        let mut data = vec![7u8; 4];
        data.extend((base_b + 4).to_le_bytes());
        data.extend(99u64.to_le_bytes());
        first.insert("dump:0:0".into(), data);
        let mut second = Outputs::new();
        let shift: u64 = 0x40_0000;
        let mut table_bytes = (base_a + shift).to_le_bytes().to_vec();
        table_bytes.extend((base_b + shift).to_le_bytes());
        second.insert("dump:0:2".into(), table_bytes);
        let mut data = vec![7u8; 4];
        data.extend((base_b + shift + 4).to_le_bytes());
        data.extend(99u64.to_le_bytes());
        second.insert("dump:0:0".into(), data);
        let a = symbolic(&first, &table);
        let b = symbolic(&second, &table);
        assert_eq!(a.get("dump:0:0"), b.get("dump:0:0"));
        assert_ne!(first.get("dump:0:0"), second.get("dump:0:0"));
        assert_eq!(
            a.get("dump:0:0").and_then(|bytes| read_u64(bytes, 4)),
            Some(SYMBOLIC | (1 << 32) | 4)
        );
    }
}
