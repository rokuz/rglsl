#version 450
layout(location = 0) out vec4 color;
void main()
{
    vec4 sum = vec4(0.0);
    for (int i = 0; i < 4; i += 1) {
        sum += vec4(1.0);
        i = 3;
    }
    color = sum;
}
