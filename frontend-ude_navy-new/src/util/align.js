class Align
{
	constructor(game){
		this.game = game	
	}

	scaleToGameW(obj,per)
	{
		obj.displayWidth=this.game.config.width*per;
		obj.scaleY=obj.scaleX;
	}
	centerH(obj)
	{
		obj.x=this.game.config.width/2-obj.displayWidth/2;
	}
	centerV(obj)
	{
		obj.y=this.game.config.height/2-obj.displayHeight/2;
	}
	center2(obj)
	{
		obj.x=this.game.config.width/2-obj.displayWidth/2;
		obj.y=this.game.config.height/2-obj.displayHeight/2;
	}
	center(obj)
	{
		obj.x=this.game.config.width/2;
		obj.y=this.game.config.height/2;
	}
}