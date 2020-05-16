const SupplyStates = {
    INACTIVE : 0,
    FALLING : 1,
    LANDED : 2
};

class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);

        this.state = SupplyStates.INACTIVE;

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
        else {
            elapsedTime = t - this.previous_t;
        }

        this.previous_t = t;

        if (this.state == SupplyStates.FALLING) {
            this.position[1] -= elapsedTime * (15 / 3000.0);
            
            if (this.position[1] <= this.floorLevel) 
                this.land();
        }
    }

    drop(dropPosition) {
        if (this.state == SupplyStates.INACTIVE) {
            this.state = SupplyStates.FALLING;
            this.position[0] = dropPosition[0];
            this.position[1] = dropPosition[1];
            this.position[2] = dropPosition[2];
        }
    }

    land() {
        if ((this.state == SupplyStates.FALLING) && (this.position[1] <= floorLevel)) {
            this.state = SupplyStates.LANDED;
        }
    }

    reset() {
        this.state = SupplyStates.INACTIVE;
        this.previous_t = 0;
    }

    display() {
        this.scene.pushMatrix();
        switch (this.state) {
            case INACTIVE:
                break;
            case FALLING:
                this.box.display();
                break;
            case LANDED:
                this.openBox.display();
                break;
            default:
                break;
        }
        this.scene.popMatrix();
    }
}