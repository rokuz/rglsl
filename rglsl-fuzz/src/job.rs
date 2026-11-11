use std::collections::BTreeSet;

use rglsl_ast::ast::{
    CompoundStatement, Declaration, DeclarationKind, ExpressionKind, ExternalDeclaration,
    InitDeclaratorList, Node, SingleTypeQualifier, Statement, StatementKind, StorageQualifier,
    TranslationUnit, TypeQualifier, TypeSpecifierNonArray,
};
use rglsl_ast::{expressions, print, Span};
use rglsl_sema::Stage;

use crate::basic;
use crate::build::Builder;
use crate::constants::{is_donated_name, INJECTION_SWITCH};
use crate::error::Error;
use crate::macros::{emit, parse_shader};
use crate::pipeline::{array_count, PipelineInfo};
use crate::rewrite::{rewrite_expressions, rewrite_statements};
use crate::scope::has_storage;

pub const STAGE_EXTENSIONS: [&str; 3] = ["vert", "frag", "comp"];

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Shader {
    pub extension: String,
    pub unit: TranslationUnit,
}

impl Shader {
    pub fn stage(&self) -> Stage {
        Stage::from_extension(&self.extension).unwrap_or(Stage::Fragment)
    }

    pub fn version(&self) -> Option<u32> {
        self.unit
            .external_declarations
            .iter()
            .find_map(|external| match external {
                ExternalDeclaration::Directive(directive) => match &directive.kind {
                    rglsl_ast::ast::DirectiveKind::Version { number, .. } => Some(*number),
                    _ => None,
                },
                _ => None,
            })
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ShaderJob {
    pub pipeline: PipelineInfo,
    pub shaders: Vec<Shader>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct EmittedShaderJob {
    pub json: String,
    pub shaders: Vec<(String, String)>,
}

pub fn parse_unit(extension: &str, source: &str) -> Result<TranslationUnit, Error> {
    parse_shader(source).map_err(|error| Error::Parse {
        shader: extension.to_owned(),
        message: error.to_string(),
    })
}

pub fn renumber(unit: &TranslationUnit) -> Result<TranslationUnit, Error> {
    parse_unit("shader", &print(unit))
}

fn parse_declarations(text: &str) -> Result<Vec<ExternalDeclaration>, Error> {
    Ok(parse_unit("generated declaration", text)?.external_declarations)
}

fn is_uniform_list(external: &ExternalDeclaration) -> Option<&InitDeclaratorList> {
    let ExternalDeclaration::Declaration(declaration) = external else {
        return None;
    };
    let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
        return None;
    };
    has_storage(list.ty.qualifier.as_ref(), StorageQualifier::Uniform).then_some(list)
}

fn insertion_point(unit: &TranslationUnit) -> usize {
    unit.external_declarations
        .iter()
        .position(|external| match external {
            ExternalDeclaration::Directive(_) => false,
            ExternalDeclaration::Declaration(declaration) => {
                !matches!(declaration.kind, DeclarationKind::Precision { .. })
            }
            _ => true,
        })
        .unwrap_or(unit.external_declarations.len())
}

pub fn global_names(unit: &TranslationUnit) -> BTreeSet<String> {
    let mut names = BTreeSet::new();
    for external in &unit.external_declarations {
        let ExternalDeclaration::Declaration(declaration) = external else {
            continue;
        };
        match &declaration.kind {
            DeclarationKind::InitDeclaratorList(list) => {
                for declarator in &list.declarators {
                    names.insert(declarator.name.node.clone());
                }
            }
            DeclarationKind::Block {
                structure,
                instance,
            } => match instance {
                Some(instance) => {
                    names.insert(instance.name.node.clone());
                }
                None => {
                    for member in &structure.members {
                        for declarator in &member.declarators {
                            names.insert(declarator.name.node.clone());
                        }
                    }
                }
            },
            _ => {}
        }
    }
    names
}

pub fn add_injection_switch_if_not_present(unit: &mut TranslationUnit) -> Result<(), Error> {
    if global_names(unit).contains(INJECTION_SWITCH) {
        return Ok(());
    }
    let declarations = parse_declarations(&format!("uniform vec2 {INJECTION_SWITCH};"))?;
    let index = insertion_point(unit);
    for (offset, declaration) in declarations.into_iter().enumerate() {
        unit.external_declarations
            .insert(index + offset, declaration);
    }
    Ok(())
}

fn wrap_in_block(statement: &mut Statement, builder: &mut Builder) {
    if matches!(statement.kind, StatementKind::Compound(_)) {
        return;
    }
    let block = Node::new(
        builder.id(),
        Span::new(0, 0),
        StatementKind::Compound(CompoundStatement::default()),
    );
    let inner = core::mem::replace(statement, block);
    if let StatementKind::Compound(compound) = &mut statement.kind {
        compound.statements.push(inner);
    }
}

pub fn add_braces(unit: &mut TranslationUnit) {
    let mut builder = Builder::new(unit.next_id());
    rewrite_statements(unit, &mut |statement| match &mut statement.kind {
        StatementKind::Selection {
            then_branch,
            else_branch,
            ..
        } => {
            wrap_in_block(then_branch, &mut builder);
            if let Some(else_branch) = else_branch {
                wrap_in_block(else_branch, &mut builder);
            }
        }
        StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
            wrap_in_block(body, &mut builder);
        }
        StatementKind::For(for_statement) => wrap_in_block(&mut for_statement.body, &mut builder),
        _ => {}
    });
}

fn count_statements(statement: &Statement) -> usize {
    1 + match &statement.kind {
        StatementKind::Compound(compound) => compound.statements.iter().map(count_statements).sum(),
        StatementKind::Selection {
            then_branch,
            else_branch,
            ..
        } => count_statements(then_branch) + else_branch.as_deref().map_or(0, count_statements),
        StatementKind::Switch { statements, .. } => statements.iter().map(count_statements).sum(),
        StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
            count_statements(body)
        }
        StatementKind::For(for_statement) => {
            count_statements(&for_statement.init) + count_statements(&for_statement.body)
        }
        StatementKind::Attributed { statement, .. } => count_statements(statement),
        StatementKind::Declaration(_)
        | StatementKind::Expression(_)
        | StatementKind::CaseLabel(_)
        | StatementKind::Jump(_) => 0,
    }
}

