use std::collections::{BTreeMap, BTreeSet};

use rglsl_ast::ast::{
    CaseLabel, Condition, DeclarationKind, Expression, ExpressionKind, ExternalDeclaration,
    FunctionIdentifier, Initializer, JumpStatement, NodeId, Statement, StatementKind,
    TranslationUnit, TypeSpecifierNonArray, UnaryOperator,
};
use rglsl_sema::Analysis;

use crate::basic;
use crate::build::Builder;
use crate::constants::{
    GLF_DEAD, GLF_FALSE, GLF_IDENTITY, GLF_ONE, GLF_OUT_VAR_BACKUP_PREFIX, GLF_STRUCT_REPLACEMENT,
    GLF_SWITCH, GLF_TRUE, GLF_WRAPPED_IF_FALSE, GLF_WRAPPED_IF_TRUE, GLF_WRAPPED_LOOP, GLF_ZERO,
    LIVE_PREFIX, OUTLINED_FUNCTION_PREFIX, SPLIT_LOOP_COUNTER_PREFIX,
    STRUCTIFICATION_STRUCT_PREFIX,
};
use crate::fuzzer::literal_zero_or_one;
use crate::macros::macro_name;
use crate::reduce::change::{Change, Opportunity};
use crate::rewrite::{
    function_statements, rewrite_statement_expressions, statement_expression_ids,
};
use crate::scope::output_parameters;
use crate::strip::strip_unused_generated;
use crate::structs::global_structs;
use crate::vectorize::{component_data, MERGED_PREFIX};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Pass {
    RemoveDead,
    RemoveLive,
    Unwrap,
    Unswitchify,
    Identity,
    InlineOutlined,
    MergeLoops,
    Destructify,
    Devectorize,
    Flatten,
    StripUnused,
    RemoveStatement,
    RemoveExternal,
    CompoundToBody,
    ExpressionToConstant,
    ExpressionToOperand,
}

impl Pass {
    pub const PRESERVING: [Self; 11] = [
        Self::RemoveDead,
        Self::RemoveLive,
        Self::Unswitchify,
        Self::Unwrap,
        Self::Identity,
        Self::InlineOutlined,
        Self::MergeLoops,
        Self::Destructify,
        Self::Devectorize,
        Self::Flatten,
        Self::StripUnused,
    ];

    pub const EVERYWHERE: [Self; 5] = [
        Self::RemoveExternal,
        Self::RemoveStatement,
        Self::CompoundToBody,
        Self::ExpressionToOperand,
        Self::ExpressionToConstant,
    ];

    pub const fn name(self) -> &'static str {
        match self {
            Self::RemoveDead => "remove_dead",
            Self::RemoveLive => "remove_live",
            Self::Unwrap => "unwrap",
            Self::Unswitchify => "unswitchify",
            Self::Identity => "identity",
            Self::InlineOutlined => "inline_outlined",
            Self::MergeLoops => "merge_loops",
            Self::Destructify => "destructify",
            Self::Devectorize => "devectorize",
            Self::Flatten => "flatten",
            Self::StripUnused => "strip_unused",
            Self::RemoveStatement => "remove_statement",
            Self::RemoveExternal => "remove_external",
            Self::CompoundToBody => "compound_to_body",
            Self::ExpressionToConstant => "expression_to_constant",
            Self::ExpressionToOperand => "expression_to_operand",
        }
    }
}

