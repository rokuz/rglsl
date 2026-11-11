#version 450
layout(location = 0) in vec4 position;
void clip(float alpha);
void main()
{
    clip(position.w);
    gl_Position = position;
}