fn binding_values(unit: &TranslationUnit) -> BTreeSet<u32> {
    let mut used = BTreeSet::new();
    let mut collect = |qualifier: Option<&rglsl_ast::ast::Spanned<TypeQualifier>>| {
        let Some(qualifier) = qualifier else {
            return;
        };
        for single in &qualifier.qualifiers {
            let SingleTypeQualifier::Layout(layout) = &single.node else {
                continue;
            };
            for id in &layout.ids {
                if id.name.node != "binding" {
                    continue;
                }
                if let Some(value) = &id.value {
                    if let ExpressionKind::Number(literal) = &value.kind {
                        if let Ok(number) = literal.digits().parse::<u32>() {
                            used.insert(number);
                        }
                    }
                }
            }
        }
    };
    for external in &unit.external_declarations {
        let ExternalDeclaration::Declaration(declaration) = external else {
            continue;
        };
        match &declaration.kind {
            DeclarationKind::InitDeclaratorList(list) => collect(list.ty.qualifier.as_ref()),
            DeclarationKind::Block { structure, .. } => collect(Some(&structure.qualifier)),
            DeclarationKind::Qualifier(qualifier)
            | DeclarationKind::QualifiedIdentifiers { qualifier, .. } => collect(Some(qualifier)),
            _ => {}
        }
    }
    used
}