pub fn find(pass: Pass, unit: &TranslationUnit, analysis: &Analysis) -> Vec<Opportunity> {
    let mut builder = Builder::new(unit.next_id());
    match pass {
        Pass::RemoveDead => remove_dead(unit),
        Pass::RemoveLive => remove_live(unit),
        Pass::Unwrap => unwrap(unit, &mut builder),
        Pass::Unswitchify => unswitchify(unit, &mut builder),
        Pass::Identity => identity(unit, &mut builder),
        Pass::InlineOutlined => inline_outlined(unit, &mut builder),
        Pass::MergeLoops => merge_loops(unit),
        Pass::Destructify => destructify(unit, &mut builder),
        Pass::Devectorize => devectorize(unit, &mut builder),
        Pass::Flatten => flatten(unit, &mut builder),
        Pass::StripUnused => strip_unused_generated(unit)
            .map(|stripped| {
                vec![Opportunity {
                    changes: stripped
                        .into_iter()
                        .map(|index| Change::External(index, None))
                        .collect(),
                }]
            })
            .unwrap_or_default(),
        Pass::RemoveStatement => remove_statement(unit),
        Pass::RemoveExternal => remove_external(unit),
        Pass::CompoundToBody => compound_to_body(unit, &mut builder),
        Pass::ExpressionToConstant => expression_to_constant(unit, analysis, &mut builder),
        Pass::ExpressionToOperand => expression_to_operand(unit, analysis, &mut builder),
    }
}

fn call_name(expression: &Expression) -> Option<&str> {
    let ExpressionKind::FunctionCall(call) = &expression.kind else {
        return None;
    };
    match &call.function.node {
        FunctionIdentifier::Function(name) => Some(name.as_str()),
        _ => None,
    }
}

fn strip_parentheses(expression: &Expression) -> &Expression {
    match &expression.kind {
        ExpressionKind::Parenthesized(inner) => strip_parentheses(inner),
        _ => expression,
    }
}

fn is_call_to(expression: &Expression, name: &str) -> bool {
    call_name(strip_parentheses(expression)) == Some(name)
}

fn block_of(statement: &Statement, builder: &mut Builder) -> Statement {
    match &statement.kind {
        StatementKind::Compound(_) => statement.clone(),
        _ => builder.block(vec![statement.clone()]),
    }
}

fn remove_dead(unit: &TranslationUnit) -> Vec<Opportunity> {
    function_statements(unit)
        .into_iter()
        .filter_map(|(_, statement)| match &statement.kind {
            StatementKind::Selection {
                condition,
                else_branch: None,
                ..
            } if is_call_to(condition, GLF_DEAD) => {
                Some(Opportunity::single(Change::Statement(statement.id, None)))
            }
            _ => None,
        })
        .collect()
}

fn declares_name(statement: &Statement, predicate: &dyn Fn(&str) -> bool) -> bool {
    let StatementKind::Declaration(declaration) = &statement.kind else {
        return false;
    };
    let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
        return false;
    };
    !list.declarators.is_empty()
        && list
            .declarators
            .iter()
            .all(|declarator| predicate(&declarator.name.node))
}

fn root_name(expression: &Expression) -> Option<&str> {
    match &expression.kind {
        ExpressionKind::Variable(name) => Some(name),
        ExpressionKind::Parenthesized(inner)
        | ExpressionKind::Subscript { base: inner, .. }
        | ExpressionKind::FieldSelection { base: inner, .. } => root_name(inner),
        _ => None,
    }
}

fn locally_declared(statement: &Statement) -> BTreeSet<String> {
    let mut names = BTreeSet::new();
    crate::rewrite::visit_statements(statement, &mut |inner| {
        if let StatementKind::Declaration(declaration) = &inner.kind {
            names.extend(crate::injection::declared_names(declaration));
        }
        if let StatementKind::For(for_statement) = &inner.kind {
            if let Some(Condition::Declaration(declaration)) = &for_statement.condition {
                names.insert(declaration.name.node.clone());
            }
        }
    });
    names
}

