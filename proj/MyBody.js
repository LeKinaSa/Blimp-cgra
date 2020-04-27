class MyBody extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.initBuffers();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.cilinder = new MyCilinder(this.scene, 4);
        this.front = new MySphere(this.scene, 4, 4);
        this.back = new MySphere(this.scene, 4, 4);
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
        this.cilinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.front.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.back.display();
        this.scene.popMatrix();
    }
}
