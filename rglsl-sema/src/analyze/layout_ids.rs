use alloc::string::String;

use rglsl_ast::Span;
use rglsl_types::ShaderStageMask;

use super::Analyzer;
use crate::diagnostic::DiagnosticKind;
use crate::layout_id::LayoutId;
use crate::scope::{LayoutEntry, LayoutValue, Qualifiers};

fn flag_stages_of(id: Option<LayoutId>, name: &str) -> Option<ShaderStageMask> {
    id.and_then(|id| id.info().kind.flag_stages()).or_else(|| {
        name.starts_with("blend_support")
            .then_some(ShaderStageMask::FRAGMENT)
    })
}

pub fn layout_stages(name: &str) -> Option<ShaderStageMask> {
    let id = LayoutId::from_name(name);
    flag_stages_of(id, name)
        .or_else(|| id.and_then(|id| id.info().kind.value_stages()))
        .filter(|stages| !stages.is_all())
}

fn is_local_size_axis(name: &str) -> bool {
    name.len() == "local_size_x".len() && name.starts_with("local_size_")
}

impl Analyzer<'_> {
    pub(crate) fn layout_identifiers(&mut self, qualifiers: &Qualifiers) {
        for entry in &qualifiers.layout {
            self.layout_identifier(entry);
        }
    }

    fn layout_identifier(&mut self, entry: &LayoutEntry) {
        let name = entry.name.as_str();
        match entry.value {
            LayoutValue::Flag => {
                let stages = flag_stages_of(entry.id, name);
                self.stage_check(entry.span, |stage| {
                    (!stages.is_some_and(|stages| stages.has(stage)))
                        .then(|| DiagnosticKind::UnrecognizedLayout(String::from(name)))
                });
            }
            LayoutValue::Constant(value) if value < 0 => {}
            LayoutValue::Constant(_) | LayoutValue::Invalid => {
                let stages = entry.id.and_then(|id| id.info().kind.value_stages());
                let zero_local_size = is_local_size_axis(name) && entry.value.constant() == Some(0);
                self.stage_check(entry.span, |stage| {
                    if stages.is_some_and(|stages| stages.has(stage)) {
                        None
                    } else if zero_local_size && ShaderStageMask::COMPUTE_LIKE.has(stage) {
                        Some(DiagnosticKind::LayoutValueBelowOne(String::from(name)))
                    } else {
                        Some(DiagnosticKind::UnknownLayoutWithValue(String::from(name)))
                    }
                });
            }
        }
    }

    pub(crate) fn literal_layout_value(&mut self, id: Option<LayoutId>, span: Span) {
        let Some(id) = id.filter(|id| !id.info().takes_any_value) else {
            return;
        };
        let Some(stages) = id.info().kind.value_stages() else {
            return;
        };
        self.stage_check(span, |stage| {
            stages
                .has(stage)
                .then(|| DiagnosticKind::LayoutValueNotLiteral(String::from(id.literal_name())))
        });
    }
}
