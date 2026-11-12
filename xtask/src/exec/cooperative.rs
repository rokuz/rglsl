use std::collections::{BTreeMap, BTreeSet};

use super::reflect::{
    CooperativeMatrixType, MatrixClass, VectorProduct, COMPONENT_BFLOAT16, COMPONENT_FLOAT_E4M3,
    COMPONENT_FLOAT_E5M2,
};
use super::requirements::{
    Need, COOPERATIVE_MATRIX_FLEXIBLE_DIMENSIONS, COOPERATIVE_MATRIX_WORKGROUP_SCOPE,
};

const MAX_SPECIALIZED: usize = 6;

const USE_A: u32 = 0;
const USE_B: u32 = 1;
const USE_ACCUMULATOR: u32 = 2;

const SCOPE_WORKGROUP: u32 = 2;

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
    pub saturating: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Flexible {
    pub shape: Shape,
    pub invocations: u32,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct VectorCombination {
    pub input: u32,
    pub input_interpretation: u32,
    pub matrix: u32,
    pub bias: u32,
    pub result: u32,
    pub transpose: bool,
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Support {
    pub khr: Vec<Shape>,
    pub nv: Vec<Shape>,
    pub flexible: Vec<Flexible>,
    pub max_dimension: Option<u32>,
    pub vectors: Vec<VectorCombination>,
}

fn fields<'a>(line: &'a str, prefix: &str) -> Option<impl Fn(&str) -> Option<u32> + 'a> {
    let rest = line.trim().strip_prefix(prefix)?;
    Some(move |key: &str| {
        rest.split_whitespace()
            .find_map(|item| item.strip_prefix(key)?.strip_prefix('='))
            .and_then(|value| value.parse::<u32>().ok())
    })
}

fn parse_shape_after(line: &str, prefix: &str) -> Option<Shape> {
    let field = fields(line, prefix)?;
    Some(Shape {
        m: field("M")?,
        n: field("N")?,
        k: field("K")?,
        a: field("A")?,
        b: field("B")?,
        c: field("C")?,
        result: field("Result")?,
        scope: field("scope")?,
        saturating: field("saturating").is_some_and(|value| value != 0),
    })
}

pub fn parse_shape(line: &str) -> Option<Shape> {
    parse_shape_after(line, "cooperativeMatrix:")
}

pub fn parse_shapes(text: &str) -> Vec<Shape> {
    text.lines().filter_map(parse_shape).collect()
}

fn parse_flexible(line: &str) -> Option<Flexible> {
    let shape = parse_shape_after(line, "cooperativeMatrixFlexible:")?;
    let field = fields(line, "cooperativeMatrixFlexible:")?;
    Some(Flexible {
        shape,
        invocations: field("invocations")?,
    })
}

fn parse_vector(line: &str) -> Option<VectorCombination> {
    let field = fields(line, "cooperativeVector:")?;
    Some(VectorCombination {
        input: field("input")?,
        input_interpretation: field("inputInterpretation")?,
        matrix: field("matrix")?,
        bias: field("bias")?,
        result: field("result")?,
        transpose: field("transpose")? != 0,
    })
}

pub fn parse_support(text: &str) -> Support {
    Support {
        khr: parse_shapes(text),
        nv: text
            .lines()
            .filter_map(|line| parse_shape_after(line, "cooperativeMatrixNV:"))
            .collect(),
        flexible: text.lines().filter_map(parse_flexible).collect(),
        max_dimension: text.lines().find_map(|line| {
            line.trim()
                .strip_prefix("cooperativeMatrixFlexibleDimensionsMaxDimension:")
                .and_then(|value| value.trim().parse().ok())
        }),
        vectors: text.lines().filter_map(parse_vector).collect(),
    }
}

fn component_name(ty: u32) -> String {
    match ty {
        0 => "float16".into(),
        1 => "float32".into(),
        2 => "float64".into(),
        3 => "int8".into(),
        4 => "int16".into(),
        5 => "int32".into(),
        6 => "int64".into(),
        7 => "uint8".into(),
        8 => "uint16".into(),
        9 => "uint32".into(),
        10 => "uint64".into(),
        COMPONENT_BFLOAT16 => "bfloat16".into(),
        COMPONENT_FLOAT_E4M3 => "floate4m3".into(),
        COMPONENT_FLOAT_E5M2 => "floate5m2".into(),
        other => format!("component type {other}"),
    }
}

