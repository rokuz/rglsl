#version 450
layout(location = 0) in vec4 positions[3];
void emit(vec4 p);
void main()
{
    for (int i = 0; i < 3; ++i) {
        emit(positions[i]);
    }
    EndPrimitive();
}