fn side_effect_free_live_block(statement: &Statement) -> bool {
    let StatementKind::Compound(compound) = &statement.kind else {
        return false;
    };
    if compound.statements.first().is_some_and(|first| {
        declares_name(first, &|name| name.starts_with(GLF_OUT_VAR_BACKUP_PREFIX))
    }) {
        return true;
    }
    let local = locally_declared(statement);
    let mut mentions_live = false;
    let mut safe = true;
    let mut jumps = crate::injection::contains_top_level_break(statement)
        || crate::injection::contains_top_level_continue(statement);
    crate::rewrite::visit_statements(statement, &mut |inner| {
        if let StatementKind::Jump(jump) = &inner.kind {
            if !matches!(jump, JumpStatement::Break | JumpStatement::Continue) {
                jumps = true;
            }
        }
    });
    let mut probe = statement.clone();
    let allowed = |name: &str| local.contains(name) || name.starts_with(LIVE_PREFIX);
    rewrite_statement_expressions(&mut probe, &mut |expression| match &expression.kind {
        ExpressionKind::Variable(name) => mentions_live |= name.starts_with(LIVE_PREFIX),
        ExpressionKind::Assignment { target, .. } => {
            safe &= root_name(target).is_some_and(allowed);
        }
        ExpressionKind::Postfix { operand, .. }
        | ExpressionKind::Unary {
            operator: UnaryOperator::Increment | UnaryOperator::Decrement,
            operand,
        } => safe &= root_name(operand).is_some_and(allowed),
        ExpressionKind::FunctionCall(call) => match &call.function.node {
            FunctionIdentifier::Function(name) => {
                if name.starts_with(LIVE_PREFIX) {
                    mentions_live = true;
                } else if crate::macros::is_macro(name)
                    || name.starts_with(OUTLINED_FUNCTION_PREFIX)
                {
                } else {
                    safe &= !matches!(
                        name.as_str(),
                        "barrier" | "memoryBarrier" | "imageStore" | "EmitVertex" | "EndPrimitive"
                    ) && !name.starts_with("atomic")
                        && !name.starts_with("image");
                }
            }
            FunctionIdentifier::Constructor(_) => {}
            FunctionIdentifier::Expression(_) | FunctionIdentifier::Method { .. } => safe = false,
        },
        _ => {}
    });
    mentions_live && safe && !jumps
}

fn remove_live(unit: &TranslationUnit) -> Vec<Opportunity> {
    function_statements(unit)
        .into_iter()
        .filter(|(_, statement)| side_effect_free_live_block(statement))
        .map(|(_, statement)| Opportunity::single(Change::Statement(statement.id, None)))
        .collect()
}

fn unwrap(unit: &TranslationUnit, builder: &mut Builder) -> Vec<Opportunity> {
    let mut result = Vec::new();
    for (_, statement) in function_statements(unit) {
        let replacement = match &statement.kind {
            StatementKind::Selection {
                condition,
                then_branch,
                else_branch,
            } => {
                if is_call_to(condition, GLF_WRAPPED_IF_TRUE) {
                    Some(block_of(then_branch, builder))
                } else if is_call_to(condition, GLF_WRAPPED_IF_FALSE) {
                    else_branch
                        .as_deref()
                        .map(|branch| block_of(branch, builder))
                } else {
                    None
                }
            }
            StatementKind::For(for_statement) => match &for_statement.condition {
                Some(Condition::Expression(condition))
                    if is_call_to(condition, GLF_WRAPPED_LOOP) =>
                {
                    Some(block_of(&for_statement.body, builder))
                }
                _ => None,
            },
            StatementKind::DoWhile { body, condition }
                if is_call_to(condition, GLF_WRAPPED_LOOP) =>
            {
                Some(block_of(body, builder))
            }
            _ => None,
        };
        if let Some(replacement) = replacement {
            result.push(Opportunity::single(Change::Statement(
                statement.id,
                Some(replacement),
            )));
        }
    }
    result
}

