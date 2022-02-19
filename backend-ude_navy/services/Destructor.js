import DepthCharge from "./DepthCharge";
import Cannon from "./Cannon.js";

class Destructor extends Ship{
    
    /*Constructor*/
    constructor(coordenadas) {
       super();
       this.depth = depth;// 1 superficie, 2 sumergido y 3sumergido proufundo
       this.carga = new DepthCharge();
       this.carga.setPower(150);
       this.carga.setDistance(100);
       this.carga.setCantMunicion(30);
       this.carga.setTime(10);
       this.carga.setDepth();
       this.cannon = new Cannon();
       this.cannon.setDistance(150);
       this.cannon.setPower(500);
       this.cannon.setCantMunicion(30);
       this.positionX = coordenadas.x;
       this.positionY = coordenadas.y;
       this.boatLife.setBoatlife(100);
       this.visibility.setVisibility(100);
   }

   
   
}
