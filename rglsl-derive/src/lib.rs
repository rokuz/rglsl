use proc_macro2::TokenStream;
use quote::{format_ident, quote};
use syn::ext::IdentExt as _;
use syn::spanned::Spanned as _;
use syn::{Data, DeriveInput, Fields, Ident, Member, Path, Type};

const KEYWORDS: [&str; 10] = [
    "true", "false", "Some", "None", "inf", "inff32", "inff64", "NaN", "NaNf32", "NaNf64",
];

#[proc_macro_derive(Rglo, attributes(rglo))]
pub fn derive(input: proc_macro::TokenStream) -> proc_macro::TokenStream {
    let input = syn::parse_macro_input!(input as DeriveInput);
    expand(&input)
        .unwrap_or_else(syn::Error::into_compile_error)
        .into()
}

#[derive(Default)]
struct Container {
    transparent: bool,
    flags: bool,
}

#[derive(Default)]
struct FieldAttributes {
    skip: bool,
    default: bool,
    skip_if: Option<Path>,
}

struct Field<'a> {
    member: Member,
    name: String,
    ty: &'a Type,
    attributes: FieldAttributes,
    binding: Ident,
}

#[derive(Clone, Copy, PartialEq, Eq)]
enum Style {
    Named,
    Positional,
}

enum First {
    Yes,
    No,
    Unknown,
}

fn container_attributes(input: &DeriveInput) -> syn::Result<Container> {
    let mut container = Container::default();
    for attribute in &input.attrs {
        if !attribute.path().is_ident("rglo") {
            continue;
        }
        attribute.parse_nested_meta(|meta| {
            if meta.path.is_ident("transparent") {
                container.transparent = true;
                Ok(())
            } else if meta.path.is_ident("flags") {
                container.flags = true;
                Ok(())
            } else {
                Err(meta.error("unknown rglo container attribute"))
            }
        })?;
    }
    Ok(container)
}

fn field_attributes(field: &syn::Field) -> syn::Result<FieldAttributes> {
    let mut attributes = FieldAttributes::default();
    for attribute in &field.attrs {
        if !attribute.path().is_ident("rglo") {
            continue;
        }
        attribute.parse_nested_meta(|meta| {
            if meta.path.is_ident("skip") {
                attributes.skip = true;
                Ok(())
            } else if meta.path.is_ident("default") {
                attributes.default = true;
                Ok(())
            } else if meta.path.is_ident("skip_if") {
                attributes.skip_if = Some(meta.value()?.parse()?);
                attributes.default = true;
                Ok(())
            } else {
                Err(meta.error("unknown rglo field attribute"))
            }
        })?;
    }
    Ok(attributes)
}

fn fields_of(fields: &Fields) -> syn::Result<(Style, Vec<Field<'_>>)> {
    let style = match *fields {
        Fields::Named(_) => Style::Named,
        Fields::Unnamed(_) | Fields::Unit => Style::Positional,
    };
    let mut collected = Vec::new();
    for (index, field) in fields.iter().enumerate() {
        let (member, name) = match field.ident {
            Some(ref ident) => (Member::Named(ident.clone()), ident.unraw().to_string()),
            None => (Member::Unnamed(syn::Index::from(index)), index.to_string()),
        };
        collected.push(Field {
            member,
            name,
            ty: &field.ty,
            attributes: field_attributes(field)?,
            binding: format_ident!("__field{}", index),
        });
    }
    Ok((style, collected))
}

fn identifier(name: &str) -> String {
    if KEYWORDS.contains(&name) {
        format!("r#{name}")
    } else {
        String::from(name)
    }
}

fn expand(input: &DeriveInput) -> syn::Result<TokenStream> {
    if !input.generics.params.is_empty() {
        return Err(syn::Error::new(
            input.generics.span(),
            "the rglo derive does not support generic types",
        ));
    }
    let container = container_attributes(input)?;
    let name = &input.ident;
    let owner = name.to_string();
    let body = if container.flags {
        flags(name, &owner)
    } else {
        match input.data {
            Data::Struct(ref data) => {
                let (style, fields) = fields_of(&data.fields)?;
                if container.transparent {
                    transparent(name, &fields, input)?
                } else if style == Style::Named {
                    structure(name, &owner, &fields)
                } else {
                    return Err(syn::Error::new(
                        input.span(),
                        "the rglo derive supports structs with named fields, \
                         #[rglo(transparent)] and #[rglo(flags)]",
                    ));
                }
            }
            Data::Enum(ref data) => enumeration(name, &owner, data)?,
            Data::Union(_) => {
                return Err(syn::Error::new(
                    input.span(),
                    "the rglo derive does not support unions",
                ));
            }
        }
    };
    Ok(quote! {
        const _: () = {
            use ::rglsl_types::rglo as __rglo;
            #body
        };
    })
}

