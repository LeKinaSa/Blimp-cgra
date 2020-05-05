class MyVehicle extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.position = [0, 10, 0];
        this.velocity = 0;
        this.angle = 0;
        
        this.initBuffers();
        this.initMaterials();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.wingTop   = new MyWing(this.scene);
        this.wingBot   = new MyWing(this.scene);
        this.wingLeft  = new MyWing(this.scene);
        this.wingRight = new MyWing(this.scene);
        this.body      = new MyBody(this.scene);
        this.cabin     = new MyBody(this.scene);
    }
    
    initMaterials() {
        // Blue
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient (10/255, 10/255, 204/255, 1.0);
        this.material.setDiffuse ( 0/255,  0/255, 100/255, 1.0);
        this.material.setSpecular( 0/255,  0/255, 255/255, 1.0);
        this.material.setShininess(10.0);
    }
    
    initTextCoords() {
        
    }

    display() {
        this.scene.pushMatrix(); // 1
        this.material.apply();
        
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.rotate(this.angle, 0, 1, 0);
        
        this.scene.pushMatrix(); // 2

        this.scene.pushMatrix();
        this.scene.translate(0, 0.6, -1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.wingTop.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.6, -1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(1, -1, 1);
        this.scene.scale(0.5, 0.5, 1);
        this.wingBot.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.6, 0, -1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(1, -1, 1);
        this.scene.scale(0.5, 0.5, 1);
        this.wingLeft.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.6, 0, -1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.wingRight.display();
        this.scene.popMatrix();

        this.scene.popMatrix(); // 2
        
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.6, 0.2);
        this.scene.scale(0.2, 0.2, 0.4);
        this.cabin.display();
        this.scene.popMatrix();

        this.scene.popMatrix(); // 1
    }

    update() {
        console.log("update position");
        this.position[0] = this.position[0] + this.velocity * (-Math.sin(-this.angle));  // X
        this.position[1] = this.position[1];                                            // Y
        this.position[2] = this.position[2] + this.velocity * Math.cos(-this.angle);     // Z
    }

    turn(val) {
        this.angle = this.angle + val;
    }

    accelerate(val) {
        this.velocity = this.velocity + this.scene.speedFactor * val;
    }

    reset() {
        this.position = [0, 10, 0];
        this.velocity = 0;
        this.angle = 0;
    }
}