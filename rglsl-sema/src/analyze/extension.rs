use alloc::string::String;

use rglsl_ast::ast::ExtensionBehavior;
use rglsl_ast::extensions::{self, names, ExtensionIssue, Feature, Request, EXPLICIT_ARITHMETIC};
use rglsl_ast::Span;

use super::Analyzer;
use crate::builtins::Stage;
use crate::diagnostic::{Diagnostic, DiagnosticKind};
use crate::scope::Storage;
use crate::types::{NumericFeatures, Scalar, Type, TypeKind};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum SmallKind {
    Float16,
    Int16,
    Int8,
}

impl SmallKind {
    const ALL: [Self; 3] = [Self::Float16, Self::Int16, Self::Int8];

    const fn feature(self) -> Feature {
        match self {
            Self::Float16 => Feature::Float16Arithmetic,
            Self::Int16 => Feature::Int16Arithmetic,
            Self::Int8 => Feature::Int8Arithmetic,
        }
    }

    const fn matches(self, scalar: Scalar) -> bool {
        match self {
            Self::Float16 => matches!(scalar, Scalar::Float16),
            Self::Int16 => matches!(scalar, Scalar::Int16 | Scalar::Uint16),
            Self::Int8 => matches!(scalar, Scalar::Int8 | Scalar::Uint8),
        }
    }

    const fn name(self) -> &'static str {
        match self {
            Self::Float16 => "float16",
            Self::Int16 => "(u)int16",
            Self::Int8 => "(u)int8",
        }
    }
}

fn joined(names: &[&str]) -> String {
    let mut text = String::new();
    for (index, name) in names.iter().enumerate() {
        if index > 0 {
            text.push_str(", ");
        }
        text.push_str(name);
    }
    text
}

impl Analyzer<'_> {
    pub(crate) fn extension_directive(
        &mut self,
        span: Span,
        name: &str,
        behavior: ExtensionBehavior,
    ) {
        self.extension_stage(span, name);
        let enabling = matches!(
            behavior,
            ExtensionBehavior::Require | ExtensionBehavior::Enable
        );
        if enabling {
            if let (Some(needed), Some(target)) =
                (extensions::minimum_spirv(name), self.options.spirv_version)
            {
                if target < needed {
                    self.error(
                        span,
                        DiagnosticKind::ExtensionSpirvVersion(String::from(name)),
                    );
                }
            }
        }
        if let Some(reason) = extensions::unsupported_in_vulkan(name) {
            if behavior != ExtensionBehavior::Disable {
                self.error(
                    span,
                    DiagnosticKind::ExtensionNotInVulkan {
                        name: String::from(name),
                        reason,
                    },
                );
            }
        }
        if extensions::unsupported_with_spirv(name) {
            self.error(
                span,
                DiagnosticKind::ExtensionWithoutSpirv(String::from(name)),
            );
        }
        for issue in self.extensions.apply(name, behavior) {
            let error = issue.is_error();
            let kind = match issue {
                ExtensionIssue::UnknownRequired(name) | ExtensionIssue::Unknown(name) => {
                    DiagnosticKind::UnsupportedExtension(name)
                }
                ExtensionIssue::AllEnabled(behavior) => {
                    DiagnosticKind::AllExtensionsEnabled(behavior.keyword())
                }
            };
            if error {
                self.error(span, kind);
            } else {
                self.warnings.push(Diagnostic { span, kind });
            }
        }
    }

    fn extension_stage(&mut self, span: Span, name: &str) {
        let other = match name {
            names::MESH_SHADER_NV => names::MESH_SHADER_EXT,
            names::MESH_SHADER_EXT => names::MESH_SHADER_NV,
            _ => return,
        };
        self.stage_check(span, |stage| {
            (!matches!(stage, Stage::Task | Stage::Mesh | Stage::Fragment)).then(|| {
                DiagnosticKind::ExtensionStage {
                    extension: String::from(name),
                    stage: stage.name(),
                }
            })
        });
        if self.extensions.is_on(other) {
            self.error(
                span,
                DiagnosticKind::ConflictingExtensions(String::from(name), other),
            );
        }
    }

    pub(crate) fn numeric_features(&self) -> NumericFeatures {
        NumericFeatures {
            explicit_arithmetic: self.extensions.any_on(&EXPLICIT_ARITHMETIC),
            half_float: self.extensions.is_on(names::AMD_GPU_SHADER_HALF_FLOAT),
            int16: self.extensions.is_on(names::AMD_GPU_SHADER_INT16),
        }
    }

    pub(crate) fn explicit_types(&self) -> bool {
        self.extensions.any_on(&EXPLICIT_ARITHMETIC)
    }

    pub(crate) fn converts(&self, from: &Type, to: &Type) -> bool {
        from.converts_with(to, self.numeric_features())
    }

    pub(crate) fn require_feature(&mut self, span: Span, feature: Feature, what: &str) -> bool {
        let names = feature.extensions();
        match self.extensions.request(names) {
            Request::Enabled => true,
            Request::Warned(extension) => {
                self.warnings.push(Diagnostic {
                    span,
                    kind: DiagnosticKind::ExtensionWarned {
                        extension,
                        feature: String::from(what),
                    },
                });
                true
            }
            Request::Missing => {
                self.error(
                    span,
                    DiagnosticKind::ExtensionRequired {
                        feature: String::from(what),
                        extensions: joined(names),
                    },
                );
                false
            }
        }
    }

    fn contains_small(&self, ty: &Type, kind: SmallKind) -> bool {
        match ty.kind {
            TypeKind::Struct(id) => self.types.structure(id).is_some_and(|structure| {
                structure.scalars.iter().any(|scalar| kind.matches(*scalar))
            }),
            TypeKind::Block(_) => false,
            TypeKind::CooperativeMatrix(matrix) if matrix.spirv_element => false,
            _ => ty.base_scalar().is_some_and(|scalar| kind.matches(scalar)),
        }
    }

    pub(crate) fn small_arithmetic_allowed(&self, types: &[&Type]) -> bool {
        SmallKind::ALL.iter().all(|kind| {
            !types.iter().any(|ty| self.contains_small(ty, *kind))
                || self.extensions.any_on(kind.feature().extensions())
        })
    }

    pub(crate) fn require_small_arithmetic(
        &mut self,
        span: Span,
        ty: &Type,
        operation: &str,
        reason: &str,
    ) -> bool {
        let mut allowed = true;
        for kind in SmallKind::ALL {
            if self.contains_small(ty, kind) {
                let what = alloc::format!("{operation}: {}", reason.replace("{}", kind.name()));
                allowed &= self.require_feature(span, kind.feature(), &what);
            }
        }
        allowed
    }

    pub(crate) fn storage_small_check(&mut self, span: Span, ty: &Type, storage: Storage) {
        if matches!(storage, Storage::Uniform | Storage::Buffer) {
            return;
        }
        self.require_small_arithmetic(
            span,
            ty,
            "qualifier",
            "{} types can only be in uniform block or buffer storage",
        );
    }

    pub(crate) fn assignment_small_check(&mut self, span: Span, ty: &Type, operation: &str) {
        let aggregate = ty.is_array() || matches!(ty.kind, TypeKind::Struct(_));
        if aggregate {
            self.require_small_arithmetic(
                span,
                ty,
                operation,
                "can't use with aggregates containing {}",
            );
        }
    }
}
