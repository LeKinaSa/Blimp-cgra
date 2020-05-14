const SupplyStates = {
    INACTIVE : 0,
    FALLING : 1,
    LANDED : 2
};

class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);

        this.state = {
            INACTIVE: true,
            FALLING: false,
            LANDED: false
        };

        this.position = [0, 9, 0];
        
        this.previous_t = 0;

        this.box = new MyBox(scene);
        this.openBox = new MyBoxOpen(scene);
    }

    update(t) {
        let elapsedTime;

        if (this.previous_t === 0) {
            elapsedTime = 0;
        }    
        else{
            elapsedTime = t - this.previous_t;
        }

        this.previous_t = t;

        if (this.state.FALLING) {
            this.position[1] -= elapsedTime * (15 / 3000.0);
            
            if (this.position[1] <= -24.7) 
                this.land();
        }
    }

    drop(x, z) {
        this.state.INACTIVE = false;
        this.state.FALLING = true;

        this.position[0] = x;
        this.position[2] = z;
    }

    land() {
        this.position[1] = -24.7;

        this.state.FALLING = false;
        this.state.LANDED = true;
    }

    reset() {
        
        this.state.INACTIVE = true;
        this.state.FALLING = false;
        this.state.LANDED = false;

        this.position[1] = 9;
        this.previous_t = 0;
        
    }

    display() {
        if (!this.state.INACTIVE) {
            this.scene.pushMatrix();
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            
            if (this.state.FALLING) 
                this.box.display();
            else 
                this.openBox.display();
            
            this.scene.popMatrix();
        }
    }
}