use crate::arena::Handle;

use super::{ResolveContext, ResolveError, TypeResolution};

impl<'a> ResolveContext<'a> {
    pub(super) fn resolve_image_sample(
        &self,
        image: Handle<crate::Expression>,
        gather: Option<crate::SwizzleComponent>,
        depth_ref: Option<Handle<crate::Expression>>,
        sparse: Option<Handle<crate::Type>>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        if let Some(ty) = sparse {
            return Ok(TypeResolution::Handle(ty));
        }
        if gather.is_some() {
            let ty = past(image)?.inner_with(self.types);
            return match *ty {
                Ti::Image { class, .. } | Ti::SampledImage { class, .. } => {
                    Ok(TypeResolution::Value(Ti::Vector {
                        scalar: crate::Scalar {
                            kind: match class {
                                crate::ImageClass::Sampled { kind, multi: _ } => kind,
                                crate::ImageClass::Depth { multi: _ }
                                | crate::ImageClass::Storage { .. } => crate::ScalarKind::Float,
                            },
                            width: 4,
                        },
                        size: crate::VectorSize::Quad,
                    }))
                }
                _ => {
                    log::error!("Image type {ty:?}");
                    Err(ResolveError::InvalidImage(image))
                }
            };
        }
        if depth_ref.is_some() {
            return Ok(TypeResolution::Value(Ti::Scalar(crate::Scalar::F32)));
        }
        self.resolve_image_texel(image, past)
    }

    pub(super) fn resolve_image_load(
        &self,
        image: Handle<crate::Expression>,
        sparse: Option<Handle<crate::Type>>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        if let Some(ty) = sparse {
            return Ok(TypeResolution::Handle(ty));
        }
        self.resolve_image_texel(image, past)
    }

    fn resolve_image_texel(
        &self,
        image: Handle<crate::Expression>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        let ty = past(image)?.inner_with(self.types);
        match *ty {
            Ti::Image { class, .. } | Ti::SampledImage { class, .. } => {
                Ok(TypeResolution::Value(match class {
                    crate::ImageClass::Depth { multi: _ } => Ti::Scalar(crate::Scalar::F32),
                    crate::ImageClass::Sampled { kind, multi: _ } => Ti::Vector {
                        scalar: crate::Scalar { kind, width: 4 },
                        size: crate::VectorSize::Quad,
                    },
                    crate::ImageClass::Storage { format, .. } => Ti::Vector {
                        scalar: format.into(),
                        size: crate::VectorSize::Quad,
                    },
                }))
            }
            _ => {
                log::error!("Image type {ty:?}");
                Err(ResolveError::InvalidImage(image))
            }
        }
    }

    pub(super) fn resolve_image_query(
        &self,
        image: Handle<crate::Expression>,
        query: crate::ImageQuery,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        let inner = match query {
            crate::ImageQuery::Size { level: _ } => {
                let ty = past(image)?.inner_with(self.types);
                match *ty {
                    Ti::Image { dim, .. } | Ti::SampledImage { dim, .. } => match dim {
                        crate::ImageDimension::D1 | crate::ImageDimension::Buffer => {
                            Ti::Scalar(crate::Scalar::U32)
                        }

                        crate::ImageDimension::D3 => Ti::Vector {
                            size: crate::VectorSize::Tri,
                            scalar: crate::Scalar::U32,
                        },
                        _ => Ti::Vector {
                            size: crate::VectorSize::Bi,
                            scalar: crate::Scalar::U32,
                        },
                    },
                    _ => {
                        log::error!("Image type {ty:?}");
                        return Err(ResolveError::InvalidImage(image));
                    }
                }
            }

            crate::ImageQuery::Lod { .. } => Ti::Vector {
                size: crate::VectorSize::Bi,
                scalar: crate::Scalar::F32,
            },
            _ => Ti::Scalar(crate::Scalar::U32),
        };
        Ok(TypeResolution::Value(inner))
    }

    pub(super) fn resolve_fragment_fetch(
        &self,
        image: Handle<crate::Expression>,
        fragment: Option<Handle<crate::Expression>>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        match fragment {
            None => Ok(TypeResolution::Value(Ti::Scalar(crate::Scalar::U32))),
            Some(_) => {
                let ty = past(image)?.inner_with(self.types);
                match *ty {
                    Ti::Image {
                        class: crate::ImageClass::Sampled { kind, .. },
                        ..
                    }
                    | Ti::SampledImage {
                        class: crate::ImageClass::Sampled { kind, .. },
                        ..
                    } => Ok(TypeResolution::Value(Ti::Vector {
                        size: crate::VectorSize::Quad,
                        scalar: crate::Scalar { kind, width: 4 },
                    })),
                    _ => {
                        log::error!("Fragment fetch image type {ty:?}");
                        Err(ResolveError::InvalidImage(image))
                    }
                }
            }
        }
    }

    pub(super) fn resolve_attachment_read(
        &self,
        aspect: crate::AttachmentAspect,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        match aspect {
            crate::AttachmentAspect::Color(image) => {
                let ty = past(image)?.inner_with(self.types);
                match *ty {
                    Ti::Image {
                        class: crate::ImageClass::Sampled { kind, .. },
                        ..
                    } => Ok(TypeResolution::Value(Ti::Vector {
                        size: crate::VectorSize::Quad,
                        scalar: crate::Scalar { kind, width: 4 },
                    })),
                    _ => {
                        log::error!("Attachment type {ty:?}");
                        Err(ResolveError::InvalidImage(image))
                    }
                }
            }
            crate::AttachmentAspect::Depth => {
                Ok(TypeResolution::Value(Ti::Scalar(crate::Scalar::F32)))
            }
            crate::AttachmentAspect::Stencil => {
                Ok(TypeResolution::Value(Ti::Scalar(crate::Scalar::U32)))
            }
        }
    }
}
