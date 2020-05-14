
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float speed;
uniform float timeFactor;

varying vec2 vTextureCoord;

uniform float normScale;

void main() {
    vec2 offsetTex = vec2(speed * timeFactor / 190.0, 0);
    vTextureCoord = aTextureCoord + offsetTex;
    vec3 offsetCoords = vec3(0, 0,
        (fract(vTextureCoord[0] * 10.0) / 10.0) * (speed / (speed + 0.5)) * sin(timeFactor));
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offsetCoords, 1.0);
}
