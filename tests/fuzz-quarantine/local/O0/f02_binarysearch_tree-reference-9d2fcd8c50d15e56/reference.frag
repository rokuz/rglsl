#version 450

precision highp float;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

struct BST {
    int data;
    int leftIndex;
    int rightIndex;
};

BST tree[10];

void makeTreeNode(inout BST tree, int data) {
    tree.data = data;
    tree.leftIndex = -1;
    tree.rightIndex = -1;
}

void insert(int treeIndex, int data) {
    int baseIndex = 0;
    while (baseIndex <= treeIndex) {
        if (data <= tree[baseIndex].data) {
            if (tree[baseIndex].leftIndex == -1) {
                tree[baseIndex].leftIndex = treeIndex;
                makeTreeNode(tree[treeIndex], data);
                return;
            } else {
                baseIndex = tree[baseIndex].leftIndex;
                continue;
            }
        } else {
            if (tree[baseIndex].rightIndex == -1) {
                tree[baseIndex].rightIndex = treeIndex;
                makeTreeNode(tree[treeIndex], data);
                return;
            } else {
                baseIndex = tree[baseIndex].rightIndex;
                continue;
            }
        }
    }
}

int search(int target) {
    BST currentNode;
    int index = 0;
    while (index != -1) {
        currentNode = tree[index];
        if (currentNode.data == target) {
            return target;
        }
        index = target > currentNode.data ? currentNode.rightIndex : currentNode.leftIndex;
    }
    return -1;
}

vec3 hueColor(float angle) {
    float nodeData = float(search(15));
    vec3 color;
    color = clamp(fract(angle * vec3(1.0, 5.0, nodeData)), 0.0, 1.0);
    color.x *= cosh(isnan(float(search(30))) ? 0.0 : 1.0);
    return color;
}

float makeFrame(float v) {
    v *= 6.5;
    if (v < 1.5) {
        return float(search(100));
    }
    if (v < 4.0) {
        return 0.0;
    }
    if (v < float(search(6))) {
        return 1.0;
    }
    return 10.0 + float(search(30));
}

void main() {
    int treeIndex = 0;
    makeTreeNode(tree[0], 9);
    treeIndex++;
    insert(treeIndex, 5);
    treeIndex++;
    insert(treeIndex, 12);
    treeIndex++;
    insert(treeIndex, 15);
    treeIndex++;
    insert(treeIndex, 7);
    treeIndex++;
    insert(treeIndex, 8);
    treeIndex++;
    insert(treeIndex, 2);
    treeIndex++;
    insert(treeIndex, 6);
    treeIndex++;
    insert(treeIndex, 17);
    treeIndex++;
    insert(treeIndex, 13);
    vec2 z = (gl_FragCoord.yx / resolution);
    float x = makeFrame(z.x);
    float y = makeFrame(z.y);
    int sum = -100;
    for (int target = 0; target < 20; target++) {
        int result = search(target);
        if (result > 0) {
            sum += result;
        } else {
            switch (result) {
                case -1:
                    sum += 1;
                    break;
                case 0:
                    return;
            }
        }
    }
    float a = tan(x + y * float(sum));
    _GLF_color = vec4(hueColor(a), 1.);
}