fn member_text(list: &InitDeclaratorList, index: usize) -> String {
    let mut single = list.clone();
    single.declarators = list
        .declarators
        .get(index)
        .cloned()
        .into_iter()
        .map(|mut declarator| {
            declarator.initializer = None;
            declarator
        })
        .collect();
    if let Some(qualifier) = &mut single.ty.qualifier {
        qualifier.qualifiers.retain(|single| {
            !matches!(
                single.node,
                SingleTypeQualifier::Storage(StorageQualifier::Uniform)
                    | SingleTypeQualifier::Layout(_)
            )
        });
        if qualifier.qualifiers.is_empty() {
            single.ty.qualifier = None;
        }
    }
    let declaration = Declaration::new(
        rglsl_ast::ast::NodeId::new(0),
        Span::new(0, 0),
        DeclarationKind::InitDeclaratorList(single),
    );
    declaration.to_string()
}

fn sampler_text(list: &InitDeclaratorList, index: usize, binding: u32) -> String {
    let specifier = match &list.ty.specifier.node.non_array {
        TypeSpecifierNonArray::Opaque(name) => name.clone(),
        _ => String::from("sampler2D"),
    };
    let name = list
        .declarators
        .get(index)
        .map(|declarator| declarator.name.node.clone())
        .unwrap_or_default();
    format!("layout(set = 0, binding = {binding}) uniform {specifier} {name};")
}

impl ShaderJob {
    pub fn parse(json: &str, sources: &[(String, String)]) -> Result<Self, Error> {
        let pipeline = PipelineInfo::from_json(json)?;
        let mut shaders = Vec::new();
        for (extension, source) in sources {
            if shaders
                .iter()
                .any(|shader: &Shader| &shader.extension == extension)
            {
                return Err(Error::Unsupported(format!(
                    "several shaders of kind {extension}"
                )));
            }
            shaders.push(Shader {
                extension: extension.clone(),
                unit: parse_unit(extension, source)?,
            });
        }
        Ok(Self { pipeline, shaders })
    }

    pub fn emit(&self) -> EmittedShaderJob {
        EmittedShaderJob {
            json: self.pipeline.to_json(),
            shaders: self
                .shaders
                .iter()
                .map(|shader| (shader.extension.clone(), emit(&shader.unit)))
                .collect(),
        }
    }

    pub fn make_uniform_bindings(&mut self, push_constant: Option<&str>) -> Result<(), Error> {
        let mut used = self.pipeline.bindings();
        for shader in &self.shaders {
            used.extend(binding_values(&shader.unit));
        }
        let mut next_binding = 0;
        while used.contains(&next_binding) {
            next_binding += 1;
        }
        for shader in &mut self.shaders {
            let mut replaced = Vec::new();
            for external in core::mem::take(&mut shader.unit.external_declarations) {
                let Some(list) = is_uniform_list(&external) else {
                    replaced.push(external);
                    continue;
                };
                for (index, declarator) in list.declarators.iter().enumerate() {
                    let name = declarator.name.node.as_str();
                    if !self.pipeline.has_uniform(name) {
                        return Err(Error::Generation(format!(
                            "uniform {name} has no value in the shader job"
                        )));
                    }
                    let push = push_constant == Some(name);
                    if push {
                        self.pipeline.add_uniform_binding(name, true, 0);
                    } else if !self.pipeline.has_binding(name) {
                        self.pipeline.add_uniform_binding(name, false, next_binding);
                        next_binding += 1;
                        while used.contains(&next_binding) {
                            next_binding += 1;
                        }
                    }
                    let opaque = matches!(
                        list.ty.specifier.node.non_array,
                        TypeSpecifierNonArray::Opaque(_)
                    );
                    let text = if opaque {
                        let binding = self.pipeline.binding(name).unwrap_or(0);
                        sampler_text(list, index, binding)
                    } else if push {
                        format!(
                            "layout(push_constant) uniform buf_push {{ {} }};",
                            member_text(list, index)
                        )
                    } else {
                        let binding = self.pipeline.binding(name).unwrap_or(0);
                        format!(
                            "layout(set = 0, binding = {binding}) uniform buf{binding} {{ {} }};",
                            member_text(list, index)
                        )
                    };
                    replaced.extend(parse_declarations(&text)?);
                }
            }
            shader.unit.external_declarations = replaced;
            shader.unit = renumber(&shader.unit)?;
        }
        for name in self.pipeline.uniform_names() {
            if self.pipeline.has_binding_or_is_push_constant(&name) {
                continue;
            }
            if push_constant == Some(name.as_str()) {
                self.pipeline.add_uniform_binding(&name, true, 0);
            } else {
                self.pipeline
                    .add_uniform_binding(&name, false, next_binding);
                next_binding += 1;
                while used.contains(&next_binding) {
                    next_binding += 1;
                }
            }
        }
        Ok(())
    }

