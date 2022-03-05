class Queries {

    constructor() {
    }

    nuevaBase() {
        const query='CREATE DATABASE udenavy';
        return query;
    }

    version() {
        const query='SELECT version FROM udenavybd.version';
        return query;
    } 

    insertDificultad(){
        const query='insert into difficulty (id,multiMap,multiLife,multiPower,multiVisibility,multiSpeed,multiDistance ) values(1,1,2,3,4,6,7)';
        return query;
    }
    obtengoDificultad(){
        const query='';
        return query;
    }

}

module.exports = Queries;