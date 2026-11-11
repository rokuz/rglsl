#version 450
void clip(float alpha)
{
    if (alpha < 0.5) {
        discard;
    }
}