fn unswitchify(unit: &TranslationUnit, builder: &mut Builder) -> Vec<Opportunity> {
    let mut result = Vec::new();
    for (_, statement) in function_statements(unit) {
        let StatementKind::Switch {
            selector,
            statements,
        } = &statement.kind
        else {
            continue;
        };
        if !is_call_to(selector, GLF_SWITCH) {
            continue;
        }
        let start = statements.iter().position(|inner| match &inner.kind {
            StatementKind::CaseLabel(CaseLabel::Case(value)) => {
                matches!(&strip_parentheses(value).kind, ExpressionKind::Number(literal) if literal.digits() == "0")
            }
            _ => false,
        });
        let Some(start) = start else {
            continue;
        };
        let mut reachable = Vec::new();
        for inner in statements.iter().skip(start + 1) {
            match &inner.kind {
                StatementKind::CaseLabel(_) => {}
                StatementKind::Jump(JumpStatement::Break) => break,
                _ => reachable.push(inner.clone()),
            }
        }
        let replacement = builder.block(reachable);
        result.push(Opportunity::single(Change::Statement(
            statement.id,
            Some(replacement),
        )));
    }
    result
}

fn identity(unit: &TranslationUnit, builder: &mut Builder) -> Vec<Opportunity> {
    let mut result = Vec::new();
    for expression in rglsl_ast::expressions(unit) {
        let Some(name) = macro_name(expression) else {
            continue;
        };
        if ![GLF_IDENTITY, GLF_ZERO, GLF_ONE, GLF_TRUE, GLF_FALSE].contains(&name) {
            continue;
        }
        let ExpressionKind::FunctionCall(call) = &expression.kind else {
            continue;
        };
        let Some(original) = call.arguments.first() else {
            continue;
        };
        let replacement = builder.paren(original.clone());
        result.push(Opportunity::single(Change::Expression(
            expression.id,
            replacement,
        )));
    }
    result
}

fn outlined_functions(unit: &TranslationUnit) -> BTreeMap<String, (Vec<String>, Expression)> {
    let mut functions = BTreeMap::new();
    for external in &unit.external_declarations {
        let ExternalDeclaration::FunctionDefinition(definition) = external else {
            continue;
        };
        let name = &definition.prototype.name.node;
        if !name.starts_with(OUTLINED_FUNCTION_PREFIX) {
            continue;
        }
        let [statement] = definition.body.statements.as_slice() else {
            continue;
        };
        let StatementKind::Jump(JumpStatement::Return(Some(value))) = &statement.kind else {
            continue;
        };
        let parameters: Option<Vec<String>> = definition
            .prototype
            .parameters
            .iter()
            .map(|parameter| parameter.name.as_ref().map(|name| name.node.clone()))
            .collect();
        if let Some(parameters) = parameters {
            functions.insert(name.clone(), (parameters, value.clone()));
        }
    }
    functions
}

fn inline_outlined(unit: &TranslationUnit, builder: &mut Builder) -> Vec<Opportunity> {
    let functions = outlined_functions(unit);
    let mut result = Vec::new();
    for expression in rglsl_ast::expressions(unit) {
        let Some(name) = call_name(expression) else {
            continue;
        };
        let Some((parameters, body)) = functions.get(name) else {
            continue;
        };
        let ExpressionKind::FunctionCall(call) = &expression.kind else {
            continue;
        };
        if call.arguments.len() != parameters.len() {
            continue;
        }
        let substitution: BTreeMap<&str, &Expression> = parameters
            .iter()
            .map(String::as_str)
            .zip(call.arguments.iter())
            .collect();
        let mut holder = builder.expression_statement(body.clone());
        rewrite_statement_expressions(&mut holder, &mut |inner| {
            if let ExpressionKind::Variable(variable) = &inner.kind {
                if let Some(argument) = substitution.get(variable.as_str()) {
                    *inner = (*argument).clone();
                }
            }
        });
        let StatementKind::Expression(Some(inlined)) = holder.kind else {
            continue;
        };
        let replacement = builder.paren(inlined);
        result.push(Opportunity::single(Change::Expression(
            expression.id,
            replacement,
        )));
    }
    result
}

