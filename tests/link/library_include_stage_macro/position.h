#ifdef GL_VERTEX_SHADER
#define VALUE undefined_in_vertex
#else
#define VALUE 1.0
#endif
vec4 position()
{
    return vec4(VALUE);
}
