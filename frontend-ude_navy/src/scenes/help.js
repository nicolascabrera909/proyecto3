class Help extends Phaser.Scene {
    constructor() {
        super('Help');
        console.log('Help');
    }

    preload(){
        this.load.html('help', './static/assets/html/loginform.html');
        
    }

    create(){
        var element = this.add.dom(400, 600).createFromCache('help');
        element.setPerspective(800);
    }
    
}

export default Help;
