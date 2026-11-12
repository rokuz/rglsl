#version 450
layout(location = 0) flat in int count;
layout(location = 0) out vec4 color;
void main()
{
    vec4 sum = vec4(0.0);
    for (int i = 0; i < count; i++) {
        sum += vec4(1.0);
    }
    color = sum;
}
