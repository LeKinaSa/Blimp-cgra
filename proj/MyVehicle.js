class MyVehicle extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.position = [0, 0, 0];
        this.velocity = 0;
        this.angle = 0;
        
        this.initBuffers();
        this.initMaterials();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.pyramid  = new MyPyramid(this.scene, 8, 4);
    }
    
    initMaterials() {
        // Orange Material
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient (204/255, 124/255, 0/255, 1.0);
        this.material.setDiffuse (  1/255,   1/255, 0/255, 1.0);
        this.material.setSpecular(255/255, 155/255, 0/255, 1.0);
        this.material.setShininess(10.0);
    }
    
    initTextCoords() {
        
    }

    enableNormalViz() {
        this.pyramid.enableNormalViz();
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply();

        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.angle, 0, 1, 0);

        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.pyramid.display();
        this.scene.popMatrix();
    }

    update() {
        this.position[0] = this.position[0] + this.velocity * (-Math.sin(this.angle));  // X
        this.position[1] = this.position[1];                                            // Y
        this.position[2] = this.position[2] + this.velocity * Math.cos(this.angle);     // Z
    }

    turn(val) {
        this.angle = this.angle + val;
    }

    accelerate(val) {
        this.velocity = this.velocity + this.scene.speedFactor * val;
    }

    reset() {
        this.position = [0, 0, 0];
        this.velocity = 0;
        this.angle = 0;
    }
}