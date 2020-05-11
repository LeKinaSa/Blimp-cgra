attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {
    vec2 offsetTex = vec2(timeFactor/95.0, timeFactor/95.0);
    
    vec4 height_map = texture2D(uSampler2, fract(aTextureCoord + offsetTex));
    vec3 offsetCoords = vec3(0.0, 0.0, height_map.b/18.8);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offsetCoords, 1.0);
    
    vTextureCoord = aTextureCoord + offsetTex;
}
