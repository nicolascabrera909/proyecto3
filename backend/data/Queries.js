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

    insertDifficulty(){
        const query='insert into difficulty (multiMap,multiLife,multiPower,multiVisibility,multiSpeed,multiDistance ) values(?,?,?,?,?,?)';
        return query;
    }
    findDifficulty(){
        const query='SELECT id from difficulty  where id=?';
        return query;
    }

    insertGame(){
        const query='insert into game (difficulty_id) values(?)';
        return query;
    }
    findGame(){
        const query='SELECT id,difficulty_id from game;';
        return query;
    }
    
    findGameId(){
        const query='SELECT id, difficulty_id  from game where id=?;';
        return query;
    }

    lastGame(){
        const query='SELECT max(id) id  from game';
        return query;
    }
    insertMap(){
        const query='insert into mapa (game_id, heigth ,width ) values ( ?, ?, ? );';
        return query;
    }
    findMap(){
        const query='SELECT id,game_id,heigth,width from mapa where game_id=?';
        return query;
    }
   
    insertPlayer(){
        const query='insert into player (game_id,name) values(?,?);';
        return query;
    }
    findPlayer(){
        const query='select id,name from player where game_id =?';
        return query;
    }

    lastPlayerId(){
        const query='select max(id) id from player where game_id =?';
        return query;
    }

    insertShip(){  
        const query='insert into ship (player_id,positionX,positionY,rotation,boatLife,boatTeam) values(?,?,?,?,?,?);';
        return query;
    }
    findShip(){
        const query='select id,positionX,positionY,rotation,boatLife,boatTeam from ship where player_id =?';
        return query;
    }
    lastShipId(){
        const query='select max(id) id from ship where player_id =?';
        return query;
    }
    insertDestructor(){
        const query='insert into destructor (ship_id,boatType) values(?,?);';
        return query;
    }
    findDestructor(){
        const query='select id,boatType from destructor where ship_id =?';
        return query;
    }
    lastDestructorId(){
        const query='select max(id) id from destructor where ship_id =?';
        return query;
    }

    insertSubmarine(){
        const query='insert into submarine (ship_id,s_depth,boatType) values(?,?,?);';
        return query;
    }
    findSubmarine(){
        const query='select id,s_depth,boatType from submarine where ship_id =?';
        return query;
    }
    lastSubmarineId(){
        const query='select max(id) id from submarine where ship_id =?';
        return query;
    }

    insertFreighters(){
        const query='insert into freighters (ship_id,boatType) values(?,?);';
        return query;
    }
    findFreighters(){
        const query='select id,boatType from freighters where ship_id =?';
        return query;
    }
    lastFreightersId(){
        const query='select max(id) id from freighters where ship_id =?';
        return query;
    }

    insertCannon(){
        const query='insert into cannon (ship_id,c_cantidad) values(?,?);';
        return query;
    }
    findCannon(){
        const query='select id,c_cantidad from cannon where ship_id =?';
        return query;
    }
    
    lastCannonId(){
        const query='select max(id) id  from cannon where ship_id =?';
        return query;
    }

    insertDepthCharge(){
        const query='insert into depth_charge (destructor_id ,dp_time ,dp_depth) values(?,?,?);';
        return query;
    }
    findDepthCharge(){
        const query=' select id,dp_time,dp_depth from depth_charge where destructor_id = ?';
        return query;
    }
   
    insertTorpedo(){
        const query='insert into torpedo (submarine_id,t_cantidad) values(?,?);';
        return query;
    }
    findTorpedo(){
        const query='select id,t_cantidad from  torpedo  where submarine_id=?';
        return query;
    }

    updateMap(){
        const query='UPDATE mapa SET heigth=?, width=? WHERE game_id=?;';
        return query;
    }
    
    updateShip(){
        const query='UPDATE ship SET positionX=?,positionY=?,rotation=?,boatLife=? WHERE id=?;';
        return query;
    }
    updateCannon(){
        const query='UPDATE cannon SET c_cantidad=? WHERE ship_id=?;';
        return query;
    }
    updateDepthCharge(){
        const query='UPDATE depth_charge SET dp_time=?, dp_depth=? WHERE destructor_id=?;';
        return query;
    }
    updateSubmarine(){
        const query='UPDATE submarine SET s_depth=? WHERE id=?;';
        return query;
    }
    updateTorpedo(){
        const query='UPDATE torpedo SET t_cantidad=? WHERE submarine_id=?;';
        return query;
    }
    listGames(){
        const query='select g.id,p.name name1 ,p2.name name2 from game g inner join player  p on g.id=p.game_id inner join player  p2 on g.id=p2.game_id  where p.id >p2.id;';
        return query;
    }
    dificultad() {
        const query='SELECT multiTime FROM difficulty WHERE id=?;';
        return query;
    } 
}

module.exports = Queries;