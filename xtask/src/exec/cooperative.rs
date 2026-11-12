use std::collections::BTreeMap;

use super::reflect::{CooperativeMatrixType, Scalar, ScalarKind};

const MAX_SPECIALIZED: usize = 6;

const USE_A: u32 = 0;
const USE_B: u32 = 1;
const USE_ACCUMULATOR: u32 = 2;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Shape {
    pub m: u32,
    pub n: u32,
    pub k: u32,
    pub a: u32,
    pub b: u32,
    pub c: u32,
    pub result: u32,
    pub scope: u32,
}

pub fn parse_shape(line: &str) -> Option<Shape> {
    let rest = line.trim().strip_prefix("cooperativeMatrix:")?;
    let field = |key: &str| {
        rest.split_whitespace()
            .find_map(|item| item.strip_prefix(key)?.strip_prefix('='))
            .and_then(|value| value.parse::<u32>().ok())
    };
    Some(Shape {
        m: field("M")?,
        n: field("N")?,
        k: field("K")?,
        a: field("A")?,
        b: field("B")?,
        c: field("C")?,
        result: field("Result")?,
        scope: field("scope")?,
    })
}

pub fn parse_shapes(text: &str) -> Vec<Shape> {
    text.lines().filter_map(parse_shape).collect()
}

fn component_type(scalar: Scalar) -> Option<u32> {
    Some(match (scalar.kind, scalar.width) {
        (ScalarKind::Float, 16) => 0,
        (ScalarKind::Float, 32) => 1,
        (ScalarKind::Float, 64) => 2,
        (ScalarKind::Sint, 8) => 3,
        (ScalarKind::Sint, 16) => 4,
        (ScalarKind::Sint, 32) => 5,
        (ScalarKind::Sint, 64) => 6,
        (ScalarKind::Uint, 8) => 7,
        (ScalarKind::Uint, 16) => 8,
        (ScalarKind::Uint, 32) => 9,
        (ScalarKind::Uint, 64) => 10,
        _ => return None,
    })
}

fn scalar_name(scalar: Scalar) -> String {
    let prefix = match scalar.kind {
        ScalarKind::Float => "float",
        ScalarKind::Sint => "int",
        ScalarKind::Uint => "uint",
        ScalarKind::Bool => "bool",
    };
    format!("{prefix}{}", scalar.width)
}

fn usage_name(usage: u32) -> String {
    match usage {
        USE_A => "MatrixA".into(),
        USE_B => "MatrixB".into(),
        USE_ACCUMULATOR => "MatrixAccumulator".into(),
        other => format!("use {other}"),
    }
}

fn scope_name(scope: u32) -> String {
    match scope {
        1 => "Device".into(),
        2 => "Workgroup".into(),
        3 => "Subgroup".into(),
        5 => "QueueFamily".into(),
        other => format!("scope {other}"),
    }
}

fn supported(ty: u32, rows: u32, columns: u32, usage: u32, scope: u32, shape: &Shape) -> bool {
    if shape.scope != scope {
        return false;
    }
    match usage {
        USE_A => shape.m == rows && shape.k == columns && shape.a == ty,
        USE_B => shape.k == rows && shape.n == columns && shape.b == ty,
        USE_ACCUMULATOR => {
            shape.m == rows && shape.n == columns && (shape.c == ty || shape.result == ty)
        }
        _ => false,
    }
}

pub fn unsupported(types: &[CooperativeMatrixType], shapes: &[Shape]) -> Option<String> {
    types.iter().find_map(|matrix| {
        let (Some(scalar), Some(scope), Some(rows), Some(columns), Some(usage)) = (
            matrix.component,
            matrix.scope,
            matrix.rows,
            matrix.columns,
            matrix.usage,
        ) else {
            return None;
        };
        let ty = component_type(scalar)?;
        if shapes
            .iter()
            .any(|shape| supported(ty, rows, columns, usage, scope, shape))
        {
            return None;
        }
        Some(format!(
            "cooperative matrix {} {rows}x{columns} {} ({} scope) is not among the driver's VkCooperativeMatrixPropertiesKHR",
            scalar_name(scalar),
            usage_name(usage),
            scope_name(scope)
        ))
    })
}

fn specialized(
    types: &[CooperativeMatrixType],
    values: &BTreeMap<u32, u32>,
) -> Vec<CooperativeMatrixType> {
    types
        .iter()
        .map(|matrix| CooperativeMatrixType {
            rows: matrix
                .rows_spec
                .and_then(|id| values.get(&id).copied())
                .or(matrix.rows),
            columns: matrix
                .columns_spec
                .and_then(|id| values.get(&id).copied())
                .or(matrix.columns),
            ..*matrix
        })
        .collect()
}

