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
        this.wingTop     = new MyWing  (this.scene);
        this.wingBot     = new MyWing  (this.scene);
        this.wingLeft    = new MyWing  (this.scene);
        this.wingRight   = new MyWing  (this.scene);
        this.body        = new MySphere(this.scene, 16, 16);
        this.cabin       = new MyBody  (this.scene);
        this.motorLeft   = new MyBody  (this.scene);
        this.motorRight  = new MyBody  (this.scene);
        this.heliceLeft  = new MyHelice(this.scene);
        this.heliceRight = new MyHelice(this.scene);
        this.centerRight = new MySphere(this.scene, 16, 16);
        this.centerLeft  = new MySphere(this.scene, 16, 16);
        this.heliceAngle = 0;
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
        //this.scene.scale(10, 10, 10);
        this.scene.pushMatrix(); // 1
        this.material.apply();
        
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.rotate(this.angle, 0, 1, 0);
        
        this.scene.pushMatrix(); // 2

        // Wing Top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.45, -0.7);
        if (this.scene.direction == this.scene.directions['Right']) {
            // Rudders go Left -> Wing go Left
            this.scene.rotate(-Math.PI/6, 0, 0, 1);
        }
        else if (this.scene.direction == this.scene.directions['Left']) {
            // Rudders go Right -> Wing go Right
            this.scene.rotate(Math.PI/6, 0, 0, 1);
        }
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.4, 0.4, 1);
        this.wingTop.display();
        this.scene.popMatrix();

        // Wing Bot
        this.scene.pushMatrix();
        this.scene.translate(0, -0.45, -0.7);
        if (this.scene.direction == this.scene.directions['Right']) {
            // Rudders go Left -> Wing go Left
            this.scene.rotate(Math.PI/6, 0, 0, 1);
        }
        else if (this.scene.direction == this.scene.directions['Left']) {
            // Rudders go Right -> Wing go Right
            this.scene.rotate(-Math.PI/6, 0, 0, 1);
        }
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(1, -1, 1);
        this.scene.scale(0.4, 0.4, 1);
        this.wingBot.display();
        this.scene.popMatrix();

        this.scene.popMatrix(); // 2

        // Wing Left
        this.scene.pushMatrix();
        this.scene.translate(-0.45, 0, -0.7);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(1, -1, 1);
        this.scene.scale(0.4, 0.4, 1);
        this.wingLeft.display();
        this.scene.popMatrix();

        // Wing Right
        this.scene.pushMatrix();
        this.scene.translate(0.45, 0, -0.7);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 1);
        this.wingRight.display();
        this.scene.popMatrix();
        
        // Body
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.body.display();
        this.scene.popMatrix();

        // Cabin
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0.2);
        this.scene.scale(0.2, 0.2, 0.3);
        this.cabin.display();
        this.scene.popMatrix();

        // Motor Right
        this.scene.pushMatrix();
        this.scene.translate(0.15, -0.55, -0.15);
        this.scene.scale(0.07, 0.07, 0.08);
        this.motorRight.display();
        this.scene.popMatrix();

        // Motor Left
        this.scene.pushMatrix();
        this.scene.translate(-0.15, -0.55, -0.15);
        this.scene.scale(0.07, 0.07, 0.08);
        this.motorLeft.display();
        this.scene.popMatrix();

        // Helice Right
        this.scene.pushMatrix();
        this.scene.translate(0.15, -0.55, -0.28);
        this.scene.scale(0.15, 0.125, 0.125);
        this.scene.rotate(this.heliceAngle, 0, 0, 1);
        this.heliceRight.display();
        this.scene.popMatrix();

        // Helice Left
        this.scene.pushMatrix();
        this.scene.translate(-0.15, -0.55, -0.28);
        this.scene.scale(0.15, 0.125, 0.125);
        this.scene.rotate(this.heliceAngle, 0, 0, 1);
        this.heliceLeft.display();
        this.scene.popMatrix();

        // Helice Center Right
        this.scene.pushMatrix();
        this.scene.translate(0.15, -0.55, -0.28);
        this.scene.scale(0.02, 0.02, 0.02);
        this.centerRight.display();
        this.scene.popMatrix();

        // Helice Center Left
        this.scene.pushMatrix();
        this.scene.translate(-0.15, -0.55, -0.28);
        this.scene.scale(0.02, 0.02, 0.02);
        this.centerLeft.display();
        this.scene.popMatrix();

        this.scene.popMatrix(); // 1
    }

    update() {
        this.position[0] = this.position[0] + this.velocity * (-Math.sin(-this.angle));     // X
        this.position[1] = this.position[1];                                                // Y
        this.position[2] = this.position[2] + this.velocity * Math.cos(-this.angle);        // Z
        this.heliceAngle = this.heliceAngle + 1.5 * this.velocity;
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