class Map{
    constructor(scene, key, tileSetName, terrain) {
        this.scene = scene;
        this.key = key;
        this.tileSetName = tileSetName;
        this.terrain = terrain;
        this.createMap();
    }

    createMap(){
        this.map = this.scene.make.tilemap({key: this.key});
        this.tileset = this.map.addTilesetImage(this.terrain, this.tileSetName);
        this.backLayer = this.map.createLayer('Back', this.tileset, 0, 0);
        this.midLayer = this.map.createLayer('Left', this.tileset, 0, 0);
        this.topLayer = this.map.createLayer('Right', this.tileset, 0, 0);
    }
}

export default Map;