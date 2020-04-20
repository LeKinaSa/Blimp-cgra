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

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);

        this.cilinder = new MyCilinder(this, 40);
        this.cubeMap = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);


        //------ Applied Material
        this.cilinderMaterial = new CGFappearance(this);
        this.cilinderMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.cilinderMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cilinderMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.cilinderMaterial.setShininess(10.0);
        this.cilinderMaterial.loadTexture('images/earth.jpg');
        this.cilinderMaterial.setTextureWrap('REPEAT', 'REPEAT');
        /*
        this.cubeMapMaterial2 = new CGFappearance(this);
        this.cubeMapMaterial2 = new CGFappearance(this.scene);
        this.cubeMapMaterial2.setAmbient(1,1,1,1);
        this.cubeMapMaterial2.loadTexture('images/cubeMap2.png');
        this.cubeMapMaterial2.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeMapMaterial3 = new CGFappearance(this);
        this.cubeMapMaterial3 = new CGFappearance(this.scene);
        this.cubeMapMaterial3.setAmbient(1,1,1,1);
        this.cubeMapMaterial3.loadTexture('images/cubeMap3.png');
        this.cubeMapMaterial3.setTextureWrap('REPEAT', 'REPEAT');
        */

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCilinder = false;
        this.displaySphere = false;
        this.displayCubeMap1 = false;
        //this.displayCubeMap2 = false;
        //this.displayCubeMap3 = false;
        this.displayVehicle = false;

        this.sphereTexture = new CGFappearance(this);
        this.sphereTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.sphereTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sphereTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.sphereTexture.setShininess(10.0);
        this.sphereTexture.loadTexture('images/earth.jpg');
        this.sphereTexture.setTextureWrap('REPEAT', 'REPEAT')
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


        if(this.displaySphere){
            this.sphereTexture.apply();
            this.sphere.display();
        }


        if(this.displayCubeMap1){
            this.cubeMap.display();
        }
/*
        if(this.cubeMapMateria2){
            this.cubeMap.top.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMap.bottom.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMap.back.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMap.front.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMap.left.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMap.right.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMapMaterial2.apply();
            this.cubeMap.display();
        }

        if(this.cubeMapMateria3){
            this.cubeMap.top.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMap.bottom.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMap.back.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMap.front.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMap.left.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMap.right.updateTexCoords([1.00, 0.00, 0.50, 0.50, 1.00, 1.00]);
            this.cubeMapMaterial3.apply();
            this.cubeMap.display();
        }
*/
        if(this.displayVehicle){
            this.vehicle.display();
        }


        if(this.displayCilinder){
            this.cilinderMaterial.apply();
            this.cilinder.display();
        }
        

        // ---- END Primitive drawing section
    }
}