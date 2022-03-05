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
    findDificultad(){
        const query='SELECT id,multiMap,multiLife,multiPower,multiVisibility,multiSpeed,multiDistance from difficulty  where id=?';
        return query;
    }

    insertGame(){
        const query='insert into game (id,difficulty_id ) values(?,?)';
        return query;
    }
    findGame(){
        const query='SELECT id,difficulty_id from game where id=?';
        return query;
    }

    insertMap(){
        const query='insert into mapa (id,game_id,heigth,width ) values(?,?,?,?);';
        return query;
    }
    findMap(){
        const query='SELECT id,game_id,heigth,width from mapa where game_id=?';
        return query;
    }
    insertMap(){
        const query='insert into mapa (id,game_id,heigth,width ) values(?,?,?,?);';
        return query;
    }
    findMap(){
        const query='SELECT id,heigth,width from mapa where game_id=?';
        return query;
    }
    insertPlayer(){
        const query='insert into player (id,name,game_id) values(?,?,?);';
        return query;
    }
    findPlayer(){
        const query='select id,name from player where game_id =?';
        return query;
    }
    insertPlayer(){
        const query='insert into player (id,name,game_id) values(?,?,?);';
        return query;
    }
    findPlayer(){
        const query='select id,name from player where game_id =?';
        return query;
    }


}

module.exports = Queries;