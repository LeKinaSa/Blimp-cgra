class MyWing extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.initBuffers();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.triangle1 = new MyTriangle(this.scene);
        this.triangle2 = new MyTriangle(this.scene);
        this.square1 = new MyQuad(this.scene);
        this.square2 = new MyQuad(this.scene);
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
        this.scene.translate(0, 0.5, 0);
        this.scene.scale(1, -1, 1);

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.5, 0);
        this.scene.scale(0.5, -0.5, 0.5);
        this.triangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.scale(0.5, 0.5, -0.5);
        this.triangle2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 0);
        this.square1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 0);
        this.scene.scale(-1, 1, 1);
        this.square2.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