fn usage_name(usage: Option<u32>) -> String {
    match usage {
        Some(USE_A) => "MatrixA".into(),
        Some(USE_B) => "MatrixB".into(),
        Some(USE_ACCUMULATOR) => "MatrixAccumulator".into(),
        Some(other) => format!("use {other}"),
        None => "NV".into(),
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

#[derive(Debug, Clone, Copy)]
struct Matrix {
    class: MatrixClass,
    ty: u32,
    rows: u32,
    columns: u32,
    usage: Option<u32>,
    scope: u32,
}

fn fixed(matrix: &Matrix, shape: &Shape) -> bool {
    if shape.scope != matrix.scope {
        return false;
    }
    let (rows, columns, ty) = (matrix.rows, matrix.columns, matrix.ty);
    match matrix.usage {
        Some(USE_A) => shape.m == rows && shape.k == columns && shape.a == ty,
        Some(USE_B) => shape.k == rows && shape.n == columns && shape.b == ty,
        Some(USE_ACCUMULATOR) => {
            shape.m == rows && shape.n == columns && (shape.c == ty || shape.result == ty)
        }
        Some(_) => false,
        None => {
            (shape.m == rows && shape.k == columns && shape.a == ty)
                || (shape.k == rows && shape.n == columns && shape.b == ty)
                || (shape.m == rows && shape.n == columns && (shape.c == ty || shape.result == ty))
        }
    }
}

fn multiple(value: u32, granularity: u32) -> bool {
    granularity != 0 && value.is_multiple_of(granularity)
}

fn flexible(matrix: &Matrix, flexible: &Flexible, limits: &Limits) -> bool {
    let shape = &flexible.shape;
    if shape.scope != matrix.scope {
        return false;
    }
    if matrix.scope == SCOPE_WORKGROUP && flexible.invocations != limits.invocations {
        return false;
    }
    if limits
        .max_dimension
        .is_some_and(|max| matrix.rows > max || matrix.columns > max)
    {
        return false;
    }
    let (rows, columns, ty) = (matrix.rows, matrix.columns, matrix.ty);
    match matrix.usage {
        Some(USE_A) => multiple(rows, shape.m) && multiple(columns, shape.k) && shape.a == ty,
        Some(USE_B) => multiple(rows, shape.k) && multiple(columns, shape.n) && shape.b == ty,
        Some(USE_ACCUMULATOR) => {
            multiple(rows, shape.m)
                && multiple(columns, shape.n)
                && (shape.c == ty || shape.result == ty)
        }
        _ => false,
    }
}

#[derive(Debug, Clone, Copy)]
pub struct Limits {
    pub invocations: u32,
    pub max_dimension: Option<u32>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Fit {
    Fixed,
    Flexible,
}

fn fit(matrix: &Matrix, support: &Support, limits: &Limits) -> Option<Fit> {
    let shapes = match matrix.class {
        MatrixClass::Khr => &support.khr,
        MatrixClass::Nv => &support.nv,
    };
    if shapes.iter().any(|shape| fixed(matrix, shape)) {
        return Some(Fit::Fixed);
    }
    if matrix.class == MatrixClass::Khr
        && support
            .flexible
            .iter()
            .any(|shape| flexible(matrix, shape, limits))
    {
        return Some(Fit::Flexible);
    }
    None
}

fn known(matrix: &CooperativeMatrixType) -> Option<Matrix> {
    Some(Matrix {
        class: matrix.class,
        ty: matrix.component?,
        rows: matrix.rows?,
        columns: matrix.columns?,
        usage: matrix.usage,
        scope: matrix.scope?,
    })
}

fn describe(matrix: &Matrix) -> String {
    let table = match matrix.class {
        MatrixClass::Khr => {
            "VkCooperativeMatrixPropertiesKHR or VkCooperativeMatrixFlexibleDimensionsPropertiesNV"
        }
        MatrixClass::Nv => "VkCooperativeMatrixPropertiesNV",
    };
    format!(
        "cooperative matrix {} {}x{} {} ({} scope) is not among the driver's {table}",
        component_name(matrix.ty),
        matrix.rows,
        matrix.columns,
        usage_name(matrix.usage),
        scope_name(matrix.scope)
    )
}

fn needs_of(
    types: &[CooperativeMatrixType],
    support: &Support,
    limits: &Limits,
) -> Result<BTreeSet<Need>, String> {
    let mut needs = BTreeSet::new();
    for matrix in types.iter().filter_map(known) {
        match fit(&matrix, support, limits) {
            None => return Err(describe(&matrix)),
            Some(Fit::Flexible) => {
                needs.insert(COOPERATIVE_MATRIX_FLEXIBLE_DIMENSIONS);
            }
            Some(Fit::Fixed) => {}
        }
        if matrix.class == MatrixClass::Khr && matrix.scope == SCOPE_WORKGROUP {
            needs.insert(COOPERATIVE_MATRIX_WORKGROUP_SCOPE);
        }
    }
    Ok(needs)
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

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Specialization {
    pub values: Vec<(u32, u32)>,
    pub needs: BTreeSet<Need>,
}

pub fn specialize(
    types: &[CooperativeMatrixType],
    support: &Support,
    limits: &Limits,
) -> Result<Specialization, String> {
    let problem = match needs_of(types, support, limits) {
        Ok(needs) => {
            return Ok(Specialization {
                values: Vec::new(),
                needs,
            })
        }
        Err(problem) => problem,
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
    let mut sizes: Vec<u32> = support
        .khr
        .iter()
        .chain(&support.nv)
        .flat_map(|s| [s.m, s.n, s.k])
        .collect();
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
        if let Ok(needs) = needs_of(&specialized(types, &values), support, limits) {
            return Ok(Specialization {
                values: values.into_iter().collect(),
                needs,
            });
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

pub fn unsupported_saturation(saturating: bool, support: &Support) -> Option<String> {
    (saturating
        && !support
            .khr
            .iter()
            .chain(support.flexible.iter().map(|flexible| &flexible.shape))
            .any(|shape| shape.saturating))
    .then(|| {
        "saturating accumulation is not among the driver's cooperative matrix properties"
            .to_string()
    })
}

fn product_supported(product: &VectorProduct, combination: &VectorCombination) -> bool {
    let same = |value: Option<u32>, supported: u32| value.is_none_or(|value| value == supported);
    same(product.input, combination.input)
        && same(
            product.input_interpretation,
            combination.input_interpretation,
        )
        && same(product.matrix_interpretation, combination.matrix)
        && product
            .bias_interpretation
            .is_none_or(|bias| same(bias, combination.bias))
        && same(product.result, combination.result)
        && (product.transpose != Some(true) || combination.transpose)
}

pub fn unsupported_product(products: &[VectorProduct], support: &Support) -> Option<String> {
    products.iter().find_map(|product| {
        if support
            .vectors
            .iter()
            .any(|combination| product_supported(product, combination))
        {
            return None;
        }
        let name = |value: Option<u32>| value.map_or_else(|| "?".to_string(), component_name);
        Some(format!(
            "cooperative vector product of {} input interpreted as {} with a {} matrix{}, {} result{} is not among the driver's VkCooperativeVectorPropertiesNV",
            name(product.input),
            name(product.input_interpretation),
            name(product.matrix_interpretation),
            product
                .bias_interpretation
                .map_or_else(String::new, |bias| format!(", {} bias", name(bias))),
            name(product.result),
            if product.transpose == Some(true) { ", transposed" } else { "" }
        ))
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    const F16: u32 = 0;
    const F32: u32 = 1;

    fn matrix(component: u32, rows: u32, columns: u32, usage: u32) -> CooperativeMatrixType {
        CooperativeMatrixType {
            class: MatrixClass::Khr,
            component: Some(component),
            scope: Some(3),
            rows: Some(rows),
            columns: Some(columns),
            usage: Some(usage),
            rows_spec: None,
            columns_spec: None,
        }
    }

    fn support(text: &str) -> Support {
        parse_support(text)
    }

    fn unsupported(types: &[CooperativeMatrixType], shapes: &[Shape]) -> Option<String> {
        let support = Support {
            khr: shapes.to_vec(),
            ..Support::default()
        };
        let limits = Limits {
            invocations: 0,
            max_dimension: None,
        };
        needs_of(types, &support, &limits).err()
    }

    const SUBGROUP: Limits = Limits {
        invocations: 32,
        max_dimension: None,
    };

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
                scope: 3,
                saturating: false
            }]
        );
        let all = support(
            "  cooperativeMatrixNV: M=16 N=8 K=8 A=0 B=0 C=1 Result=1 scope=3\n  cooperativeMatrixFlexible: M=16 N=16 K=16 A=0 B=0 C=1 Result=1 saturating=0 scope=2 invocations=64\n  cooperativeMatrixFlexibleDimensionsMaxDimension: 1024\n  cooperativeVector: input=0 inputInterpretation=0 matrix=0 bias=0 result=0 transpose=1\n",
        );
        assert!(all.khr.is_empty());
        assert_eq!(all.nv.len(), 1);
        assert_eq!(all.flexible.first().map(|f| f.invocations), Some(64));
        assert_eq!(all.max_dimension, Some(1024));
        assert_eq!(all.vectors.first().map(|v| v.transpose), Some(true));
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
        assert!(unsupported(&invalid, &shapes).is_some_and(
            |e| e.starts_with("cooperative matrix float32 1x8 MatrixA (Subgroup scope)")
        ));
        let unknown = [CooperativeMatrixType {
            rows: None,
            ..matrix(F32, 1, 8, USE_A)
        }];
        assert_eq!(unsupported(&unknown, &shapes), None);
    }

    #[test]
    fn nv_matrices_use_the_nv_shapes() {
        let shapes = support("cooperativeMatrixNV: M=16 N=8 K=16 A=0 B=0 C=1 Result=1 scope=3");
        let nv = |rows, columns, component| CooperativeMatrixType {
            class: MatrixClass::Nv,
            usage: None,
            ..matrix(component, rows, columns, USE_A)
        };
        assert!(specialize(&[nv(16, 16, F16), nv(16, 8, F32)], &shapes, &SUBGROUP).is_ok());
        assert!(specialize(&[nv(8, 8, F16)], &shapes, &SUBGROUP).is_err());
        assert!(specialize(&[matrix(F16, 16, 16, USE_A)], &shapes, &SUBGROUP).is_err());
    }

    #[test]
    fn flexible_dimensions_and_workgroup_scope_need_their_features() -> Result<(), String> {
        let shapes = support(
            "cooperativeMatrixFlexible: M=16 N=16 K=16 A=0 B=0 C=1 Result=1 saturating=0 scope=2 invocations=64\ncooperativeMatrixFlexibleDimensionsMaxDimension: 1024",
        );
        let workgroup = |rows, columns, usage| CooperativeMatrixType {
            scope: Some(SCOPE_WORKGROUP),
            ..matrix(F32, rows, columns, usage)
        };
        let limits = Limits {
            invocations: 64,
            max_dimension: shapes.max_dimension,
        };
        let found = specialize(&[workgroup(64, 32, USE_ACCUMULATOR)], &shapes, &limits)?;
        assert!(found.needs.contains(&COOPERATIVE_MATRIX_WORKGROUP_SCOPE));
        assert!(found
            .needs
            .contains(&COOPERATIVE_MATRIX_FLEXIBLE_DIMENSIONS));
        let other = Limits {
            invocations: 32,
            ..limits
        };
        assert!(specialize(&[workgroup(64, 32, USE_ACCUMULATOR)], &shapes, &other).is_err());
        assert!(specialize(&[workgroup(24, 32, USE_ACCUMULATOR)], &shapes, &limits).is_err());
        Ok(())
    }

    #[test]
    fn specialization_constants_pick_supported_sizes() {
        let shapes = support(
            "cooperativeMatrix: M=16 N=16 K=32 A=7 B=7 C=9 Result=9 saturating=0 scope=3\ncooperativeMatrix: M=16 N=16 K=16 A=0 B=0 C=1 Result=1 saturating=0 scope=3",
        );
        let types = [
            CooperativeMatrixType {
                rows_spec: Some(0),
                columns_spec: Some(1),
                ..matrix(7, 16, 16, USE_A)
            },
            CooperativeMatrixType {
                rows_spec: Some(0),
                ..matrix(F16, 16, 16, USE_A)
            },
        ];
        assert_eq!(
            specialize(&types, &shapes, &SUBGROUP).map(|s| s.values),
            Ok(vec![(0, 16), (1, 32)])
        );
        assert_eq!(
            specialize(types.get(1..).unwrap_or_default(), &shapes, &SUBGROUP).map(|s| s.values),
            Ok(Vec::new())
        );
        let fixed = [matrix(F32, 1, 8, USE_A)];
        assert!(specialize(&fixed, &shapes, &SUBGROUP).is_err());
        let hopeless = [CooperativeMatrixType {
            rows_spec: Some(3),
            ..matrix(F32, 1, 8, USE_A)
        }];
        assert!(specialize(&hopeless, &shapes, &SUBGROUP)
            .is_err_and(|e| e.contains("no values of its specialization constants")));
    }

    #[test]
    fn vector_products_must_be_supported() {
        let shapes = support(
            "cooperativeVector: input=0 inputInterpretation=0 matrix=0 bias=0 result=0 transpose=0\ncooperativeVector: input=1 inputInterpretation=3 matrix=3 bias=5 result=5 transpose=0",
        );
        let product = VectorProduct {
            input: Some(F16),
            input_interpretation: Some(F16),
            matrix_interpretation: Some(F16),
            bias_interpretation: None,
            result: Some(F16),
            transpose: Some(false),
        };
        assert_eq!(unsupported_product(&[product], &shapes), None);
        let transposed = VectorProduct {
            transpose: Some(true),
            ..product
        };
        assert!(unsupported_product(&[transposed], &shapes).is_some());
        let int8 = VectorProduct {
            input: Some(F32),
            input_interpretation: Some(3),
            matrix_interpretation: Some(3),
            bias_interpretation: Some(Some(5)),
            result: Some(5),
            transpose: Some(false),
        };
        assert_eq!(unsupported_product(&[int8], &shapes), None);
    }
}
