class MyCubeMap extends CGFobject{
    constructor(scene) {
		super(scene);
        //this.initBuffers();
        
        
        this.front = new MyQuad(this.scene);
        this.back = new MyQuad(this.scene);
        this.left = new MyQuad(this.scene);
        this.right = new MyQuad(this.scene);
        this.top = new MyQuad(this.scene);
        this.bottom = new MyQuad(this.scene);
        

        //this.face = new MyQuad(this.scene);

        this.backTexture = new CGFappearance(this.scene);
        this.backTexture.setAmbient(1,1,1,1);
        this.backTexture.loadTexture('images/split_cubemap/back.png');
        this.backTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.bottomTexture = new CGFappearance(this.scene);
        this.bottomTexture.setAmbient(1,1,1,1);
        this.bottomTexture.loadTexture('images/split_cubemap/bottom.png');
        this.bottomTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.frontTexture = new CGFappearance(this.scene);
        this.frontTexture.setAmbient(1,1,1,1);
        this.frontTexture.loadTexture('images/split_cubemap/front.png');
        this.frontTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.leftTexture = new CGFappearance(this.scene);
        this.leftTexture.setAmbient(1,1,1,1);
        this.leftTexture.loadTexture('images/split_cubemap/left.png');
        this.leftTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.rightTexture = new CGFappearance(this.scene);
        this.rightTexture.setAmbient(1,1,1,1);
        this.rightTexture.loadTexture('images/split_cubemap/right.png');
        this.rightTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.topTexture = new CGFappearance(this.scene);
        this.topTexture.setAmbient(1,1,1,1);
        this.topTexture.loadTexture('images/split_cubemap/top.png');
        this.topTexture.setTextureWrap('REPEAT', 'REPEAT');
    }
    
	initBuffers() {
		this.vertices = [];
		//Counter-clockwise reference of vertices
		this.indices = [];
		this.texCoords = [];
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
    display(){

        //BACK
        this.scene.pushMatrix();
        this.backTexture.apply();
        if(this.scene.filter){
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }
        else{
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        
        this.scene.translate(25,25,50);
        this.scene.scale(50, 50, 0);
        this.back.display();
        //this.face.display();
        this.scene.popMatrix();


        //LEFT
        this.scene.pushMatrix();
        this.leftTexture.apply();
        if(this.scene.filter){
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }
        else{
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        
        this.scene.translate(50,25,25);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(50, 50, 0);
        this.left.display();
        //this.face.display();
        this.scene.popMatrix();


        //FRONT
        this.scene.pushMatrix();
        this.frontTexture.apply();
        if(this.scene.filter){
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }
        else{
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        
        this.scene.translate(25,25,0);
        this.scene.rotate(-Math.PI, 0, 1, 0);
        this.scene.scale(50, 50, 0);
        this.front.display();
        //this.face.display();
        this.scene.popMatrix();


        //RIGHT
        this.scene.pushMatrix();
        this.rightTexture.apply();
        if(this.scene.filter){
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }
        else{
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        
        this.scene.translate(0,25,25);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);

        this.scene.scale(50, 50, 0);
        this.right.display();
        //this.face.display();
        this.scene.popMatrix();


        //BOTTOM
        this.scene.pushMatrix();
        this.bottomTexture.apply();
        if(this.scene.filter){
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }
        else{
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        
        this.scene.translate(25,0,25);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(50, 50, 0);
        this.bottom.display();
        //this.face.display();
        this.scene.popMatrix();


        //TOP
        this.scene.pushMatrix();
        this.topTexture.apply();
        if(this.scene.filter){
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }
        else{
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        this.scene.translate(25,50,25);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(50, 50, 0);
        this.top.display();
        //this.face.display();
        this.scene.popMatrix();
    }
}