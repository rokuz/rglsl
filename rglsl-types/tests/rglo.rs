use rglsl_types::FastIndexMap;
use rglsl_types::rglo::{self, Rglo};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error + Send + Sync>>;

const STACK: usize = 256 << 10;
const DEEP: usize = 100_000;

bitflags::bitflags! {
    #[derive(Clone, Copy, Debug, Default, PartialEq, Eq, Rglo)]
    #[rglo(flags)]
    struct Access: u8 {
        const LOAD = 1;
        const STORE = 2;
    }
}

#[derive(Debug, Default, PartialEq, Rglo)]
#[rglo(transparent)]
struct Wrapper {
    value: u32,
    #[rglo(skip)]
    cache: u32,
}

#[derive(Debug, PartialEq, Rglo)]
struct Inner {
    a: u32,
    #[rglo(default, skip_if = Option::is_none)]
    b: Option<u32>,
}

#[derive(Debug, PartialEq, Rglo)]
enum Shape {
    None,
    Unit,
    Newtype(u32),
    Record(Inner),
    Tuple(u32, bool),
    Struct {
        x: i32,
        #[rglo(skip_if = Vec::is_empty)]
        items: Vec<Shape>,
    },
    Skipped(#[rglo(skip)] u32),
}

#[derive(Debug, PartialEq, Rglo)]
struct Sample {
    number: u32,
    signed: i64,
    float: f32,
    double: f64,
    flag: bool,
    text: String,
    optional: Option<u8>,
    nested: Option<Inner>,
    shapes: Vec<Shape>,
    pair: (u16, String),
    array: [Option<u32>; 3],
    map: FastIndexMap<u32, Shape>,
    #[rglo(skip)]
    skipped: u32,
    #[rglo(default)]
    defaulted: u32,
    #[rglo(skip_if = Vec::is_empty)]
    omitted: Vec<u32>,
    wrapped: Wrapper,
    access: Access,
    boxed: Box<Inner>,
    half: half::f16,
}

fn sample() -> Sample {
    let mut map = FastIndexMap::default();
    map.insert(7, Shape::Unit);
    map.insert(3, Shape::Record(Inner { a: 1, b: Some(2) }));
    Sample {
        number: 42,
        signed: -5,
        float: 1.5,
        double: 2.0,
        flag: true,
        text: String::from("a \"quoted\"\n\\ 'text' \u{301}é\u{1}"),
        optional: Some(9),
        nested: None,
        shapes: Vec::from([
            Shape::None,
            Shape::Newtype(3),
            Shape::Tuple(4, false),
            Shape::Struct {
                x: -1,
                items: Vec::from([
                    Shape::Skipped(0),
                    Shape::Struct {
                        x: 2,
                        items: Vec::new(),
                    },
                ]),
            },
        ]),
        pair: (16, String::new()),
        array: [None, Some(1), None],
        map,
        skipped: 0,
        defaulted: 5,
        omitted: Vec::new(),
        wrapped: Wrapper { value: 8, cache: 0 },
        access: Access::LOAD | Access::STORE,
        boxed: Box::new(Inner { a: 6, b: None }),
        half: half::f16::from_f32(0.5),
    }
}

const SAMPLE: &str = "(number:42,signed:-5,float:1.5,double:2.0,flag:true,\
text:\"a \\\"quoted\\\"\\n\\\\ \\'text\\' \\u{301}é\\u{1}\",optional:Some(9),nested:None,\
shapes:[r#None,Newtype(3),Tuple(4,false),Struct(x:-1,items:[Skipped,Struct(x:2)])],\
pair:(16,\"\"),array:(None,Some(1),None),map:{7:Unit,3:Record((a:1,b:Some(2)))},defaulted:5,\
wrapped:8,access:(\"LOAD | STORE\"),boxed:(a:6),half:(14336))";

#[test]
fn the_text_format_is_stable() -> TestResult {
    assert_eq!(rglo::to_string(&sample()), SAMPLE);
    assert_eq!(rglo::from_str::<Sample>(SAMPLE)?, sample());
    Ok(())
}

#[test]
fn whitespace_between_tokens_is_accepted() -> TestResult {
    let spaced = "( a : 1 ,\n\tb : Some( 2 ) , )";
    assert_eq!(rglo::from_str::<Inner>(spaced)?, Inner { a: 1, b: Some(2) });
    Ok(())
}

#[test]
fn numbers_round_trip() -> TestResult {
    let floats = [
        0.0_f32,
        -0.0,
        1.0,
        0.1,
        1.0e-40,
        3.4e38,
        1.2345678e16,
        f32::INFINITY,
        f32::NEG_INFINITY,
        f32::MIN_POSITIVE,
    ];
    for value in floats {
        let text = rglo::to_string(&value);
        assert_eq!(text, format_like_ron(value), "{value}");
        let decoded: f32 = rglo::from_str(&text)?;
        assert_eq!(decoded.to_bits(), value.to_bits(), "{text}");
    }
    for value in [f32::NAN, -f32::NAN] {
        let decoded: f32 = rglo::from_str(&rglo::to_string(&value))?;
        assert!(decoded.is_nan());
        assert_eq!(decoded.is_sign_negative(), value.is_sign_negative());
    }
    for value in [i64::MIN, -1, 0, i64::MAX] {
        assert_eq!(rglo::from_str::<i64>(&rglo::to_string(&value))?, value);
    }
    for value in [0, u64::MAX] {
        assert_eq!(rglo::from_str::<u64>(&rglo::to_string(&value))?, value);
    }
    assert_eq!(rglo::to_string(&1.0e300_f64), format!("{}.0", 1.0e300_f64));
    Ok(())
}

fn format_like_ron(value: f32) -> String {
    let mut text = format!("{value}");
    if value % 1.0 == 0.0 {
        text.push_str(".0");
    }
    text
}

#[test]
fn strings_round_trip() -> TestResult {
    for text in [
        "",
        "plain",
        "\"\\'\n\r\t\0",
        "\u{7f}\u{301}\u{200b}",
        "日本語 🎉",
    ] {
        let encoded = rglo::to_string(&String::from(text));
        assert_eq!(rglo::from_str::<String>(&encoded)?, text);
    }
    Ok(())
}

fn rejected<T: rglo::Decode + std::fmt::Debug>(text: &str, expected: &str) -> TestResult {
    match rglo::from_str::<T>(text) {
        Ok(value) => Err(format!("{text:?} decoded to {value:?}").into()),
        Err(error) => {
            let message = error.to_string();
            assert!(
                message.contains(expected),
                "{text:?}: {message:?} does not mention {expected:?}"
            );
            assert!(message.contains(" at line "), "{message:?} has no position");
            Ok(())
        }
    }
}

#[test]
fn malformed_text_is_rejected_with_a_position() -> TestResult {
    rejected::<Inner>(
        "(a:1,c:2)",
        "unknown field `c` of `Inner`, expected one of `a`, `b`",
    )?;
    rejected::<Inner>("(a:1,a:2)", "duplicate field `a` of `Inner`")?;
    rejected::<Inner>("(b:Some(2))", "missing field `a` of `Inner`")?;
    rejected::<Inner>("(a:\"1\")", "expected an integer of type `u32`, found `\"`")?;
    rejected::<Inner>("(a:4294967296)", "expected an integer of type `u32`")?;
    rejected::<Inner>("(a:1)x", "expected the end of the input, found `x`")?;
    rejected::<Inner>("(a:1", "expected `,` or `)`, found the end of the input")?;
    rejected::<Inner>("[a:1]", "expected `(`, found `[`")?;
    rejected::<Shape>("Circle", "unknown variant `Circle` of `Shape`")?;
    rejected::<Shape>("Tuple(1)", "`Shape::Tuple` expects 2 elements")?;
    rejected::<Shape>("Tuple(1,true,2)", "`Shape::Tuple` expects 2 elements")?;
    rejected::<Shape>("Newtype(1,2)", "expected `)`, found `,`")?;
    rejected::<Option<u8>>("Maybe(1)", "unknown variant `Maybe` of `Option`")?;
    rejected::<[u8; 2]>("(1,2,3)", "`array` expects 2 elements")?;
    rejected::<Access>("(\"LOAD | WRITE\")", "invalid flags of `Access`")?;
    rejected::<String>("\"open", "expected the end of a string")?;
    rejected::<String>("\"\\q\"", "expected an escape sequence")?;
    rejected::<FastIndexMap<u32, u32>>("{1:2,1:3}", "duplicate key in a map")?;
    rejected::<Wrapper>("\"8\"", "expected an integer of type `u32`")?;
    rejected::<bool>("yes", "expected `true` or `false`")?;
    Ok(())
}

#[test]
fn every_truncation_is_rejected() -> TestResult {
    for end in 0..SAMPLE.len() {
        let Some(prefix) = SAMPLE.get(..end) else {
            continue;
        };
        assert!(
            rglo::from_str::<Sample>(prefix).is_err(),
            "the prefix of {end} bytes decoded"
        );
    }
    Ok(())
}

fn on_small_stack<T: Send + 'static>(run: impl FnOnce() -> T + Send + 'static) -> TestResult<T> {
    std::thread::Builder::new()
        .stack_size(STACK)
        .spawn(run)?
        .join()
        .map_err(|_| "the thread on the small stack panicked".into())
}

