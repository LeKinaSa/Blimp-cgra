/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.speedFactor = 1;
        this.scaleFactor = 1;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);

        this.cilinder = new MyCilinder(this, 40);
        this.cubeMap = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);


        //------ Applied Material
        
        this.sphereTexture = new CGFappearance(this);
        this.sphereTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.sphereTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sphereTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.sphereTexture.setShininess(10.0);
        this.sphereTexture.loadTexture('images/earth.jpg');
        this.sphereTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.cilinderMaterial = new CGFappearance(this);
        this.cilinderMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.cilinderMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cilinderMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.cilinderMaterial.setShininess(10.0);
        this.cilinderMaterial.loadTexture('images/earth.jpg');
        this.cilinderMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        this.cubeMaterial = new CGFappearance(this);
        this.cubeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeMaterial.setShininess(10.0);
        this.cubeMaterial.loadTexture('images/cubeMap1.png');
        this.cubeMaterial.setTextureWrap('REPEAT', 'REPEAT');


        this.cubeTexture1 = new CGFtexture(this, 'images/cubeMap1.png');
        this.cubeTexture2 = new CGFtexture(this, 'images/cubeMap2.png');
        this.cubeTexture3 = new CGFtexture(this, 'images/cubeMap3.png');

        

        this.cubeTextures = [this.cubeTexture1, this.cubeTexture2, this.cubeTexture3];
        this.cubeMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.cubeTextureIds = { 'Textura1': 0, 'Textura2': 1, 'Textura3': 2 };
        this.selectedTexture = 0;
        
        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displayCilinder = false;
        this.displaySphere = false;
        this.displayCubeMap = true;
        this.displayVehicle = true;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(75, 75, 75), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
    }

    updateAppliedTexture() {
        this.cubeMaterial.setTexture(this.cubeTextures[this.selectedTexture]);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section


        if(this.displaySphere) {
            this.sphereTexture.apply();
            this.sphere.display();
        }

        if(this.displayCubeMap) {
            this.cubeMaterial.apply();
            this.pushMatrix();
            this.scale(50, 50, 50);
            this.cubeMap.display();
            this.popMatrix();
        }

        if(this.displayVehicle) {
            this.pushMatrix();
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.vehicle.display();
            this.popMatrix();
        }


        if(this.displayCilinder){
            this.cilinderMaterial.apply();
            this.cilinder.display();
        }
        

        // ---- END Primitive drawing section
    }
}