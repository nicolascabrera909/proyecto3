class Difficulty {

    /*Constructor*/
    constructor(multiplierMap,multiplierLife,multiplierPower,multiplierVisibility,multiplierSpeed,multiplierDistance) {
        this.multiplierMap = multiplierMap;
        this.multiplierLife = multiplierLife;
        this.multiplierPower = multiplierPower;
        this.multiplierVisibility = multiplierVisibility;
        this.multiplierSpeed = multiplierSpeed;
        this.multiplierDistance = multiplierDistance;
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
     


    setMultiplierMap() {
         this.multiplierMap=multiplierMap;
    }
    setMultiplierLife() {
         this.multiplierLife=multiplierLife;
    }
    setMultiplierPower() {
         this.multiplierPower=multiplierPower;
    }
    setMultiplierVisibility() {
         this.multiplierVisibility=multiplierVisibility;
    }
    setMultiplierSpeed() {
         this.multiplierSpeed=multiplierSpeed;
    }
    setMultiplierDistance() {
         this.multiplierDistance=multiplierDistance;
    }



}
export default Difficulty;