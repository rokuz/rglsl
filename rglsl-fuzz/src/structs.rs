use std::collections::BTreeMap;

use rglsl_ast::ast::{
    DeclarationKind, Expression, ExternalDeclaration, StructSpecifier, TranslationUnit,
    TypeSpecifier, TypeSpecifierNonArray,
};

use crate::basic;
use crate::build::{named_type, Builder};
use crate::fuzzer::literal_zero_or_one;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Field {
    pub name: String,
    pub ty: TypeSpecifier,
    pub array: bool,
}

pub type Structs = BTreeMap<String, Vec<Field>>;

pub fn struct_fields(structure: &StructSpecifier) -> Vec<Field> {
    let mut fields = Vec::new();
    for member in &structure.declarations {
        for declarator in &member.declarators {
            fields.push(Field {
                name: declarator.name.node.clone(),
                ty: member.ty.specifier.node.clone(),
                array: declarator.array.is_some() || member.ty.specifier.array.is_some(),
            });
        }
    }
    fields
}

pub fn global_structs(unit: &TranslationUnit) -> Structs {
    let mut structs = Structs::new();
    for external in &unit.external_declarations {
        let ExternalDeclaration::Declaration(declaration) = external else {
            continue;
        };
        let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
            continue;
        };
        if let TypeSpecifierNonArray::Struct(structure) = &list.ty.specifier.non_array {
            if let Some(name) = &structure.name {
                structs.insert(name.node.clone(), struct_fields(structure));
            }
        }
    }
    structs
}

pub fn canonical_constant(
    specifier: &TypeSpecifier,
    structs: &Structs,
    builder: &mut Builder,
) -> Option<Expression> {
    if specifier.array.is_some() {
        return None;
    }
    match &specifier.non_array {
        TypeSpecifierNonArray::Basic(ty) => {
            basic::from_specifier(specifier)?;
            Some(literal_zero_or_one(builder, false, *ty))
        }
        TypeSpecifierNonArray::TypeName(name) => struct_constant(name, structs, builder, 0),
        TypeSpecifierNonArray::Struct(structure) => {
            let name = structure.name.as_ref()?;
            struct_constant(&name.node, structs, builder, 0)
        }
        _ => None,
    }
}

fn struct_constant(
    name: &str,
    structs: &Structs,
    builder: &mut Builder,
    depth: u32,
) -> Option<Expression> {
    if depth > 8 {
        return None;
    }
    let fields = structs.get(name)?;
    let mut arguments = Vec::with_capacity(fields.len());
    for field in fields {
        if field.array {
            return None;
        }
        let value = match &field.ty.non_array {
            TypeSpecifierNonArray::TypeName(inner) => {
                struct_constant(inner, structs, builder, depth + 1)?
            }
            _ => canonical_constant(&field.ty, structs, builder)?,
        };
        arguments.push(value);
    }
    Some(builder.construct_specifier(named_type(name.to_owned()), arguments))
}
