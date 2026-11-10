use rglsl_ast::ast::{
    ArrayDimension, BasicType, DeclarationKind, ExpressionKind, ExternalDeclaration,
    InitDeclarator, ScalarType, StorageQualifier, TranslationUnit, TypeSpecifierNonArray,
};
use serde_json::{Map, Number, Value};

use crate::basic;
use crate::error::Error;
use crate::random::Random;
use crate::scope::has_storage;

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct PipelineInfo {
    dictionary: Map<String, Value>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum UniformType {
    Basic(BasicType),
    Opaque(String),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UniformDeclarator {
    pub name: String,
    pub ty: UniformType,
    pub count: Option<u32>,
}

pub fn is_legal_uniform_name(name: &str) -> bool {
    let mut characters = name.chars();
    let Some(first) = characters.next() else {
        return false;
    };
    (first.is_alphabetic() || first == '_')
        && characters.all(|character| character.is_alphanumeric() || character == '_')
}

pub fn array_count(declarator: &InitDeclarator) -> Result<Option<u32>, Error> {
    let Some(array) = &declarator.array else {
        return Ok(None);
    };
    let [dimension] = array.dimensions.as_slice() else {
        return Err(Error::Unsupported(format!(
            "multi-dimensional array uniform {}",
            declarator.name.node
        )));
    };
    let ArrayDimension::Sized(size) = &dimension.node else {
        return Err(Error::Unsupported(format!(
            "unsized array uniform {}",
            declarator.name.node
        )));
    };
    let ExpressionKind::Number(literal) = &size.kind else {
        return Err(Error::Unsupported(format!(
            "array uniform {} with a non-literal size",
            declarator.name.node
        )));
    };
    literal
        .digits()
        .parse::<u32>()
        .map(Some)
        .map_err(|_| Error::Unsupported(format!("array size of {}", declarator.name.node)))
}

pub fn uniform_declarators(unit: &TranslationUnit) -> Result<Vec<UniformDeclarator>, Error> {
    let mut result = Vec::new();
    for external in &unit.external_declarations {
        let ExternalDeclaration::Declaration(declaration) = external else {
            continue;
        };
        let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
            continue;
        };
        if !has_storage(list.ty.qualifier.as_ref(), StorageQualifier::Uniform) {
            continue;
        }
        let specifier = &list.ty.specifier;
        let ty = match &specifier.non_array {
            TypeSpecifierNonArray::Basic(ty) if specifier.array.is_none() => {
                UniformType::Basic(*ty)
            }
            TypeSpecifierNonArray::Opaque(name) if specifier.array.is_none() => {
                UniformType::Opaque(name.clone())
            }
            TypeSpecifierNonArray::Struct(_) | TypeSpecifierNonArray::TypeName(_) => continue,
            _ => {
                return Err(Error::Unsupported(String::from(
                    "uniforms with array base types",
                )))
            }
        };
        for declarator in &list.declarators {
            result.push(UniformDeclarator {
                name: declarator.name.node.clone(),
                ty: ty.clone(),
                count: array_count(declarator)?,
            });
        }
    }
    Ok(result)
}

pub fn gl_uniform_function_name(ty: BasicType, array: bool) -> String {
    let mut name = String::from("glUniform");
    match ty {
        BasicType::Matrix { columns, rows, .. } => {
            name.push_str("Matrix");
            if columns == rows {
                name.push_str(&columns.count().to_string());
            } else {
                name.push_str(&format!("{}x{}", columns.count(), rows.count()));
            }
        }
        _ => name.push_str(&basic::num_elements(ty).to_string()),
    }
    name.push_str(match basic::element(ty) {
        ScalarType::Float | ScalarType::Double => "f",
        ScalarType::Uint => "ui",
        ScalarType::Int | ScalarType::Bool => "i",
    });
    if basic::is_matrix(ty) || array {
        name.push('v');
    }
    name
}

fn float_value(value: f32) -> Value {
    let text = format!("{value:?}");
    text.parse::<f64>()
        .ok()
        .and_then(Number::from_f64)
        .map_or(Value::Null, Value::Number)
}

impl PipelineInfo {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn from_json(text: &str) -> Result<Self, Error> {
        match serde_json::from_str::<Value>(text) {
            Ok(Value::Object(dictionary)) => Ok(Self { dictionary }),
            Ok(_) => Err(Error::Json(String::from("the top level is not an object"))),
            Err(error) => Err(Error::Json(error.to_string())),
        }
    }

    pub fn to_json(&self) -> String {
        serde_json::to_string_pretty(&Value::Object(self.dictionary.clone()))
            .unwrap_or_else(|_| String::from("{}"))
    }

    pub fn has_uniform(&self, name: &str) -> bool {
        self.dictionary.contains_key(name)
    }

    fn entry(&self, name: &str) -> Option<&Map<String, Value>> {
        self.dictionary.get(name).and_then(Value::as_object)
    }

    fn entry_mut(&mut self, name: &str) -> Option<&mut Map<String, Value>> {
        self.dictionary.get_mut(name).and_then(Value::as_object_mut)
    }

    fn function_of(&self, name: &str) -> Option<&str> {
        self.entry(name)
            .and_then(|entry| entry.get("func"))
            .and_then(Value::as_str)
    }

    fn already_exists(&self, name: &str, function: &str) -> Result<bool, Error> {
        if !self.has_uniform(name) {
            return Ok(false);
        }
        if self.function_of(name) != Some(function) {
            return Err(Error::Unsupported(format!(
                "uniform {name} redefined as a different type"
            )));
        }
        Ok(true)
    }

    pub fn add_uniform(
        &mut self,
        name: &str,
        ty: BasicType,
        count: Option<u32>,
        values: Vec<Value>,
    ) -> Result<(), Error> {
        let function = gl_uniform_function_name(ty, count.is_some());
        if self.already_exists(name, &function)? {
            return Ok(());
        }
        let mut info = Map::new();
        info.insert(String::from("func"), Value::String(function));
        info.insert(String::from("args"), Value::Array(values));
        if let Some(count) = count {
            info.insert(String::from("count"), Value::from(count));
        }
        self.dictionary.insert(name.to_owned(), Value::Object(info));
        Ok(())
    }

    pub fn add_sampler(&mut self, name: &str, sampler: &str, texture: &str) -> Result<(), Error> {
        if self.already_exists(name, sampler)? {
            return Ok(());
        }
        let mut info = Map::new();
        info.insert(String::from("func"), Value::String(sampler.to_owned()));
        info.insert(String::from("texture"), Value::String(texture.to_owned()));
        self.dictionary.insert(name.to_owned(), Value::Object(info));
        Ok(())
    }

    pub fn set_injection_switch(&mut self) -> Result<(), Error> {
        self.add_uniform(
            crate::constants::INJECTION_SWITCH,
            basic::VEC2,
            None,
            vec![float_value(0.0), float_value(1.0)],
        )
    }

    pub fn uniform_names(&self) -> Vec<String> {
        let mut names: Vec<String> = self
            .dictionary
            .keys()
            .filter(|name| is_legal_uniform_name(name))
            .cloned()
            .collect();
        names.sort();
        names
    }

    pub fn num_uniforms(&self) -> usize {
        self.uniform_names().len()
    }

    pub fn remove_uniform(&mut self, name: &str) {
        self.dictionary.remove(name);
    }

    pub fn args(&self, name: &str) -> Vec<String> {
        self.entry(name)
            .and_then(|entry| entry.get("args"))
            .and_then(Value::as_array)
            .map(|values| values.iter().map(ToString::to_string).collect())
            .unwrap_or_default()
    }

    pub fn add_uniform_binding(&mut self, name: &str, push_constant: bool, number: u32) {
        if let Some(entry) = self.entry_mut(name) {
            if push_constant {
                entry.insert(String::from("push_constant"), Value::Bool(true));
            } else {
                entry.insert(String::from("binding"), Value::from(number));
            }
        }
    }

    pub fn has_binding(&self, name: &str) -> bool {
        self.entry(name)
            .is_some_and(|entry| entry.contains_key("binding"))
    }

    pub fn is_push_constant(&self, name: &str) -> bool {
        self.entry(name)
            .is_some_and(|entry| entry.contains_key("push_constant"))
    }

    pub fn has_binding_or_is_push_constant(&self, name: &str) -> bool {
        self.has_binding(name) || self.is_push_constant(name)
    }

    pub fn binding(&self, name: &str) -> Option<u32> {
        self.entry(name)
            .and_then(|entry| entry.get("binding"))
            .and_then(Value::as_u64)
            .and_then(|binding| u32::try_from(binding).ok())
    }

    pub fn is_sampler(&self, name: &str) -> bool {
        self.function_of(name)
            .is_some_and(|function| !function.starts_with("glUniform"))
    }

    pub fn set_uniforms(
        &mut self,
        unit: &TranslationUnit,
        supply: &mut dyn FnMut(ScalarType) -> Value,
    ) -> Result<(), Error> {
        for declarator in uniform_declarators(unit)? {
            if self.has_uniform(&declarator.name) {
                continue;
            }
            match &declarator.ty {
                UniformType::Basic(ty) => {
                    let length = declarator.count.unwrap_or(1);
                    let count = basic::num_elements(*ty) * length;
                    let values = (0..count).map(|_| supply(basic::element(*ty))).collect();
                    self.add_uniform(&declarator.name, *ty, declarator.count, values)?;
                }
                UniformType::Opaque(sampler) => {
                    if declarator.count.is_some() {
                        return Err(Error::Unsupported(String::from("arrays of samplers")));
                    }
                    self.add_sampler(&declarator.name, sampler, "DEFAULT")?;
                }
            }
        }
        Ok(())
    }

    pub fn zero_unset_uniforms(&mut self, unit: &TranslationUnit) -> Result<(), Error> {
        self.set_uniforms(unit, &mut |scalar| match scalar {
            ScalarType::Float | ScalarType::Double => float_value(0.0),
            ScalarType::Int | ScalarType::Uint | ScalarType::Bool => Value::from(0),
        })
    }

    pub fn randomise_unset_uniforms(
        &mut self,
        unit: &TranslationUnit,
        random: &mut Random,
    ) -> Result<(), Error> {
        self.set_uniforms(unit, &mut |scalar| match scalar {
            ScalarType::Float | ScalarType::Double => float_value(random.next_float()),
            ScalarType::Int | ScalarType::Uint => Value::from(random.next_int(1 << 15)),
            ScalarType::Bool => Value::from(random.next_int(2)),
        })
    }
}