fn split_counter(statement: &Statement) -> Option<(String, String)> {
    let StatementKind::For(for_statement) = &statement.kind else {
        return None;
    };
    let StatementKind::Declaration(declaration) = &for_statement.init.kind else {
        return None;
    };
    let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
        return None;
    };
    let [declarator] = list.declarators.as_slice() else {
        return None;
    };
    let name = &declarator.name.node;
    let original = name.strip_prefix(SPLIT_LOOP_COUNTER_PREFIX)?;
    Some((name.clone(), original.to_owned()))
}

fn merge_loops(unit: &TranslationUnit) -> Vec<Opportunity> {
    let mut result = Vec::new();
    for (_, statement) in function_statements(unit) {
        let StatementKind::Compound(compound) = &statement.kind else {
            continue;
        };
        for pair in compound.statements.windows(2) {
            let [first, second] = pair else {
                continue;
            };
            let (Some((first_name, original)), Some((second_name, _))) =
                (split_counter(first), split_counter(second))
            else {
                continue;
            };
            if first_name != second_name {
                continue;
            }
            let mut merged = second.clone();
            let StatementKind::For(first_for) = &first.kind else {
                continue;
            };
            let initial = match &first_for.init.kind {
                StatementKind::Declaration(declaration) => match &declaration.kind {
                    DeclarationKind::InitDeclaratorList(list) => list
                        .declarators
                        .first()
                        .and_then(|declarator| declarator.initializer.clone()),
                    _ => None,
                },
                _ => None,
            };
            if let StatementKind::For(merged_for) = &mut merged.kind {
                if let StatementKind::Declaration(declaration) = &mut merged_for.init.kind {
                    if let DeclarationKind::InitDeclaratorList(list) = &mut declaration.kind {
                        for declarator in &mut list.declarators {
                            declarator.initializer.clone_from(&initial);
                            original.clone_into(&mut declarator.name.node);
                        }
                    }
                }
            }
            rewrite_statement_expressions(&mut merged, &mut |expression| {
                if let ExpressionKind::Variable(name) = &mut expression.kind {
                    if *name == first_name {
                        original.clone_into(name);
                    }
                }
            });
            result.push(Opportunity {
                changes: vec![
                    Change::Statement(first.id, None),
                    Change::Statement(second.id, Some(merged)),
                ],
            });
        }
    }
    result
}

fn field_path(
    structs: &crate::structs::Structs,
    name: &str,
    path: &mut Vec<usize>,
    depth: u32,
) -> Option<(String, rglsl_ast::ast::TypeSpecifier)> {
    if depth > 8 {
        return None;
    }
    let fields = structs.get(name)?;
    for (index, field) in fields.iter().enumerate() {
        match &field.ty.non_array {
            TypeSpecifierNonArray::TypeName(inner)
                if inner.starts_with(STRUCTIFICATION_STRUCT_PREFIX) =>
            {
                path.push(index);
                if let Some(found) = field_path(structs, inner, path, depth + 1) {
                    return Some(found);
                }
                path.pop();
            }
            _ => {
                if !field
                    .name
                    .starts_with(crate::constants::STRUCTIFICATION_FIELD_PREFIX)
                {
                    path.push(index);
                    return Some((field.name.clone(), field.ty.clone()));
                }
            }
        }
    }
    None
}

fn constructor_argument(expression: &Expression, path: &[usize]) -> Option<Expression> {
    let Some((first, rest)) = path.split_first() else {
        return Some(expression.clone());
    };
    let ExpressionKind::FunctionCall(call) = &strip_parentheses(expression).kind else {
        return None;
    };
    if !matches!(call.function.node, FunctionIdentifier::Constructor(_)) {
        return None;
    }
    constructor_argument(call.arguments.get(*first)?, rest)
}

fn field_names(
    structs: &crate::structs::Structs,
    top: &str,
    path: &[usize],
) -> Option<Vec<String>> {
    let mut names = Vec::new();
    let mut current = top.to_owned();
    for index in path {
        let field = structs.get(&current)?.get(*index)?;
        names.push(field.name.clone());
        if let TypeSpecifierNonArray::TypeName(inner) = &field.ty.non_array {
            current.clone_from(inner);
        }
    }
    Some(names)
}

