#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(serde::Serialize))]
#[cfg_attr(feature = "deserialize", derive(serde::Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
#[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
pub enum Flavor {
    Khr,
    Ext,
    Nv,
}

macro_rules! flavors {
    ($($name:ident: $($variant:ident)|+;)*) => {$(
        #[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
        #[cfg_attr(feature = "serialize", derive(serde::Serialize))]
        #[cfg_attr(feature = "deserialize", derive(serde::Deserialize))]
        #[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
        pub enum $name {
            $($variant),+
        }

        impl $name {
            pub const fn flavor(self) -> Flavor {
                match self {
                    $(Self::$variant => Flavor::$variant),+
                }
            }
        }

        impl From<$name> for Flavor {
            fn from(flavor: $name) -> Self {
                flavor.flavor()
            }
        }
    )*};
}

flavors! {
    BarycentricFlavor: Khr | Nv;
    DerivativeFlavor: Khr | Nv;
    FragmentDensityFlavor: Ext | Nv;
    HitObjectFlavor: Ext | Nv;
    MeshFlavor: Ext | Nv;
    RayTracingFlavor: Khr | Nv;
}
