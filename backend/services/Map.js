class Map {

    /*Constructor*/
    constructor() {
        this.width = 1344;
        this.height = 704;
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