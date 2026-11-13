use super::{Capabilities, ValidationFlags, Validator};
use crate::{
    ImageClass, ImageDimension, Module, Scalar, ScalarKind, Span, StorageAccess, StorageFormat,
    Type, TypeInner,
};

const IMPOSSIBLE_UNKNOWN_FORMAT_SCALARS: [Scalar; 4] = [
    Scalar {
        kind: ScalarKind::Float,
        width: 255,
    },
    Scalar {
        kind: ScalarKind::Sint,
        width: 255,
    },
    Scalar {
        kind: ScalarKind::Uint,
        width: 3,
    },
    Scalar {
        kind: ScalarKind::Float,
        width: 8,
    },
];

#[test]
fn modules_with_impossible_scalar_widths_are_rejected() {
    for scalar in IMPOSSIBLE_UNKNOWN_FORMAT_SCALARS {
        let mut module = Module::default();
        module.types.insert(
            Type {
                name: None,
                inner: TypeInner::Image {
                    dim: ImageDimension::D2,
                    arrayed: false,
                    class: ImageClass::Storage {
                        format: StorageFormat::Unknown(scalar),
                        access: StorageAccess::LOAD,
                        multi: false,
                    },
                },
            },
            Span::default(),
        );
        let mut validator = Validator::new(ValidationFlags::all(), Capabilities::default());
        assert!(validator.validate(&module).is_err(), "{:#?}", module.types);
    }
}
