class MyBody extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.initBuffers();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.cilinder = new MyCilinder(this.scene,   16);
        this.front    = new MySphere(this.scene, 16, 16);
        this.back     = new MySphere(this.scene, 16, 16);
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

        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, -0.5, 0);
        
        this.cilinder.display();
        this.front.display();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.back.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