fn chain_matches(expression: &Expression, variable: &str, names: &[String]) -> bool {
    let Some((last, rest)) = names.split_last() else {
        return matches!(&expression.kind, ExpressionKind::Variable(name) if name == variable);
    };
    match &expression.kind {
        ExpressionKind::FieldSelection { base, field } => {
            field.node == *last && chain_matches(strip_parentheses(base), variable, rest)
        }
        _ => false,
    }
}

fn destructify(unit: &TranslationUnit, builder: &mut Builder) -> Vec<Opportunity> {
    let structs = global_structs(unit);
    let mut result = Vec::new();
    for (_, statement) in function_statements(unit) {
        let StatementKind::Declaration(declaration) = &statement.kind else {
            continue;
        };
        let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
            continue;
        };
        let [declarator] = list.declarators.as_slice() else {
            continue;
        };
        let variable = &declarator.name.node;
        if !variable.starts_with(GLF_STRUCT_REPLACEMENT) {
            continue;
        }
        let TypeSpecifierNonArray::TypeName(top) = &list.ty.specifier.non_array else {
            continue;
        };
        let mut path = Vec::new();
        let Some((original, ty)) = field_path(&structs, top, &mut path, 0) else {
            continue;
        };
        let Some(names) = field_names(&structs, top, &path) else {
            continue;
        };
        let initializer = match declarator.initializer.as_ref().map(|i| &i.node) {
            Some(Initializer::Expression(expression)) => constructor_argument(expression, &path),
            _ => None,
        };
        let replacement = builder.declare(ty, &original, initializer);
        let mut changes = vec![Change::Statement(statement.id, Some(replacement))];
        for expression in rglsl_ast::expressions(unit) {
            if chain_matches(expression, variable, &names) {
                let new = builder.variable(&original);
                changes.push(Change::Expression(expression.id, new));
            }
        }
        result.push(Opportunity { changes });
    }
    result
}

fn devectorize(unit: &TranslationUnit, builder: &mut Builder) -> Vec<Opportunity> {
    let mut result = Vec::new();
    let mut merged_names = BTreeSet::new();
    for (_, statement) in function_statements(unit) {
        if let StatementKind::Declaration(declaration) = &statement.kind {
            for name in crate::injection::declared_names(declaration) {
                if name.starts_with(MERGED_PREFIX) {
                    merged_names.insert(name);
                }
            }
        }
    }
    let expressions = rglsl_ast::expressions(unit);
    for merged in &merged_names {
        let Some(components) = component_data(merged) else {
            continue;
        };
        for component in components {
            let swizzle: String = (component.offset..component.offset + component.width)
                .filter_map(|index| ['x', 'y', 'z', 'w'].get(usize::try_from(index).unwrap_or(4)))
                .collect();
            let mut changes = Vec::new();
            for (_, statement) in function_statements(unit) {
                let StatementKind::Expression(Some(expression)) = &statement.kind else {
                    continue;
                };
                let ExpressionKind::Assignment { target, value, .. } = &expression.kind else {
                    continue;
                };
                let copies = matches!(&value.kind, ExpressionKind::Variable(name) if *name == component.name)
                    && is_access(target, merged, &swizzle);
                if copies {
                    changes.push(Change::Statement(statement.id, None));
                }
            }
            for expression in &expressions {
                if is_access(expression, merged, &swizzle) {
                    let variable = builder.variable(&component.name);
                    changes.push(Change::Expression(expression.id, variable));
                }
            }
            if !changes.is_empty() {
                result.push(Opportunity { changes });
            }
        }
    }
    for (_, statement) in function_statements(unit) {
        let StatementKind::Declaration(declaration) = &statement.kind else {
            continue;
        };
        let names = crate::injection::declared_names(declaration);
        let [name] = names.as_slice() else {
            continue;
        };
        if !name.starts_with(MERGED_PREFIX) {
            continue;
        }
        let used = expressions
            .iter()
            .any(|expression| matches!(&expression.kind, ExpressionKind::Variable(variable) if variable == name));
        if !used {
            result.push(Opportunity::single(Change::Statement(statement.id, None)));
        }
    }
    result
}

