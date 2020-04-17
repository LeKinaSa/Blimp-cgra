class MyVehicle extends CGFobject {
	constructor(scene) {
		super(scene);
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
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.pyramid.display();
        this.scene.popMatrix();
    }
}