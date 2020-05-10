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
        this.scaleFactor = 6; //TODO 1

        //Initialize scene objects
        this.axis = new CGFaxis(this);
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
        this.cubeMaterial.setAmbient(1, 1, 1, 1);
        this.cubeMaterial.setDiffuse(0, 0, 0, 1);
        this.cubeMaterial.setSpecular(0, 0, 0, 1);
        this.cubeMaterial.setShininess(10.0);
        this.cubeMaterial.setEmission(0.9, 0.9, 0.9, 1);
        this.cubeMaterial.loadTexture('images/cubeMap1.png');
        this.cubeMaterial.setTextureWrap('REPEAT', 'REPEAT');


        this.cubeTexture1 = new CGFtexture(this, 'images/cubeMap1.png');
        this.cubeTexture2 = new CGFtexture(this, 'images/cubeMap2.png');
        this.cubeTexture3 = new CGFtexture(this, 'images/cubeMap3.png');

        

        this.cubeTextures = [this.cubeTexture1, this.cubeTexture2, this.cubeTexture3];
        this.cubeMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.cubeTextureIds = { 'Textura1': 0, 'Textura2': 1, 'Textura3': 2 };
        this.selectedTexture = 0;
        this.directions = {'None': 0, 'Right': 1, 'Left': 2 };
        this.direction = this.directions['None'];
        
        //Objects connected to MyInterface
        this.displayAxis = false;
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
    update(t) {
        this.checkKeys(t);
        this.vehicle.update();
    }

    checkKeys(t) {
        var text = "Keys Pressed: ";
        var keysPressed = false;
        if (!this.vehicle.autopilot) {
            this.direction = this.directions['None'];
        }
        
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.vehicle.accelerate(0.01);
            text += "W ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.vehicle.accelerate(-0.01);
            text += "S ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyA")) {
            this.vehicle.turn(-0.05);
            this.direction = this.directions['Left'];
            text += "A ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyD")) {
            this.vehicle.turn(0.05);
            this.direction = this.directions['Right'];
            text += "D ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.vehicle.reset();
            text += "R ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyP")) {
            this.vehicle.startAutoPilot(t);
            text += "P ";
            keysPressed = true;
        }

        if (keysPressed) {
            console.log(text);
        }
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

        if(this.displayCubeMap) {
            this.cubeMaterial.apply();
            this.pushMatrix();
            this.scale(50, 50, 50);
            this.cubeMap.display();
            this.popMatrix();
        }

        if(this.displayVehicle) {
            this.pushMatrix();
            this.vehicle.display();
            this.popMatrix();
        }

        // ---- END Primitive drawing section
    }
}