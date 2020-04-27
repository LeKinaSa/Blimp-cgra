class MyWing extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.initBuffers();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.triangle1 = new MyTriangle(this.scene);
        this.triangle2 = new MyTriangle(this.scene);
    }
    
    initTextCoords() {
        this.texCoords = [];
    }

    updateTextCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 0);
        this.scene.scale(1, -1, 1);
        this.triangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 1, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.scale(1, 1, -1);
        this.triangle2.display();
        this.scene.popMatrix();
    }
}
