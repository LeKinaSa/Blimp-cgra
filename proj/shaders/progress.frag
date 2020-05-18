#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying float limit;

void main() {
	if (fract(coords.x - 0.5) < limit) { // fract(coords.x) < limit
        gl_FragColor = vec4(1.0 - fract(coords.x + 0.5), fract(coords.x + 0.5), 0.0, 1.0);
    }
    else {
        gl_FragColor = vec4(0.2, 0.2, 0.2, 1.0);
    }
}
