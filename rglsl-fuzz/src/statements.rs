use rglsl_ast::ast::{BasicType, JumpStatement, Statement};

use crate::basic::{self, BOOL};
use crate::build::Builder;
use crate::fuzzer::{Fuzzer, GenerationParams, Templates};
use crate::injection::flatten;
use crate::random::Random;
use crate::scope::Variable;

const MAX_BLOCK_NESTING_DEPTH: u32 = 5;
const MAX_BLOCK_STATEMENTS: u32 = 10;
const MAX_LOCALS_IN_DECLARATION_GROUP: u32 = 4;
const MAX_ARRAY_SIZE: u32 = 100;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ReturnType {
    Void,
    Basic(BasicType),
    Other,
}

#[derive(Debug)]
pub struct StatementFuzzer<'a> {
    templates: &'a Templates,
    params: GenerationParams,
    scopes: Vec<Vec<Variable>>,
    prefix: String,
    next_id: u32,
    loops: u32,
    depth: u32,
    return_type: ReturnType,
}

impl<'a> StatementFuzzer<'a> {
    pub fn new(
        templates: &'a Templates,
        params: GenerationParams,
        scope: &[Variable],
        prefix: String,
        return_type: ReturnType,
    ) -> Self {
        Self {
            templates,
            params,
            scopes: vec![scope.to_vec()],
            prefix,
            next_id: 0,
            loops: 0,
            depth: 0,
            return_type,
        }
    }

    pub fn add_variable(&mut self, variable: Variable) {
        if let Some(scope) = self.scopes.last_mut() {
            scope.retain(|existing| existing.name != variable.name);
            scope.push(variable);
        }
    }

    fn create_name(&mut self) -> String {
        let name = format!("{}_{}v", self.prefix, self.next_id);
        self.next_id += 1;
        name
    }

    fn expression(
        &self,
        random: &mut Random,
        builder: &mut Builder,
        ty: BasicType,
    ) -> Option<rglsl_ast::ast::Expression> {
        let scope = flatten(&self.scopes);
        Fuzzer::new(self.templates, &scope, self.params)
            .fuzz_expression(random, builder, ty, false, 0)
    }

    fn fuzz_type(random: &mut Random) -> BasicType {
        let all = basic::all_basic_types();
        all.get(random.next_index(all.len()))
            .copied()
            .unwrap_or(BOOL)
    }

    const fn below_depth(&self) -> bool {
        self.depth < MAX_BLOCK_NESTING_DEPTH
    }

    pub fn fuzz_statement(&mut self, random: &mut Random, builder: &mut Builder) -> Statement {
        for _ in 0..100 {
            if let Some(statement) = self.try_statement(random, builder) {
                return statement;
            }
        }
        builder.null_statement()
    }

    fn try_statement(&mut self, random: &mut Random, builder: &mut Builder) -> Option<Statement> {
        let choice = random.next_int(120);
        let in_loop = self.loops > 0;
        match choice {
            0..6 if in_loop => Some(builder.jump(JumpStatement::Continue)),
            6..10 if in_loop => Some(builder.jump(JumpStatement::Break)),
            10..15 => Some(builder.null_statement()),
            15..17 if self.params.fragment => Some(builder.jump(JumpStatement::Discard)),
            17..27 if self.below_depth() => Some(self.fuzz_block(random, builder, true)),
            27..57 => {
                let ty = Self::fuzz_type(random);
                let expression = self.expression(random, builder, ty)?;
                Some(builder.expression_statement(expression))
            }
            57..62 => self.fuzz_return(random, builder),
            62..82 => Some(self.fuzz_declaration(random, builder)),
            82..92 if self.below_depth() => self.fuzz_if(random, builder),
            92..102 if self.below_depth() => self.fuzz_for(random, builder),
            102..110 if self.below_depth() => self.fuzz_while(random, builder),
            110..112 if self.below_depth() => self.fuzz_do(random, builder),
            _ => None,
        }
    }

    fn fuzz_block(
        &mut self,
        random: &mut Random,
        builder: &mut Builder,
        scoped: bool,
    ) -> Statement {
        if scoped {
            self.scopes.push(Vec::new());
        }
        self.depth += 1;
        let count = random.next_int(MAX_BLOCK_STATEMENTS);
        let statements = (0..count)
            .map(|_| self.fuzz_statement(random, builder))
            .collect();
        self.depth -= 1;
        if scoped {
            self.scopes.pop();
        }
        builder.block(statements)
    }

    fn fuzz_return(&mut self, random: &mut Random, builder: &mut Builder) -> Option<Statement> {
        match self.return_type {
            ReturnType::Void => Some(builder.jump(JumpStatement::Return(None))),
            ReturnType::Basic(ty) => {
                let value = self.expression(random, builder, ty)?;
                Some(builder.jump(JumpStatement::Return(Some(value))))
            }
            ReturnType::Other => None,
        }
    }

    fn fuzz_declaration(&mut self, random: &mut Random, builder: &mut Builder) -> Statement {
        let ty = Self::fuzz_type(random);
        let count = random.next_positive_int(MAX_LOCALS_IN_DECLARATION_GROUP);
        let mut declarators = Vec::new();
        for _ in 0..count {
            let name = self.create_name();
            let size = (random.next_int(10) < 3).then(|| random.next_positive_int(MAX_ARRAY_SIZE));
            self.add_variable(Variable::new(&name, size.is_none().then_some(ty)));
            declarators.push((name, size, None));
        }
        let declaration =
            builder.declaration_with(crate::build::unqualified(basic::specifier(ty)), declarators);
        builder.statement(rglsl_ast::ast::StatementKind::Declaration(Box::new(
            declaration,
        )))
    }

    fn fuzz_if(&mut self, random: &mut Random, builder: &mut Builder) -> Option<Statement> {
        let condition = self.expression(random, builder, BOOL)?;
        let then_branch = self.fuzz_block(random, builder, true);
        let else_branch = random
            .next_bool()
            .then(|| self.fuzz_block(random, builder, true));
        Some(builder.if_statement(condition, then_branch, else_branch))
    }

    fn fuzz_for(&mut self, random: &mut Random, builder: &mut Builder) -> Option<Statement> {
        self.scopes.push(Vec::new());
        let result = self.fuzz_for_scoped(random, builder);
        self.scopes.pop();
        result
    }

    fn fuzz_for_scoped(&mut self, random: &mut Random, builder: &mut Builder) -> Option<Statement> {
        let init = if random.next_bool() {
            self.fuzz_declaration(random, builder)
        } else {
            let ty = Self::fuzz_type(random);
            let expression = self.expression(random, builder, ty)?;
            builder.expression_statement(expression)
        };
        let condition = self.expression(random, builder, BOOL)?;
        let ty = Self::fuzz_type(random);
        let increment = self.expression(random, builder, ty)?;
        self.loops += 1;
        let body = self.fuzz_block(random, builder, false);
        self.loops -= 1;
        Some(builder.for_statement(init, Some(condition), Some(increment), body))
    }

    fn fuzz_while(&mut self, random: &mut Random, builder: &mut Builder) -> Option<Statement> {
        let condition = self.expression(random, builder, BOOL)?;
        self.loops += 1;
        let body = self.fuzz_block(random, builder, true);
        self.loops -= 1;
        Some(builder.while_statement(condition, body))
    }

    fn fuzz_do(&mut self, random: &mut Random, builder: &mut Builder) -> Option<Statement> {
        self.loops += 1;
        let body = self.fuzz_block(random, builder, true);
        self.loops -= 1;
        let condition = self.expression(random, builder, BOOL)?;
        Some(builder.do_while(body, condition))
    }
}
