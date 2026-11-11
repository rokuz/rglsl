use rglsl_ast::ast::{BasicType, Dimension, ScalarType, TypeSpecifier, TypeSpecifierNonArray};
use rglsl_sema::types::Scalar;
use rglsl_sema::{Type, TypeKind};

pub const FLOAT: BasicType = BasicType::Scalar(ScalarType::Float);
pub const INT: BasicType = BasicType::Scalar(ScalarType::Int);
pub const UINT: BasicType = BasicType::Scalar(ScalarType::Uint);
pub const BOOL: BasicType = BasicType::Scalar(ScalarType::Bool);
pub const VEC2: BasicType = BasicType::Vector {
    scalar: ScalarType::Float,
    size: Dimension::Two,
};

const ELEMENTS: [ScalarType; 4] = [
    ScalarType::Float,
    ScalarType::Uint,
    ScalarType::Int,
    ScalarType::Bool,
];

const DIMENSIONS: [Dimension; 3] = [Dimension::Two, Dimension::Three, Dimension::Four];

pub const fn dimension(count: u32) -> Option<Dimension> {
    match count {
        2 => Some(Dimension::Two),
        3 => Some(Dimension::Three),
        4 => Some(Dimension::Four),
        _ => None,
    }
}

pub const fn vector(scalar: ScalarType, size: u32) -> BasicType {
    match dimension(size) {
        Some(size) => BasicType::Vector { scalar, size },
        None => BasicType::Scalar(scalar),
    }
}

pub const fn matrix(columns: Dimension, rows: Dimension) -> BasicType {
    BasicType::Matrix {
        scalar: ScalarType::Float,
        columns,
        rows,
    }
}

pub fn square_matrix(size: u32) -> Option<BasicType> {
    dimension(size).map(|size| matrix(size, size))
}

pub const fn element(ty: BasicType) -> ScalarType {
    match ty {
        BasicType::Scalar(scalar)
        | BasicType::Vector { scalar, .. }
        | BasicType::Matrix { scalar, .. } => scalar,
    }
}

pub const fn element_type(ty: BasicType) -> BasicType {
    BasicType::Scalar(element(ty))
}

pub const fn columns(ty: BasicType) -> u32 {
    match ty {
        BasicType::Scalar(_) => 1,
        BasicType::Vector { size, .. } => size.count(),
        BasicType::Matrix { columns, .. } => columns.count(),
    }
}

pub const fn rows(ty: BasicType) -> u32 {
    match ty {
        BasicType::Matrix { rows, .. } => rows.count(),
        _ => 1,
    }
}

pub const fn num_elements(ty: BasicType) -> u32 {
    match ty {
        BasicType::Scalar(_) => 1,
        BasicType::Vector { size, .. } => size.count(),
        BasicType::Matrix { columns, rows, .. } => columns.count() * rows.count(),
    }
}

pub const fn column_type(ty: BasicType) -> BasicType {
    match ty {
        BasicType::Matrix { scalar, rows, .. } => BasicType::Vector { scalar, size: rows },
        BasicType::Vector { scalar, .. } | BasicType::Scalar(scalar) => BasicType::Scalar(scalar),
    }
}

pub const fn transposed(ty: BasicType) -> BasicType {
    match ty {
        BasicType::Matrix {
            scalar,
            columns,
            rows,
        } => BasicType::Matrix {
            scalar,
            columns: rows,
            rows: columns,
        },
        other => other,
    }
}

pub const fn is_scalar(ty: BasicType) -> bool {
    matches!(ty, BasicType::Scalar(_))
}

pub const fn is_vector(ty: BasicType) -> bool {
    matches!(ty, BasicType::Vector { .. })
}

pub const fn is_matrix(ty: BasicType) -> bool {
    matches!(ty, BasicType::Matrix { .. })
}

pub fn is_square_matrix(ty: BasicType) -> bool {
    matches!(ty, BasicType::Matrix { columns, rows, .. } if columns == rows)
}

pub fn is_boolean(ty: BasicType) -> bool {
    element(ty) == ScalarType::Bool
}

pub fn is_integer(ty: BasicType) -> bool {
    !is_matrix(ty) && matches!(element(ty), ScalarType::Int | ScalarType::Uint)
}

pub fn is_gen_type(ty: BasicType) -> bool {
    !is_matrix(ty) && element(ty) == ScalarType::Float
}

pub fn is_numeric(ty: BasicType) -> bool {
    !is_boolean(ty)
}

pub fn all_vectors_of(scalar: ScalarType) -> Vec<BasicType> {
    (1..=4).map(|size| vector(scalar, size)).collect()
}

pub fn all_matrix_types() -> Vec<BasicType> {
    let mut result = Vec::new();
    for columns in DIMENSIONS {
        for rows in DIMENSIONS {
            result.push(matrix(columns, rows));
        }
    }
    result
}

pub fn all_square_matrix_types() -> Vec<BasicType> {
    DIMENSIONS.iter().map(|size| matrix(*size, *size)).collect()
}

pub fn all_non_square_matrix_types() -> Vec<BasicType> {
    all_matrix_types()
        .into_iter()
        .filter(|ty| !is_square_matrix(*ty))
        .collect()
}

pub fn all_basic_types() -> Vec<BasicType> {
    let mut result = Vec::new();
    for scalar in ELEMENTS {
        result.extend(all_vectors_of(scalar));
    }
    result.extend(all_matrix_types());
    result
}

pub fn all_gen_types() -> Vec<BasicType> {
    all_vectors_of(ScalarType::Float)
}

pub fn from_sema(ty: &Type) -> Option<BasicType> {
    if ty.is_array() {
        return None;
    }
    let scalar = |scalar: Scalar| match scalar {
        Scalar::Bool => Some(ScalarType::Bool),
        Scalar::Int => Some(ScalarType::Int),
        Scalar::Uint => Some(ScalarType::Uint),
        Scalar::Float => Some(ScalarType::Float),
        Scalar::Double
        | Scalar::Int8
        | Scalar::Uint8
        | Scalar::Int16
        | Scalar::Uint16
        | Scalar::Int64
        | Scalar::Uint64
        | Scalar::Float16
        | Scalar::BFloat16
        | Scalar::FloatE4M3
        | Scalar::FloatE5M2 => None,
    };
    match ty.kind {
        TypeKind::Scalar(element) => scalar(element).map(BasicType::Scalar),
        TypeKind::Vector {
            scalar: element,
            size,
        } => Some(vector(scalar(element)?, u32::from(size))).filter(|ty| is_vector(*ty)),
        TypeKind::Matrix {
            scalar: Scalar::Float,
            columns,
            rows,
        } => Some(matrix(
            dimension(u32::from(columns))?,
            dimension(u32::from(rows))?,
        )),
        _ => None,
    }
}

pub fn from_specifier(specifier: &TypeSpecifier) -> Option<BasicType> {
    if specifier.array.is_some() {
        return None;
    }
    match specifier.non_array {
        TypeSpecifierNonArray::Basic(ty) if element(ty) != ScalarType::Double => Some(ty),
        _ => None,
    }
}

pub const fn specifier(ty: BasicType) -> TypeSpecifier {
    TypeSpecifier {
        non_array: TypeSpecifierNonArray::Basic(ty),
        parameters: None,
        array: None,
    }
}