    pub fn prune_uniforms(&mut self, limit: usize) -> Result<(), Error> {
        let names = self.pipeline.uniform_names();
        let to_prune = names.len().saturating_sub(limit);
        if to_prune == 0 {
            return Ok(());
        }
        let mut canonical_sampler: Option<String> = None;
        for name in &names {
            if !self.pipeline.is_sampler(name) {
                continue;
            }
            if !is_donated_name(name) {
                canonical_sampler = Some(name.clone());
                break;
            }
            if canonical_sampler.is_none() {
                canonical_sampler = Some(name.clone());
            }
        }
        let mut prune_first = Vec::new();
        let mut prune_if_necessary = Vec::new();
        for name in &names {
            let sampler = self.pipeline.is_sampler(name);
            if sampler && (!is_donated_name(name) || canonical_sampler.as_ref() == Some(name)) {
                continue;
            }
            if is_donated_name(name) {
                prune_first.push(name.clone());
            } else if !sampler {
                prune_if_necessary.push(name.clone());
            }
        }
        let ordered: Vec<String> = prune_first.into_iter().chain(prune_if_necessary).collect();
        for name in ordered.into_iter().take(to_prune) {
            let sampler = self.pipeline.is_sampler(&name);
            for shader in &mut self.shaders {
                if sampler {
                    if let Some(canonical) = &canonical_sampler {
                        replace_with_canonical_sampler(&mut shader.unit, &name, canonical)?;
                    }
                } else {
                    inline_uniform(&mut shader.unit, &self.pipeline, &name)?;
                }
            }
            self.pipeline.remove_uniform(&name);
        }
        Ok(())
    }
}

fn float_literal(text: &str) -> String {
    if text.contains(['.', 'e', 'E']) || text.contains("inf") || text.contains("NaN") {
        text.to_owned()
    } else {
        format!("{text}.0")
    }
}

pub fn literal_text(ty: rglsl_ast::ast::BasicType, values: &[String]) -> String {
    let literals: Vec<String> = values
        .iter()
        .map(|value| match basic::element(ty) {
            rglsl_ast::ast::ScalarType::Bool => {
                if value.trim() == "1" { "true" } else { "false" }.to_owned()
            }
            rglsl_ast::ast::ScalarType::Float
            | rglsl_ast::ast::ScalarType::Double
            | rglsl_ast::ast::ScalarType::Float16
            | rglsl_ast::ast::ScalarType::BFloat16
            | rglsl_ast::ast::ScalarType::FloatE4M3
            | rglsl_ast::ast::ScalarType::FloatE5M2 => float_literal(value),
            rglsl_ast::ast::ScalarType::Uint
            | rglsl_ast::ast::ScalarType::Uint8
            | rglsl_ast::ast::ScalarType::Uint16
            | rglsl_ast::ast::ScalarType::Uint64 => format!("{}u", value.trim_start_matches('-')),
            rglsl_ast::ast::ScalarType::Int
            | rglsl_ast::ast::ScalarType::Int8
            | rglsl_ast::ast::ScalarType::Int16
            | rglsl_ast::ast::ScalarType::Int64 => value.clone(),
        })
        .collect();
    match literals.as_slice() {
        [single] => single.clone(),
        _ => format!("{ty}({})", literals.join(", ")),
    }
}

