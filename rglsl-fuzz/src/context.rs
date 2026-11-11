use std::collections::BTreeSet;

use rglsl_ast::ast::TranslationUnit;
use rglsl_sema::Analysis;

use crate::basic;
use crate::build::Builder;
use crate::constants::{GL_FRAG_COORD, INJECTION_SWITCH};
use crate::fuzzer::{Fuzzer, GenerationParams, Templates};
use crate::identity::hidden_names;
use crate::opaque::OpaqueGenerator;
use crate::random::Random;
use crate::scope::Variable;

#[derive(Debug)]
pub struct Context<'a> {
    pub analysis: &'a Analysis,
    pub hidden: BTreeSet<String>,
    pub templates: Templates,
    pub params: GenerationParams,
    pub builder: Builder,
}

impl<'a> Context<'a> {
    pub fn new(unit: &TranslationUnit, analysis: &'a Analysis, params: GenerationParams) -> Self {
        let hidden = hidden_names(unit, analysis);
        let templates = Templates::new(&analysis.builtins, &hidden);
        Self {
            analysis,
            hidden,
            templates,
            params,
            builder: Builder::new(unit.next_id()),
        }
    }

    pub fn fuzzer<'b>(&'b self, scope: &'b [Variable]) -> Fuzzer<'b> {
        Fuzzer::new(&self.templates, scope, self.params)
    }

    pub fn opaque<'b>(
        &'b mut self,
        random: &'b mut Random,
        scope: &'b [Variable],
    ) -> OpaqueGenerator<'b> {
        let injection_switch = self.params.injection_switch && has_injection_switch(scope);
        let frag_coord = self.params.fragment && !scope.iter().any(|v| v.name == GL_FRAG_COORD);
        OpaqueGenerator {
            random,
            builder: &mut self.builder,
            fuzzer: Fuzzer::new(&self.templates, scope, self.params),
            builtins: &self.analysis.builtins,
            hidden: &self.hidden,
            injection_switch,
            frag_coord,
        }
    }
}

pub fn has_injection_switch(scope: &[Variable]) -> bool {
    scope
        .iter()
        .any(|variable| variable.name == INJECTION_SWITCH && variable.ty == Some(basic::VEC2))
}
