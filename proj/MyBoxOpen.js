class MyBoxOpen extends CGFobject {
    constructor(scene) {
        super(scene);

        this.sphere = new MySphere(scene, 16, 16);
        this.quad   = new MyQuad(scene);

        this.initMaterials();
    }

    initMaterials() {
        this.orangeTexture = new CGFappearance(this.scene);
        this.orangeTexture.setAmbient (204/255, 204/255, 204/255, 1.0);
        this.orangeTexture.setDiffuse (100/255, 100/255, 100/255, 1.0);
        this.orangeTexture.setSpecular(255/255, 255/255, 255/255, 1.0);
        this.orangeTexture.setShininess(10.0);
        this.orangeTexture.loadTexture('images/supplyOrange.jpg');
        this.orangeTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.box = new CGFappearance(this.scene);
        this.box.setAmbient (204/255, 204/255, 204/255, 1.0);
        this.box.setDiffuse (100/255, 100/255, 100/255, 1.0);
        this.box.setSpecular(255/255, 255/255, 255/255, 1.0);
        this.box.setShininess(10.0);
        this.box.loadTexture('images/openBox.jpg');
        this.box.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.box.apply();
        
        // Bottom
        this.scene.pushMatrix(); 
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Left
        this.scene.pushMatrix(); 
        this.scene.translate(-1, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Right
        this.scene.pushMatrix(); 
        this.scene.translate(1, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Front
        this.scene.pushMatrix(); 
        this.scene.translate(0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix(); 
        this.scene.translate(0, 0, -1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.orangeTexture.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.25, 0.25, 0);
        this.scene.scale(0.25, 0.25, 0.25);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1, 0.2, 0.3);
        this.scene.scale(0.2, 0.2, 0.2);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1, 0.2, -0.3);
        this.scene.scale(0.2, 0.2, 0.2);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.35, 0.15, 0);
        this.scene.scale(0.15, 0.15, 0.15);
        this.sphere.display();
        this.scene.popMatrix();
    }
}