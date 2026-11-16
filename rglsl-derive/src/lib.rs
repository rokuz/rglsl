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
        let attributes = field_attributes(field)?;
        if style == Style::Positional && attributes.default {
            return Err(syn::Error::new(
                field.span(),
                "#[rglo(default)] and #[rglo(skip_if)] need a named field",
            ));
        }
        collected.push(Field {
            member,
            name,
            ty: &field.ty,
            attributes,
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
            fn encode(&self, out: &mut __rglo::Encoder) {
                __rglo::encode_flags(self, out);
            }
        }

        impl __rglo::Decode for #name {
            fn decode(
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<Self, __rglo::Error> {
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
    let skipped = fields
        .iter()
        .filter(|field| field.attributes.skip)
        .map(|field| &field.member);
    Ok(quote! {
        impl __rglo::Encode for #name {
            fn encode(&self, out: &mut __rglo::Encoder) {
                ::rglsl_types::stack::recurse(|| __rglo::Encode::encode(&self.#member, out));
            }
        }

        impl __rglo::Decode for #name {
            fn decode(
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<Self, __rglo::Error> {
                ::rglsl_types::stack::recurse(|| {
                    ::core::result::Result::Ok(#name {
                        #member: __rglo::Decode::decode(input)?,
                        #(#skipped: ::core::default::Default::default(),)*
                    })
                })
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
                    __rglo::Encode::encode(#value, out);
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
                        __rglo::Encode::encode(#value, out);
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

fn decode_named(owner: &str, fields: &[Field<'_>], construct: &TokenStream) -> TokenStream {
    let kept = kept(fields);
    let slots: Vec<&Ident> = kept.iter().map(|field| &field.binding).collect();
    let types: Vec<&Type> = kept.iter().map(|field| field.ty).collect();
    let names: Vec<&str> = kept.iter().map(|field| field.name.as_str()).collect();
    let values = fields.iter().map(|field| {
        let member = &field.member;
        let slot = &field.binding;
        let name = &field.name;
        if field.attributes.skip {
            quote!(#member: ::core::default::Default::default(),)
        } else if field.attributes.default {
            quote!(#member: #slot.unwrap_or_default(),)
        } else {
            quote! {
                #member: match #slot {
                    ::core::option::Option::Some(value) => value,
                    ::core::option::Option::None => {
                        return ::core::result::Result::Err(input.missing_field(#owner, #name));
                    }
                },
            }
        }
    });
    quote! {
        const FIELDS: &[&str] = &[#(#names),*];
        #(let mut #slots: ::core::option::Option<#types> = ::core::option::Option::None;)*
        let mut more = false;
        while input.next_element(&mut more, b')')? {
            let name = input.field_name()?;
            match name {
                #(#names => __rglo::field(&mut #slots, input, #owner, #names)?,)*
                _ => return ::core::result::Result::Err(input.unknown_field(#owner, name, FIELDS)),
            }
        }
        ::core::result::Result::Ok(#construct { #(#values)* })
    }
}

fn decode_positional(owner: &str, fields: &[Field<'_>], construct: &TokenStream) -> TokenStream {
    let count = kept(fields).len();
    let values = fields.iter().map(|field| {
        let member = &field.member;
        if field.attributes.skip {
            quote!(#member: ::core::default::Default::default(),)
        } else {
            quote!(#member: __rglo::element(input, &mut more, #owner, #count)?,)
        }
    });
    quote! {
        let mut more = false;
        let value = #construct { #(#values)* };
        __rglo::no_more_elements(input, &mut more, #owner, #count)?;
        ::core::result::Result::Ok(value)
    }
}

fn structure(name: &Ident, owner: &str, fields: &[Field<'_>]) -> TokenStream {
    let encode = encode_fields(String::from("("), Style::Named, &kept(fields), &|field| {
        let member = &field.member;
        quote!(&self.#member)
    });
    let decode = decode_named(owner, fields, &quote!(#name));
    quote! {
        impl __rglo::Encode for #name {
            fn encode(&self, out: &mut __rglo::Encoder) {
                ::rglsl_types::stack::recurse(|| {
                    #encode
                });
            }
        }

        impl __rglo::Decode for #name {
            fn decode(
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<Self, __rglo::Error> {
                ::rglsl_types::stack::recurse(|| {
                    input.expect(b'(')?;
                    #decode
                })
            }
        }
    }
}

fn enumeration(name: &Ident, owner: &str, data: &syn::DataEnum) -> syn::Result<TokenStream> {
    let mut encode_arms = Vec::new();
    let mut decode_arms = Vec::new();
    let mut decoders = Vec::new();
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
        let construct = quote!(#name::#ident);
        if kept_fields.is_empty() && (style == Style::Positional || variant.fields.is_empty()) {
            let skipped = fields.iter().map(|field| &field.member);
            encode_arms.push(quote!(#pattern => out.token(#written),));
            decode_arms.push(quote! {
                #variant_name => ::core::result::Result::Ok(
                    #construct { #(#skipped: ::core::default::Default::default(),)* },
                ),
            });
            variant_names.push(variant_name);
            continue;
        }
        let qualified = format!("{owner}::{variant_name}");
        let decode = if let (Style::Positional, &[field]) = (style, kept_fields.as_slice()) {
            let binding = &field.binding;
            let open = format!("{written}(");
            encode_arms.push(quote! {
                #pattern => {
                    out.token(#open);
                    __rglo::Encode::encode(#binding, out);
                    out.token(")");
                }
            });
            let values = fields.iter().map(|field| {
                let member = &field.member;
                if field.attributes.skip {
                    quote!(#member: ::core::default::Default::default(),)
                } else {
                    quote!(#member: __rglo::Decode::decode(input)?,)
                }
            });
            quote! {
                let value = #construct { #(#values)* };
                input.expect(b')')?;
                ::core::result::Result::Ok(value)
            }
        } else {
            let encode = encode_fields(format!("{written}("), style, &kept_fields, &|field| {
                let binding = &field.binding;
                quote!(#binding)
            });
            encode_arms.push(quote!(#pattern => { #encode }));
            match style {
                Style::Named => decode_named(&qualified, &fields, &construct),
                Style::Positional => decode_positional(&qualified, &fields, &construct),
            }
        };
        let decoder = format_ident!("__rglo_variant{}", index);
        decoders.push(quote! {
            fn #decoder(
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<#name, __rglo::Error> {
                input.expect(b'(')?;
                #decode
            }
        });
        decode_arms.push(quote!(#variant_name => #decoder(input),));
        variant_names.push(variant_name);
    }
    let encode = quote! {
        match *self {
            #(#encode_arms)*
        }
    };
    let decode = quote! {
        const VARIANTS: &[&str] = &[#(#variant_names),*];
        let name = input.identifier()?;
        match name {
            #(#decode_arms)*
            _ => ::core::result::Result::Err(input.unknown_variant(#owner, name, VARIANTS)),
        }
    };
    let (encode, decode) = if decoders.is_empty() {
        (encode, decode)
    } else {
        (
            quote!(::rglsl_types::stack::recurse(|| #encode);),
            quote!(::rglsl_types::stack::recurse(|| { #decode })),
        )
    };
    Ok(quote! {
        impl __rglo::Encode for #name {
            fn encode(&self, out: &mut __rglo::Encoder) {
                #encode
            }
        }

        impl __rglo::Decode for #name {
            fn decode(
                input: &mut __rglo::Input<'_>,
            ) -> ::core::result::Result<Self, __rglo::Error> {
                #(#decoders)*
                #decode
            }
        }
    })
}
