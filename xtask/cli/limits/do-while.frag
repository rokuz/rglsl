#version 450
layout(location = 0) flat in int count;
layout(location = 0) out vec4 color;
void main()
{
    int i = 0;
    do {
        i++;
    } while (i < count);
    color = vec4(float(i));
}
