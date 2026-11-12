use rglsl_sema::types::Scalar;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Sampled {
    Float,
    Int,
    Uint,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Dimension {
    D1,
    D2,
    D3,
    Cube,
    Buffer,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Sampler {
    pub image: bool,
    pub sampled: Sampled,
    pub dimension: Dimension,
    pub arrayed: bool,
    pub shadow: bool,
    pub multisample: bool,
}

pub const fn scalar(scalar: Scalar) -> i64 {
    match scalar {
        Scalar::Float => 0x1406,
        Scalar::Double => 0x140A,
        Scalar::Float16 => 0x8FF8,
        Scalar::Int => 0x1404,
        Scalar::Uint => 0x1405,
        Scalar::Int64 => 0x140E,
        Scalar::Uint64 => 0x140F,
        Scalar::Bool => 0x8B56,
        _ => 0,
    }
}

pub fn vector(scalar: Scalar, size: u8) -> i64 {
    let base = match scalar {
        Scalar::Float => 0x8B50,
        Scalar::Double => 0x8FFC,
        Scalar::Float16 => 0x8FF9,
        Scalar::Int => 0x8B53,
        Scalar::Uint => 0x8DC6,
        Scalar::Int64 => 0x8FE9,
        Scalar::Uint64 => 0x8FF5,
        Scalar::Bool => 0x8B57,
        _ => return 0,
    };
    base + i64::from(size) - 2
}

pub const fn matrix(scalar: Scalar, columns: u8, rows: u8) -> i64 {
    let table: [[i64; 3]; 3] = match scalar {
        Scalar::Float => [
            [0x8B5A, 0x8B65, 0x8B66],
            [0x8B67, 0x8B5B, 0x8B68],
            [0x8B69, 0x8B6A, 0x8B5C],
        ],
        Scalar::Double => [
            [0x8F46, 0x8F49, 0x8F4A],
            [0x8F4B, 0x8F47, 0x8F4C],
            [0x8F4D, 0x8F4E, 0x8F48],
        ],
        Scalar::Float16 => [
            [0x91C5, 0x91C8, 0x91C9],
            [0x91CA, 0x91C6, 0x91CB],
            [0x91CC, 0x91CD, 0x91C7],
        ],
        _ => return 0,
    };
    let (column, row) = match (columns.checked_sub(2), rows.checked_sub(2)) {
        (Some(column @ 0..=2), Some(row @ 0..=2)) => (column as usize, row as usize),
        _ => return 0,
    };
    table[column][row]
}

pub const fn sampler(sampler: Sampler) -> i64 {
    let Sampler {
        image,
        sampled,
        dimension,
        arrayed,
        shadow,
        multisample,
    } = sampler;
    if image {
        return match (sampled, dimension) {
            (Sampled::Float, Dimension::D1) => pick(arrayed, 0x9052, 0x904C),
            (Sampled::Float, Dimension::D2) if multisample => pick(arrayed, 0x9056, 0x9055),
            (Sampled::Float, Dimension::D2) => pick(arrayed, 0x9053, 0x904D),
            (Sampled::Float, Dimension::D3) => 0x904E,
            (Sampled::Float, Dimension::Cube) => pick(arrayed, 0x9054, 0x9050),
            (Sampled::Float, Dimension::Buffer) => 0x9051,
            (Sampled::Int, Dimension::D1) => pick(arrayed, 0x905D, 0x9057),
            (Sampled::Int, Dimension::D2) if multisample => pick(arrayed, 0x9061, 0x9060),
            (Sampled::Int, Dimension::D2) => pick(arrayed, 0x905E, 0x9058),
            (Sampled::Int, Dimension::D3) => 0x9059,
            (Sampled::Int, Dimension::Cube) => pick(arrayed, 0x905F, 0x905B),
            (Sampled::Int, Dimension::Buffer) => 0x905C,
            (Sampled::Uint, Dimension::D1) => pick(arrayed, 0x9068, 0x9062),
            (Sampled::Uint, Dimension::D2) if multisample => pick(arrayed, 0x906C, 0x906B),
            (Sampled::Uint, Dimension::D2) => pick(arrayed, 0x9069, 0x9063),
            (Sampled::Uint, Dimension::D3) => 0x9064,
            (Sampled::Uint, Dimension::Cube) => pick(arrayed, 0x906A, 0x9066),
            (Sampled::Uint, Dimension::Buffer) => 0x9067,
        };
    }
    match (sampled, dimension) {
        (Sampled::Float, Dimension::D1) if shadow => pick(arrayed, 0x8DC3, 0x8B61),
        (Sampled::Float, Dimension::D1) => pick(arrayed, 0x8DC0, 0x8B5D),
        (Sampled::Float, Dimension::D2) if multisample => pick(arrayed, 0x910B, 0x9108),
        (Sampled::Float, Dimension::D2) if shadow => pick(arrayed, 0x8DC4, 0x8B62),
        (Sampled::Float, Dimension::D2) => pick(arrayed, 0x8DC1, 0x8B5E),
        (Sampled::Float, Dimension::D3) => 0x8B5F,
        (Sampled::Float, Dimension::Cube) if shadow => pick(arrayed, 0x900D, 0x8DC5),
        (Sampled::Float, Dimension::Cube) => pick(arrayed, 0x900C, 0x8B60),
        (Sampled::Float, Dimension::Buffer) => 0x8DC2,
        (Sampled::Int, Dimension::D1) => pick(arrayed, 0x8DCE, 0x8DC9),
        (Sampled::Int, Dimension::D2) if multisample => pick(arrayed, 0x910C, 0x9109),
        (Sampled::Int, Dimension::D2) => pick(arrayed, 0x8DCF, 0x8DCA),
        (Sampled::Int, Dimension::D3) => 0x8DCB,
        (Sampled::Int, Dimension::Cube) => pick(arrayed, 0x900E, 0x8DCC),
        (Sampled::Int, Dimension::Buffer) => 0x8DD0,
        (Sampled::Uint, Dimension::D1) => pick(arrayed, 0x8DD6, 0x8DD1),
        (Sampled::Uint, Dimension::D2) if multisample => pick(arrayed, 0x910D, 0x910A),
        (Sampled::Uint, Dimension::D2) => pick(arrayed, 0x8DD7, 0x8DD2),
        (Sampled::Uint, Dimension::D3) => 0x8DD3,
        (Sampled::Uint, Dimension::Cube) => pick(arrayed, 0x900F, 0x8DD4),
        (Sampled::Uint, Dimension::Buffer) => 0x8DD8,
    }
}

const fn pick(condition: bool, yes: i64, no: i64) -> i64 {
    if condition {
        yes
    } else {
        no
    }
}