fn is_access(expression: &Expression, merged: &str, swizzle: &str) -> bool {
    match &expression.kind {
        ExpressionKind::FieldSelection { base, field } => {
            field.node == swizzle
                && matches!(&strip_parentheses(base).kind, ExpressionKind::Variable(name) if name == merged)
        }
        _ => false,
    }
}

fn flatten(unit: &TranslationUnit, builder: &mut Builder) -> Vec<Opportunity> {
    let mut result = Vec::new();
    for (_, statement) in function_statements(unit) {
        let StatementKind::Compound(compound) = &statement.kind else {
            continue;
        };
        let declares = compound.statements.iter().any(|inner| {
            matches!(
                inner.kind,
                StatementKind::Declaration(_) | StatementKind::CaseLabel(_)
            )
        });
        if declares {
            continue;
        }
        let marker = splice_marker(builder.block(compound.statements.clone()));
        result.push(Opportunity::single(Change::Statement(
            statement.id,
            Some(marker),
        )));
    }
    result
}

fn splice_marker(block: Statement) -> Statement {
    let mut block = block;
    block.span = rglsl_ast::Span::new(u32::MAX, u32::MAX);
    block
}

pub fn is_splice(statement: &Statement) -> bool {
    statement.span == rglsl_ast::Span::new(u32::MAX, u32::MAX)
        && matches!(statement.kind, StatementKind::Compound(_))
}

fn remove_statement(unit: &TranslationUnit) -> Vec<Opportunity> {
    function_statements(unit)
        .into_iter()
        .filter(|(_, statement)| !matches!(statement.kind, StatementKind::Expression(None)))
        .map(|(_, statement)| Opportunity::single(Change::Statement(statement.id, None)))
        .collect()
}

fn remove_external(unit: &TranslationUnit) -> Vec<Opportunity> {
    unit.external_declarations
        .iter()
        .enumerate()
        .filter(|(_, external)| match external {
            ExternalDeclaration::FunctionDefinition(definition) => {
                definition.prototype.name.node != "main"
            }
            ExternalDeclaration::Declaration(declaration) => {
                !matches!(declaration.kind, DeclarationKind::Precision { .. })
            }
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => false,
        })
        .map(|(index, _)| Opportunity::single(Change::External(index, None)))
        .collect()
}

fn compound_to_body(unit: &TranslationUnit, builder: &mut Builder) -> Vec<Opportunity> {
    let mut result = Vec::new();
    for (_, statement) in function_statements(unit) {
        let replacements: Vec<Statement> = match &statement.kind {
            StatementKind::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                let mut options = vec![block_of(then_branch, builder)];
                if let Some(else_branch) = else_branch {
                    options.push(block_of(else_branch, builder));
                }
                options
            }
            StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
                vec![block_of(body, builder)]
            }
            StatementKind::For(for_statement) => {
                let body = block_of(&for_statement.body, builder);
                vec![builder.block(vec![for_statement.init.clone(), body])]
            }
            StatementKind::Switch { statements, .. } => {
                let kept = statements
                    .iter()
                    .filter(|inner| {
                        !matches!(
                            inner.kind,
                            StatementKind::CaseLabel(_) | StatementKind::Jump(JumpStatement::Break)
                        )
                    })
                    .cloned()
                    .collect();
                vec![builder.block(kept)]
            }
            _ => Vec::new(),
        };
        for replacement in replacements {
            result.push(Opportunity::single(Change::Statement(
                statement.id,
                Some(replacement),
            )));
        }
    }
    result
}