fn inline_uniform(
    unit: &mut TranslationUnit,
    pipeline: &PipelineInfo,
    name: &str,
) -> Result<(), Error> {
    let mut replaced = Vec::new();
    for mut external in core::mem::take(&mut unit.external_declarations) {
        let Some(list) = is_uniform_list(&external) else {
            replaced.push(external);
            continue;
        };
        let Some(index) = list
            .declarators
            .iter()
            .position(|declarator| declarator.name.node == name)
        else {
            replaced.push(external);
            continue;
        };
        let TypeSpecifierNonArray::Basic(ty) = list.ty.specifier.node.non_array else {
            return Err(Error::Unsupported(format!(
                "pruning uniform {name} of a non-basic type"
            )));
        };
        let Some(declarator) = list.declarators.get(index) else {
            replaced.push(external);
            continue;
        };
        let count = array_count(declarator)?;
        let args = pipeline.args(name);
        let initializer = match count {
            Some(count) => {
                let width = usize::try_from(basic::num_elements(ty)).unwrap_or(1).max(1);
                let elements: Vec<String> = args
                    .chunks(width)
                    .map(|chunk| literal_text(ty, chunk))
                    .collect();
                format!("{ty}[{count}]({})", elements.join(", "))
            }
            None => literal_text(ty, &args),
        };
        let array = count.map(|count| format!("[{count}]")).unwrap_or_default();
        replaced.extend(parse_declarations(&format!(
            "{ty} {name}{array} = {initializer};"
        ))?);
        if let ExternalDeclaration::Declaration(declaration) = &mut external {
            if let DeclarationKind::InitDeclaratorList(list) = &mut declaration.kind {
                list.declarators.remove(index);
                if !list.declarators.is_empty() {
                    replaced.push(external);
                }
            }
        }
    }
    unit.external_declarations = replaced;
    *unit = renumber(unit)?;
    Ok(())
}

fn replace_with_canonical_sampler(
    unit: &mut TranslationUnit,
    sampler: &str,
    canonical: &str,
) -> Result<(), Error> {
    let mut replaced_use = false;
    rewrite_expressions(unit, &mut |expression| {
        if let ExpressionKind::Variable(name) = &mut expression.kind {
            if name == sampler {
                *name = canonical.to_owned();
                replaced_use = true;
            }
        }
    });
    let mut kept = Vec::new();
    for mut external in core::mem::take(&mut unit.external_declarations) {
        if let ExternalDeclaration::Declaration(declaration) = &mut external {
            if let DeclarationKind::InitDeclaratorList(list) = &mut declaration.kind {
                if matches!(
                    list.ty.specifier.node.non_array,
                    TypeSpecifierNonArray::Opaque(_)
                ) {
                    list.declarators.retain(|declarator| {
                        declarator.name.node != sampler
                            && !(replaced_use && declarator.name.node == canonical)
                    });
                    if list.declarators.is_empty() {
                        continue;
                    }
                }
            }
        }
        kept.push(external);
    }
    unit.external_declarations = kept;
    if replaced_use {
        let declarations = parse_declarations(&format!("uniform sampler2D {canonical};"))?;
        let index = insertion_point(unit);
        for (offset, declaration) in declarations.into_iter().enumerate() {
            unit.external_declarations
                .insert(index + offset, declaration);
        }
    }
    *unit = renumber(unit)?;
    Ok(())
}

pub fn node_count(unit: &TranslationUnit) -> usize {
    let statements: usize = unit
        .external_declarations
        .iter()
        .map(|external| match external {
            ExternalDeclaration::FunctionDefinition(definition) => definition
                .body
                .statements
                .iter()
                .map(count_statements)
                .sum(),
            _ => 0,
        })
        .sum();
    expressions(unit).len() + statements + unit.external_declarations.len()
}
