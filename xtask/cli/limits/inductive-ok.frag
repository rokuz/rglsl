#version 450
layout(location = 0) out vec4 color;
layout(binding = 0) uniform Block { vec4 weights[4]; };
void main()
{
    vec4 sum = vec4(0.0);
    for (int i = 0; i < 4; i++) {
        sum += weights[i];
    }
    for (float x = 3.0; x >= 0.0; x -= 1.0) {
        sum += vec4(x);
    }
    color = sum;
}
