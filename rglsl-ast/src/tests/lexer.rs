use crate::lexer::punctuator_at;

const PUNCTUATORS: [&str; 45] = [
    "<<=", ">>=", "++", "--", "<=", ">=", "==", "!=", "&&", "||", "^^", "+=", "-=", "*=", "/=",
    "%=", "&=", "|=", "^=", "<<", ">>", "(", ")", "[", "]", "{", "}", ".", ",", ":", ";", "=", "!",
    "-", "~", "+", "*", "/", "%", "<", ">", "|", "^", "&", "?",
];

fn longest_listed(text: &[u8]) -> Option<&'static str> {
    PUNCTUATORS
        .into_iter()
        .filter(|punctuator| text.starts_with(punctuator.as_bytes()))
        .max_by_key(|punctuator| punctuator.len())
}

#[test]
fn punctuators_are_matched_longest_first() {
    let alphabet = b"<>=!+-*/%&|^~()[]{}.,:;?#a 0";
    for &first in alphabet {
        for &second in alphabet {
            for &third in alphabet {
                let text = [first, second, third];
                for length in 0..=text.len() {
                    let prefix = text.get(..length).unwrap_or_default();
                    assert_eq!(
                        punctuator_at(prefix),
                        longest_listed(prefix),
                        "{:?}",
                        core::str::from_utf8(prefix)
                    );
                }
            }
        }
    }
}
