class Difficulty {

    /*Constructor*/
    /*
    constructor(multiplierMap,multiplierLife,multiplierPower,multiplierVisibility,multiplierSpeed,multiplierDistance) {
        this.multiplierMap = multiplierMap;
        this.multiplierLife = multiplierLife;
        this.multiplierPower = multiplierPower;
        this.multiplierVisibility = multiplierVisibility;
        this.multiplierSpeed = multiplierSpeed;
        this.multiplierDistance = multiplierDistance;
    }
    */

    constructor(level) {
        /*
            sin terminar, la idea es setear los atributos dependiendo el nivel de dificultad
        */ 
        switch (level) {
            case level === 1:
                this.multiplierMap = 1;
                this.multiplierLife = 1;
                this.multiplierPower = 1;
                this.multiplierVisibility = 1;
                this.multiplierSpeed = 1;
                this.multiplierDistance = 1;
                break;
            case level === 2:
                    this.multiplierMap = 2;
                    this.multiplierLife = 2;
                    this.multiplierPower = 2;
                    this.multiplierVisibility = 2;
                    this.multiplierSpeed = 2;
                    this.multiplierDistance = 2;
                    break;
            default:
              break;
          }
    }

    /*Geters and seters*/
    getMultiplierMap() {
        return this.multiplierMap;
    }
    getMultiplierLife() {
        return this.multiplierLife;
    }
    getMultiplierPower() {
        return this.multiplierPower;
    }
    getMultiplierVisibility() {
        return this.multiplierVisibility;
    }
    getMultiplierSpeed() {
        return this.multiplierSpeed;
    }
    getMultiplierDistance() {
        return this.multiplierDistance;
    }
     


    setMultiplierMap(multiplierMap) {
         this.multiplierMap=multiplierMap;
    }
    setMultiplierLife(multiplierLife) {
         this.multiplierLife=multiplierLife;
    }
    setMultiplierPower(multiplierPower) {
         this.multiplierPower=multiplierPower;
    }
    setMultiplierVisibility(multiplierVisibility) {
         this.multiplierVisibility=multiplierVisibility;
    }
    setMultiplierSpeed(multiplierSpeed) {
         this.multiplierSpeed=multiplierSpeed;
    }
    setMultiplierDistance(multiplierDistance) {
         this.multiplierDistance=multiplierDistance;
    }



}
