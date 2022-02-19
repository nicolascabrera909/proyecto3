class Map {

    /*Constructor*/
    constructor() {
        this.setDefaultSize()
    }

    setDefaultSize(){
        this.setWidth(800);
        this.setHeight(600);
    }

    /*Geters and seters*/
    getHeight() {
        return this.height
    }
    getWidth() {
        return this.width
    }
    setHeight(height) {
         this.height=height;
    }
    setWidth(width) {
         this.width=width;
    }

    
}
