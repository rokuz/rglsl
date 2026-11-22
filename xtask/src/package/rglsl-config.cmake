get_filename_component(_rglsl_prefix "${CMAKE_CURRENT_LIST_DIR}/../../.." ABSOLUTE)

if(NOT TARGET rglsl::rglsl_c)
    add_library(rglsl::rglsl_c SHARED IMPORTED)
    set_target_properties(rglsl::rglsl_c PROPERTIES
        INTERFACE_INCLUDE_DIRECTORIES "@INCLUDE_DIR@"
        IMPORTED_LOCATION "@SHARED@"
        @SHARED_PROPERTY@)
endif()

if(NOT TARGET rglsl::rglsl_c_static)
    add_library(rglsl::rglsl_c_static STATIC IMPORTED)
    set_target_properties(rglsl::rglsl_c_static PROPERTIES
        INTERFACE_INCLUDE_DIRECTORIES "@INCLUDE_DIR@"
        IMPORTED_LOCATION "@STATIC@"
        INTERFACE_LINK_LIBRARIES "@NATIVE_LIBS@")
endif()

unset(_rglsl_prefix)