fn flags(name: &Ident, owner: &str) -> TokenStream {
    quote! {
        impl __rglo::Encode for #name {
            fn encode<'a>(&'a self, out: &mut __rglo::Encoder<'a>) {
                __rglo::encode_flags(self, out);
            }
        }

        impl __rglo::Decode for #name {
            fn decode(
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<__rglo::Decoded<Self>, __rglo::Error> {
                __rglo::decode_flags(input, #owner)
            }
        }
    }
}

fn transparent(
    name: &Ident,
    fields: &[Field<'_>],
    input: &DeriveInput,
) -> syn::Result<TokenStream> {
    let mut kept = fields.iter().filter(|field| !field.attributes.skip);
    let (Some(field), None) = (kept.next(), kept.next()) else {
        return Err(syn::Error::new(
            input.span(),
            "#[rglo(transparent)] needs exactly one field that is not skipped",
        ));
    };
    let member = &field.member;
    let ty = field.ty;
    let skipped = fields
        .iter()
        .filter(|field| field.attributes.skip)
        .map(|field| &field.member);
    Ok(quote! {
        impl __rglo::Encode for #name {
            fn encode<'a>(&'a self, out: &mut __rglo::Encoder<'a>) {
                out.value(&self.#member);
            }
        }

        impl __rglo::Decode for #name {
            fn decode(
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<__rglo::Decoded<Self>, __rglo::Error> {
                __rglo::wrap::<#ty, #name>(
                    input,
                    |value| #name {
                        #member: value,
                        #(#skipped: ::core::default::Default::default(),)*
                    },
                    false,
                )
            }
        }
    })
}

fn kept<'f, 'a>(fields: &'f [Field<'a>]) -> Vec<&'f Field<'a>> {
    fields
        .iter()
        .filter(|field| !field.attributes.skip)
        .collect()
}

