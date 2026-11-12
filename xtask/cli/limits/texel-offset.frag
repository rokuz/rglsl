#version 450
layout(binding = 0) uniform sampler2D image;
layout(location = 0) out vec4 color;
void main()
{
    color = textureOffset(image, vec2(0.5), ivec2(15, -16));
}
