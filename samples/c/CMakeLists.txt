cmake_minimum_required(VERSION 3.21)
project(rglsl_c_samples LANGUAGES C CXX)
enable_testing()

set(RGLSL_SAMPLES_SANITIZE "" CACHE STRING "comma-separated sanitizers, for example address,undefined")
set(RGLSL_SAMPLES_LAUNCHER "" CACHE STRING "command that runs each sample, for example leaks;--atExit;--")
set(RGLSL_SAMPLES_SPIRV_VAL "" CACHE FILEPATH "spirv-val that validates the SPIR-V the samples write")
option(RGLSL_SAMPLES_WARNINGS_AS_ERRORS "treat compiler warnings as errors" OFF)

find_package(rglsl 0.1 CONFIG REQUIRED)

add_executable(compile-and-link main.c)
set_target_properties(compile-and-link PROPERTIES C_STANDARD 99 C_STANDARD_REQUIRED ON C_EXTENSIONS OFF)
target_link_libraries(compile-and-link PRIVATE rglsl::rglsl_c)

add_executable(compile-and-link-cpp main.cpp)
set_target_properties(compile-and-link-cpp PROPERTIES CXX_STANDARD 17 CXX_STANDARD_REQUIRED ON CXX_EXTENSIONS OFF)
target_link_libraries(compile-and-link-cpp PRIVATE rglsl::rglsl_c_static)

foreach(sample IN ITEMS compile-and-link compile-and-link-cpp)
    if(NOT MSVC)
        target_compile_options(${sample} PRIVATE -Wall -Wextra -pedantic)
        if(RGLSL_SAMPLES_WARNINGS_AS_ERRORS)
            target_compile_options(${sample} PRIVATE -Werror)
        endif()
    endif()
    if(RGLSL_SAMPLES_SANITIZE)
        target_compile_options(${sample} PRIVATE -fsanitize=${RGLSL_SAMPLES_SANITIZE} -fno-omit-frame-pointer -g)
        target_link_options(${sample} PRIVATE -fsanitize=${RGLSL_SAMPLES_SANITIZE})
    endif()
    add_test(NAME ${sample} COMMAND ${RGLSL_SAMPLES_LAUNCHER} $<TARGET_FILE:${sample}> ${CMAKE_CURRENT_BINARY_DIR})
    set_tests_properties(${sample} PROPERTIES FIXTURES_SETUP spirv)
endforeach()

if(WIN32)
    add_custom_command(TARGET compile-and-link POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different
            $<TARGET_RUNTIME_DLLS:compile-and-link> $<TARGET_FILE_DIR:compile-and-link>
        COMMAND_EXPAND_LISTS)
endif()

if(RGLSL_SAMPLES_SPIRV_VAL)
    add_test(NAME spirv-val
        COMMAND ${CMAKE_COMMAND} -DSPIRV_VAL=${RGLSL_SAMPLES_SPIRV_VAL} -DDIRECTORY=${CMAKE_CURRENT_BINARY_DIR}
            -P ${CMAKE_CURRENT_SOURCE_DIR}/spirv-val.cmake)
    set_tests_properties(spirv-val PROPERTIES FIXTURES_REQUIRED spirv)
endif()
