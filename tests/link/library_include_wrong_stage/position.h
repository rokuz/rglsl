vec4 scale(vec4 v)
{
    return v * 0.5;
}
vec4 position()
{
    return scale(gl_FragCoord);
}