fn encode_fields(
    open: String,
    style: Style,
    fields: &[&Field<'_>],
    value_of: &dyn Fn(&Field<'_>) -> TokenStream,
) -> TokenStream {
    let mut states = Vec::with_capacity(fields.len());
    let mut state = First::Yes;
    for field in fields {
        let next = match (field.attributes.skip_if.is_some(), &state) {
            (false, _) | (true, First::No) => First::No,
            (true, First::Yes | First::Unknown) => First::Unknown,
        };
        states.push(state);
        state = next;
    }
    let reads: Vec<bool> = states
        .iter()
        .map(|state| matches!(*state, First::Unknown))
        .collect();
    let needs_runtime = reads.iter().any(|&read| read);
    let mut statements = Vec::new();
    if needs_runtime {
        statements.push(quote!(let mut first = true;));
    }
    let mut text = open;
    for (index, (field, state)) in fields.iter().zip(&states).enumerate() {
        let label = match style {
            Style::Named => format!("{}:", identifier(&field.name)),
            Style::Positional => String::new(),
        };
        let separated = format!(",{label}");
        let value = value_of(field);
        let later_reads = reads
            .get(index + 1..)
            .is_some_and(|rest| rest.contains(&true));
        let mark = if needs_runtime && later_reads {
            quote!(first = false;)
        } else {
            quote!()
        };
        match field.attributes.skip_if {
            None => {
                match *state {
                    First::Yes => text.push_str(&label),
                    First::No => text.push_str(&separated),
                    First::Unknown => {
                        flush(&mut text, &mut statements);
                        statements.push(quote! {
                            out.token(if first { #label } else { #separated });
                        });
                    }
                }
                flush(&mut text, &mut statements);
                statements.push(quote! {
                    out.value(#value);
                    #mark
                });
            }
            Some(ref skip_if) => {
                flush(&mut text, &mut statements);
                let token = match *state {
                    First::Yes => quote!(#label),
                    First::No => quote!(#separated),
                    First::Unknown => quote!(if first { #label } else { #separated }),
                };
                statements.push(quote! {
                    if !#skip_if(#value) {
                        out.token(#token);
                        out.value(#value);
                        #mark
                    }
                });
            }
        }
    }
    text.push(')');
    flush(&mut text, &mut statements);
    quote!(#(#statements)*)
}

fn flush(text: &mut String, statements: &mut Vec<TokenStream>) {
    if !text.is_empty() {
        statements.push(quote!(out.token(#text);));
        text.clear();
    }
}

struct RecordParts {
    items: TokenStream,
    new: TokenStream,
}

fn index_of<'n>(names: impl Iterator<Item = &'n str>) -> TokenStream {
    let arms = names
        .enumerate()
        .map(|(index, name)| quote!(#name => ::core::option::Option::Some(#index),));
    quote! {
        match name {
            #(#arms)*
            _ => ::core::option::Option::None,
        }
    }
}

fn record(
    record: &Ident,
    value: &Ident,
    owner: &str,
    style: Style,
    fields: &[Field<'_>],
    construct: &TokenStream,
) -> RecordParts {
    let kept = kept(fields);
    let slots: Vec<Ident> = kept.iter().map(|field| field.binding.clone()).collect();
    let types: Vec<&Type> = kept.iter().map(|field| field.ty).collect();
    let names: Vec<&str> = kept.iter().map(|field| field.name.as_str()).collect();
    let count = kept.len();
    let decoders = kept.iter().map(|field| {
        let slot = &field.binding;
        let name = &field.name;
        match style {
            Style::Named => quote! {
                |record: &mut #record, input: &mut __rglo::Input<'_>| {
                    __rglo::field(&mut record.#slot, input, #owner, #name)
                }
            },
            Style::Positional => quote! {
                |record: &mut #record, input: &mut __rglo::Input<'_>| {
                    __rglo::element(&mut record.#slot, input)
                }
            },
        }
    });
    let acceptors = kept.iter().map(|field| {
        let slot = &field.binding;
        quote! {
            |record: &mut #record, child: __rglo::Child, input: &mut __rglo::Input<'_>| {
                __rglo::fill(&mut record.#slot, child, input)
            }
        }
    });
    let step = match style {
        Style::Named => {
            let index = index_of(names.iter().copied());
            quote! {
                const FIELDS: &[&str] = &[#(#names),*];
                while input.next_element(&mut self.more, b')')? {
                    let name = input.field_name()?;
                    let index: ::core::option::Option<usize> = #index;
                    let Some((index, decode)) =
                        index.and_then(|index| Some((index, *Self::DECODERS.get(index)?)))
                    else {
                        return ::core::result::Result::Err(
                            input.unknown_field(#owner, name, FIELDS),
                        );
                    };
                    if let ::core::option::Option::Some(frame) = decode(self, input)? {
                        self.pending = index;
                        return ::core::result::Result::Ok(__rglo::Step::Push(frame));
                    }
                }
                ::core::result::Result::Ok(__rglo::Step::Done)
            }
        }
        Style::Positional => quote! {
            while input.next_element(&mut self.more, b')')? {
                let Some(decode) = Self::DECODERS.get(self.pending) else {
                    return ::core::result::Result::Err(input.length(#owner, #count));
                };
                self.pending += 1;
                if let ::core::option::Option::Some(frame) = decode(self, input)? {
                    return ::core::result::Result::Ok(__rglo::Step::Push(frame));
                }
            }
            ::core::result::Result::Ok(__rglo::Step::Done)
        },
    };
    let accepted = match style {
        Style::Named => quote!(self.pending),
        Style::Positional => quote!(self.pending.wrapping_sub(1)),
    };
    let values = fields.iter().map(|field| {
        let member = &field.member;
        if field.attributes.skip {
            return quote!(#member: ::core::default::Default::default(),);
        }
        let slot = &field.binding;
        if field.attributes.default {
            return quote!(#member: #slot.unwrap_or_default(),);
        }
        let missing = match style {
            Style::Named => {
                let name = &field.name;
                quote!(input.missing_field(#owner, #name))
            }
            Style::Positional => quote!(input.length(#owner, #count)),
        };
        quote! {
            #member: match #slot {
                ::core::option::Option::Some(value) => value,
                ::core::option::Option::None => return ::core::result::Result::Err(#missing),
            },
        }
    });
    let items = quote! {
        #[allow(non_camel_case_types)]
        struct #record {
            more: bool,
            pending: usize,
            #(#slots: ::core::option::Option<#types>,)*
        }

        impl #record {
            const DECODERS: &'static [__rglo::FieldDecoder<Self>] = &[#(#decoders),*];
            const ACCEPTORS: &'static [__rglo::FieldAcceptor<Self>] = &[#(#acceptors),*];
        }

        impl __rglo::Record for #record {
            type Value = #value;

            fn step(
                &mut self,
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<__rglo::Step, __rglo::Error> {
                #step
            }

            fn accept(
                &mut self,
                child: __rglo::Child,
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<(), __rglo::Error> {
                match Self::ACCEPTORS.get(#accepted) {
                    ::core::option::Option::Some(accept) => accept(self, child, input),
                    ::core::option::Option::None => {
                        ::core::result::Result::Err(input.error("a decoded value has no field"))
                    }
                }
            }

            fn value(
                self,
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<#value, __rglo::Error> {
                let #record { #(#slots,)* .. } = self;
                ::core::result::Result::Ok(#construct { #(#values)* })
            }
        }
    };
    RecordParts {
        items,
        new: quote! {
            #record {
                more: false,
                pending: 0,
                #(#slots: ::core::option::Option::None,)*
            }
        },
    }
}

fn structure(name: &Ident, owner: &str, fields: &[Field<'_>]) -> TokenStream {
    let kept_fields = kept(fields);
    let encode = encode_fields(String::from("("), Style::Named, &kept_fields, &|field| {
        let member = &field.member;
        quote!(&self.#member)
    });
    let record_name = format_ident!("__RgloRecord");
    let RecordParts { items, new } = record(
        &record_name,
        name,
        owner,
        Style::Named,
        fields,
        &quote!(#name),
    );
    quote! {
        impl __rglo::Encode for #name {
            fn encode<'a>(&'a self, out: &mut __rglo::Encoder<'a>) {
                #encode
            }
        }

        #items

        impl __rglo::Decode for #name {
            fn decode(
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<__rglo::Decoded<Self>, __rglo::Error> {
                input.expect(b'(')?;
                __rglo::start(#new, input)
            }
        }
    }
}

fn enumeration(name: &Ident, owner: &str, data: &syn::DataEnum) -> syn::Result<TokenStream> {
    let mut encode_arms = Vec::new();
    let mut decoders = Vec::new();
    let mut items = Vec::new();
    let mut variant_names = Vec::new();
    for (index, variant) in data.variants.iter().enumerate() {
        let ident = &variant.ident;
        let variant_name = ident.unraw().to_string();
        let written = identifier(&variant_name);
        let (style, fields) = fields_of(&variant.fields)?;
        let kept_fields = kept(&fields);
        let bindings = kept_fields.iter().map(|field| {
            let member = &field.member;
            let binding = &field.binding;
            quote!(#member: ref #binding)
        });
        let pattern = quote!(#name::#ident { #(#bindings,)* .. });
        let skipped: Vec<&Member> = fields
            .iter()
            .filter(|field| field.attributes.skip)
            .map(|field| &field.member)
            .collect();
        let qualified = format!("{owner}::{variant_name}");
        variant_names.push(variant_name);
        if kept_fields.is_empty() && (style == Style::Positional || variant.fields.is_empty()) {
            encode_arms.push(quote!(#pattern => out.token(#written),));
            decoders.push(quote! {
                |_: &mut __rglo::Input<'_>| {
                    ::core::result::Result::Ok(__rglo::Decoded::Value(
                        #name::#ident { #(#skipped: ::core::default::Default::default(),)* },
                    ))
                }
            });
            continue;
        }
        if let (Style::Positional, &[field]) = (style, kept_fields.as_slice()) {
            let binding = &field.binding;
            let member = &field.member;
            let ty = field.ty;
            let open = format!("{written}(");
            encode_arms.push(quote! {
                #pattern => {
                    out.token(#open);
                    out.value(#binding);
                    out.token(")");
                }
            });
            decoders.push(quote! {
                |input: &mut __rglo::Input<'_>| {
                    input.expect(b'(')?;
                    __rglo::wrap::<#ty, #name>(
                        input,
                        |value| #name::#ident {
                            #member: value,
                            #(#skipped: ::core::default::Default::default(),)*
                        },
                        true,
                    )
                }
            });
            continue;
        }
        let encode = encode_fields(format!("{written}("), style, &kept_fields, &|field| {
            let binding = &field.binding;
            quote!(#binding)
        });
        encode_arms.push(quote!(#pattern => { #encode }));
        let record_name = format_ident!("__RgloRecord{}", index);
        let RecordParts {
            items: record_items,
            new,
        } = record(
            &record_name,
            name,
            &qualified,
            style,
            &fields,
            &quote!(#name::#ident),
        );
        items.push(record_items);
        decoders.push(quote! {
            |input: &mut __rglo::Input<'_>| {
                input.expect(b'(')?;
                __rglo::start(#new, input)
            }
        });
    }
    let index = index_of(variant_names.iter().map(String::as_str));
    Ok(quote! {
        impl __rglo::Encode for #name {
            fn encode<'a>(&'a self, out: &mut __rglo::Encoder<'a>) {
                match *self {
                    #(#encode_arms)*
                }
            }
        }

        #(#items)*

        impl __rglo::Decode for #name {
            fn decode(
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<__rglo::Decoded<Self>, __rglo::Error> {
                const VARIANTS: &[&str] = &[#(#variant_names),*];
                const DECODERS: &[__rglo::VariantDecoder<#name>] = &[#(#decoders),*];
                let name = input.identifier()?;
                let index: ::core::option::Option<usize> = #index;
                match index.and_then(|index| DECODERS.get(index)) {
                    ::core::option::Option::Some(decode) => decode(input),
                    ::core::option::Option::None => ::core::result::Result::Err(
                        input.unknown_variant(#owner, name, VARIANTS),
                    ),
                }
            }
        }
    })
}