pub fn specialize(
    types: &[CooperativeMatrixType],
    shapes: &[Shape],
) -> Result<Vec<(u32, u32)>, String> {
    let Some(problem) = unsupported(types, shapes) else {
        return Ok(Vec::new());
    };
    let mut defaults: BTreeMap<u32, u32> = BTreeMap::new();
    for matrix in types {
        if let (Some(id), Some(value)) = (matrix.rows_spec, matrix.rows) {
            defaults.insert(id, value);
        }
        if let (Some(id), Some(value)) = (matrix.columns_spec, matrix.columns) {
            defaults.insert(id, value);
        }
    }
    if defaults.is_empty() || defaults.len() > MAX_SPECIALIZED {
        return Err(problem);
    }
    let mut sizes: Vec<u32> = shapes.iter().flat_map(|s| [s.m, s.n, s.k]).collect();
    sizes.sort_unstable();
    sizes.dedup();
    let ids: Vec<u32> = defaults.keys().copied().collect();
    let candidates: Vec<Vec<u32>> = ids
        .iter()
        .map(|id| {
            let default = defaults.get(id).copied().unwrap_or_default();
            let mut list = vec![default];
            list.extend(sizes.iter().copied().filter(|size| *size != default));
            list
        })
        .collect();
    let mut choice = vec![0usize; ids.len()];
    loop {
        let values: BTreeMap<u32, u32> = ids
            .iter()
            .zip(&choice)
            .zip(&candidates)
            .filter_map(|((id, index), list)| list.get(*index).map(|value| (*id, *value)))
            .collect();
        if unsupported(&specialized(types, &values), shapes).is_none() {
            return Ok(values.into_iter().collect());
        }
        let mut position = 0;
        loop {
            let (Some(index), Some(list)) = (choice.get_mut(position), candidates.get(position))
            else {
                return Err(format!(
                    "{problem}, and no values of its specialization constants make every cooperative matrix type supported"
                ));
            };
            *index += 1;
            if *index < list.len() {
                break;
            }
            *index = 0;
            position += 1;
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const F16: Scalar = Scalar {
        kind: ScalarKind::Float,
        width: 16,
    };
    const F32: Scalar = Scalar {
        kind: ScalarKind::Float,
        width: 32,
    };

    fn matrix(component: Scalar, rows: u32, columns: u32, usage: u32) -> CooperativeMatrixType {
        CooperativeMatrixType {
            component: Some(component),
            scope: Some(3),
            rows: Some(rows),
            columns: Some(columns),
            usage: Some(usage),
            rows_spec: None,
            columns_spec: None,
        }
    }

    #[test]
    fn parses_the_shapes_amber_prints() {
        let shapes = parse_shapes(
            "  deviceName: X\n  cooperativeMatrix: M=16 N=8 K=16 A=0 B=0 C=1 Result=1 saturating=0 scope=3\n  cooperativeMatrix: M=bad\n",
        );
        assert_eq!(
            shapes,
            [Shape {
                m: 16,
                n: 8,
                k: 16,
                a: 0,
                b: 0,
                c: 1,
                result: 1,
                scope: 3
            }]
        );
    }

    #[test]
    fn matrices_must_match_a_supported_shape() {
        let shapes = parse_shapes(
            "cooperativeMatrix: M=16 N=8 K=16 A=0 B=0 C=1 Result=1 saturating=0 scope=3",
        );
        let valid = [
            matrix(F16, 16, 16, USE_A),
            matrix(F16, 16, 8, USE_B),
            matrix(F32, 16, 8, USE_ACCUMULATOR),
        ];
        assert_eq!(unsupported(&valid, &shapes), None);
        let invalid = [matrix(F32, 1, 8, USE_A)];
        assert_eq!(
            unsupported(&invalid, &shapes).as_deref(),
            Some("cooperative matrix float32 1x8 MatrixA (Subgroup scope) is not among the driver's VkCooperativeMatrixPropertiesKHR")
        );
        let unknown = [CooperativeMatrixType {
            rows: None,
            ..matrix(F32, 1, 8, USE_A)
        }];
        assert_eq!(unsupported(&unknown, &shapes), None);
    }

    #[test]
    fn specialization_constants_pick_supported_sizes() {
        let shapes = parse_shapes(
            "cooperativeMatrix: M=16 N=16 K=32 A=7 B=7 C=9 Result=9 saturating=0 scope=3\ncooperativeMatrix: M=16 N=16 K=16 A=0 B=0 C=1 Result=1 saturating=0 scope=3",
        );
        let u8 = Scalar {
            kind: ScalarKind::Uint,
            width: 8,
        };
        let types = [
            CooperativeMatrixType {
                rows_spec: Some(0),
                columns_spec: Some(1),
                ..matrix(u8, 16, 16, USE_A)
            },
            CooperativeMatrixType {
                rows_spec: Some(0),
                ..matrix(F16, 16, 16, USE_A)
            },
        ];
        assert_eq!(specialize(&types, &shapes), Ok(vec![(0, 16), (1, 32)]));
        assert_eq!(specialize(&types[1..], &shapes), Ok(Vec::new()));
        let fixed = [matrix(F32, 1, 8, USE_A)];
        assert!(specialize(&fixed, &shapes).is_err());
        let hopeless = [CooperativeMatrixType {
            rows_spec: Some(3),
            ..matrix(F32, 1, 8, USE_A)
        }];
        assert!(specialize(&hopeless, &shapes)
            .is_err_and(|e| e.contains("no values of its specialization constants")));
    }
}
