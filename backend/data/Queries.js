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
        const query='insert into difficulty (id,multiMap,multiLife,multiPower,multiVisibility,multiSpeed,multiDistance ) values(?,?,?,?,?,?,?)';
        return query;
    }
    obtengoDificultad(){
        const query='SELECT id,multiMap,multiLife,multiPower,multiVisibility,multiSpeed,multiDistance from difficulty  where id=?';
        return query;
    }

    insertGame(){
        const query='insert into game (id,difficulty_id ) values(?,?)';
        return query;
    }
    obtengoGame(){
        const query='SELECT id,difficulty_id from game where id=?';
        return query;
    }

}

module.exports = Queries;