fn lvalue_ids(unit: &TranslationUnit, analysis: &Analysis) -> BTreeSet<NodeId> {
    fn mark(expression: &Expression, ids: &mut BTreeSet<NodeId>) {
        ids.insert(expression.id);
        match &expression.kind {
            ExpressionKind::Parenthesized(inner)
            | ExpressionKind::FieldSelection { base: inner, .. } => mark(inner, ids),
            ExpressionKind::Subscript { base, .. } => mark(base, ids),
            _ => {}
        }
    }
    let mut ids = BTreeSet::new();
    for expression in rglsl_ast::expressions(unit) {
        match &expression.kind {
            ExpressionKind::Assignment { target, .. } => mark(target, &mut ids),
            ExpressionKind::Postfix { operand, .. }
            | ExpressionKind::Unary {
                operator: UnaryOperator::Increment | UnaryOperator::Decrement,
                operand,
            } => mark(operand, &mut ids),
            ExpressionKind::FunctionCall(call) => {
                let outputs = output_parameters(analysis, expression.id, call.arguments.len());
                for (argument, output) in call.arguments.iter().zip(outputs) {
                    if output {
                        mark(argument, &mut ids);
                    }
                }
                if let FunctionIdentifier::Method { object, .. } = &call.function.node {
                    mark(object, &mut ids);
                }
            }
            _ => {}
        }
    }
    ids
}

fn body_expression_ids(unit: &TranslationUnit) -> BTreeSet<NodeId> {
    let mut ids = BTreeSet::new();
    for external in &unit.external_declarations {
        if let ExternalDeclaration::FunctionDefinition(definition) = external {
            for statement in &definition.body.statements {
                ids.extend(statement_expression_ids(statement));
            }
        }
    }
    ids
}

fn expression_to_constant(
    unit: &TranslationUnit,
    analysis: &Analysis,
    builder: &mut Builder,
) -> Vec<Opportunity> {
    let lvalues = lvalue_ids(unit, analysis);
    let bodies = body_expression_ids(unit);
    let mut result = Vec::new();
    for expression in rglsl_ast::expressions(unit) {
        if lvalues.contains(&expression.id) || !bodies.contains(&expression.id) {
            continue;
        }
        if matches!(
            expression.kind,
            ExpressionKind::Number(_) | ExpressionKind::Bool(_)
        ) {
            continue;
        }
        let Some(ty) = analysis.type_of(expression.id).and_then(basic::from_sema) else {
            continue;
        };
        let constant = literal_zero_or_one(builder, false, ty);
        if constant == *expression {
            continue;
        }
        result.push(Opportunity::single(Change::Expression(
            expression.id,
            constant,
        )));
    }
    result
}

fn expression_to_operand(
    unit: &TranslationUnit,
    analysis: &Analysis,
    builder: &mut Builder,
) -> Vec<Opportunity> {
    let lvalues = lvalue_ids(unit, analysis);
    let bodies = body_expression_ids(unit);
    let mut result = Vec::new();
    for expression in rglsl_ast::expressions(unit) {
        if lvalues.contains(&expression.id) || !bodies.contains(&expression.id) {
            continue;
        }
        let Some(ty) = analysis.type_of(expression.id) else {
            continue;
        };
        let operands: Vec<&Expression> = match &expression.kind {
            ExpressionKind::Parenthesized(inner) => vec![inner],
            ExpressionKind::Unary { operand, .. } => vec![operand],
            ExpressionKind::Binary { left, right, .. } => vec![left, right],
            ExpressionKind::Conditional {
                then_expression,
                else_expression,
                ..
            } => vec![then_expression, else_expression],
            ExpressionKind::FunctionCall(call) => call.arguments.iter().collect(),
            ExpressionKind::Sequence(items) => items.iter().collect(),
            _ => Vec::new(),
        };
        for operand in operands {
            if analysis.type_of(operand.id) == Some(ty) {
                let replacement = builder.paren(operand.clone());
                result.push(Opportunity::single(Change::Expression(
                    expression.id,
                    replacement,
                )));
            }
        }
    }
    result
}
