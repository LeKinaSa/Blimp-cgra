class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initBuffers();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.positiveX = new MyQuad(this.scene);    // FRONT
        this.positiveY = new MyQuad(this.scene);    // TOP
        this.positiveZ = new MyQuad(this.scene);    // LEFT
        this.negativeX = new MyQuad(this.scene);    // BACK
        this.negativeY = new MyQuad(this.scene);    // BOTTOM
        this.negativeZ = new MyQuad(this.scene);    // RIGHT
    }

    initTextCoords() {
        this.positiveX.updateTexCoords([
            1.0/4.0, 2.0/3.0,
            2.0/4.0, 2.0/3.0,
            1.0/4.0, 1.0/3.0,
            2.0/4.0, 1.0/3.0
        ]);
        this.positiveY.updateTexCoords([
            1.0/4.0, 1.0/3.0,
            2.0/4.0, 1.0/3.0,
            1.0/4.0, 0.0/3.0,
            2.0/4.0, 0.0/3.0
        ]);
        this.positiveZ.updateTexCoords([
            0.0/4.0, 2.0/3.0,
            1.0/4.0, 2.0/3.0,
            0.0/4.0, 1.0/3.0,
            1.0/4.0, 1.0/3.0
        ]);
        this.negativeX.updateTexCoords([
            3.0/4.0, 2.0/3.0,
            4.0/4.0, 2.0/3.0,
            3.0/4.0, 1.0/3.0,
            4.0/4.0, 1.0/3.0
        ]);
        this.negativeY.updateTexCoords([
            1.0/4.0, 3.0/3.0,
            2.0/4.0, 3.0/3.0,
            1.0/4.0, 2.0/3.0,
            2.0/4.0, 2.0/3.0
        ]);
        this.negativeZ.updateTexCoords([
            3.0/4.0, 1.0/3.0,
            2.0/4.0, 1.0/3.0,
            3.0/4.0, 2.0/3.0,
            2.0/4.0, 2.0/3.0
        ]);
    }

    display() {
        // X + (FRONT)
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(1, 1, -1);
        this.positiveX.display();
        this.scene.popMatrix();
        
        // X - (BACK)
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.scale(1, 1, -1);
        this.negativeX.display();
        this.scene.popMatrix();
        
        // Y + (TOP)
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(1, 1, -1);
        this.positiveY.display();
        this.scene.popMatrix();
        
        // Y - (BOTTOM)
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(1, 1, -1);
        this.negativeY.display();
        this.scene.popMatrix();
        
        // Z + (LEFT)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.scale(1, 1, -1);
        this.positiveZ.display();
        this.scene.popMatrix();
        
        // Z - (RIGHT)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(1, 1, -1);
        this.negativeZ.display();
        this.scene.popMatrix();
    }
    
}

