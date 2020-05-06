class MyHelice extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.initBuffers();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.rightUp   = new MyHeliceQuarter(this.scene);
        this.rightDown = new MyHeliceQuarter(this.scene);
        this.leftUp    = new MyHeliceQuarter(this.scene);
        this.leftDown  = new MyHeliceQuarter(this.scene);
    }
    
    initTextCoords() {
        this.texCoords = [];
    }

    updateTextCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
    }

    display() {
        this.rightUp.display();

        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.leftUp.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, -1, 1);
        this.rightDown.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1, -1, 1);
        this.leftDown.display();
        this.scene.popMatrix();
    }
}