#[test]
fn deep_hostile_nesting_is_rejected_on_a_small_stack() -> TestResult {
    let positions = [
        ("(", "("),
        ("(number:", "("),
        ("(number:", "["),
        ("(shapes:", "["),
        ("(shapes:[", "Struct(items:["),
        ("(shapes:[", "Struct(x:1,items:["),
        ("(optional:", "Some("),
        ("(map:", "{"),
        ("(map:{", "("),
        ("(pair:", "("),
        ("(array:", "("),
        ("(boxed:", "("),
        ("(unknown:", "("),
    ];
    for (prefix, open) in positions {
        let hostile = format!("{prefix}{}", open.repeat(DEEP));
        let decoded = on_small_stack(move || rglo::from_str::<Sample>(&hostile).map(drop))?;
        assert!(decoded.is_err(), "{prefix}{open}...");
    }
    Ok(())
}

#[test]
fn deep_valid_nesting_round_trips_on_a_small_stack() -> TestResult {
    let mut shape = Shape::Unit;
    for x in 0..DEEP {
        shape = Shape::Struct {
            x: i32::try_from(x % 1000)?,
            items: Vec::from([shape]),
        };
    }
    let text = on_small_stack(move || {
        let text = rglo::to_string(&shape);
        let mut pending = Vec::from([shape]);
        while let Some(shape) = pending.pop() {
            if let Shape::Struct { items, .. } = shape {
                pending.extend(items);
            }
        }
        text
    })?;
    let decoded = on_small_stack(move || {
        rglo::from_str::<Shape>(&text).map(|shape| {
            let again = rglo::to_string(&shape);
            let mut pending = Vec::from([shape]);
            while let Some(shape) = pending.pop() {
                if let Shape::Struct { items, .. } = shape {
                    pending.extend(items);
                }
            }
            again == text
        })
    })??;
    assert!(decoded);
    Ok(())
}
