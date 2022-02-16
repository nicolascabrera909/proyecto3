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
export default Difficulty;