class Map {

    /*Constructor*/
    constructor() {
        this.width = 3200;
        this.height = 1600;
    }

    setHeight(height) {
        this.height = height;
    }
    setWidth(width) {
        this.width = width;
    }

    getHeight() {
        return this.height;
    }
    getWidth() {
        return this.width;
    }
}

module.exports = Map;