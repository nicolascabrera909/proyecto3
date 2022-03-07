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
        const query='insert into difficulty (id,multiMap,multiLife,multiPower,multiVisibility,multiSpeed,multiDistance ) values($1,$2,$3,$4,$5,$6,$7)';
        return query;
    }
    findDifficulty(){
        const query='SELECT id,multiMap,multiLife,multiPower,multiVisibility,multiSpeed,multiDistance from difficulty  where id=$1';
        return query;
    }

    insertGame(){
        const query='insert into game (difficulty_id ) values($1,$2)';
        return query;
    }
    findGame(){
        const query='SELECT id,difficulty_id from game;'//where id=$1';
        return query;
    }
    lastGame(){
        const query='SELECT max(id) id  from game';
        return query;
    }
    insertMap(){
        const query='insert into mapa (game_id,heigth,width ) values($1,$2,$3,$4);';
        return query;
    }
    findMap(){
        const query='SELECT id,game_id,heigth,width from mapa where game_id=$1';
        return query;
    }
    insertMap(){
        const query='insert into mapa (game_id,heigth,width ) values($1,$2,$3,$4);';
        return query;
    }
    findMap(){
        const query='SELECT id,heigth,width from mapa where game_id=$1';
        return query;
    }
    insertPlayer(){
        const query='insert into player (name,game_id) values($1,$2,$3);';
        return query;
    }
    findPlayer(){
        const query='select id,name from player where game_id =$1';
        return query;
    }

    lastPlayerId(){
        const query='select max(id) id from player where game_id =$1';
        return query;
    }

    insertShip(){
        const query='insert into ship (player_id ,positionX,positionY,boatLife,boatType,visibility) values($1,$2,$3,$4,$5,$6,$7);';
        return query;
    }
    findShip(){
        const query='select id, boatType from ship where player_id =$1';
        return query;
    }
    lastShipId(){
        const query='select max(id) id from ship where player_id =$1';
        return query;
    }
    insertDestructor(){
        const query='insert into destructor (ship_id) values($1);';
        return query;
    }
    findDestructor(){
        const query='select id from destructor where ship_id =$1';
        return query;
    }
    lastDestructorId(){
        const query='select max(id) id from destructor where ship_id =$1';
        return query;
    }

    insertSubmarine(){
        const query='insert into submarine (ship_id,s_depth) values($1,$2);';
        return query;
    }
    findSubmarine(){
        const query='select id,s_depth from submarine where ship_id =$1';
        return query;
    }
    lastSubmarineId(){
        const query='select max(id) id from submarine where ship_id =$1';
        return query;
    }

    insertFreighters(){
        const query='insert into freighters (id,ship_id) values($1,$2);';
        return query;
    }
    findFreighters(){
        const query='select id from freighters where ship_id =$1';
        return query;
    }
    lastFreightersId(){
        const query='select max(id) id from freighters where ship_id =$1';
        return query;
    }

    insertCannon(){
        const query='insert into cannon (ship_id,c_cantidad) values($1,$2);';
        return query;
    }
    findCannon(){
        const query='select id,ship_id,c_cantidad from cannon where ship_id =$1';
        return query;
    }
    
    lastCannonId(){
        const query='select max(id) id  from cannon where ship_id =$1';
        return query;
    }

    insertDepthCharge(){
        const query='insert into depth_charge (destructor_id ,dp_time ,dp_depth) values($1,$2,$3);';
        return query;
    }
    findDepthCharge(){
        const query='select id,dp_time,dp_depth,dp_power,dp_distance from depth_charge where destructor_id =$1';
        return query;
    }
   
    insertTorpedo(){
        const query='insert into torpedo (submarine_id,t_cantidad) values($1,$2);';
        return query;
    }
    findTorpedo(){
        const query='select id,t_cantidad from  torpedo  where submarine_id=$1';
        return query;
    }

    updatetMap(){
        const query='UPDATE mapa SET heigth=$2, width=$3 WHERE game_id=$1;';
        return query;
    }
    
    updatetShip(){
        const query='UPDATE ship SET positionX=$2,positionY=$3,rotation=$4,boatLife=$5 WHERE id=$1;';
        return query;
    }
    updateCannon(){
        const query='UPDATE cannon SET c_cantidad=$2 WHERE ship_id=$1;';
        return query;
    }
    updateDepthCharge(){
        const query='UPDATE depth_charge SET dp_time=$2, dp_depth=$3 WHERE destructor_id=$1;';
        return query;
    }
    updateSubmarine(){
        const query='UPDATE submarine SET s_depth=$2 WHERE id=$1;';
        return query;
    }
    updateTorpedo(){
        const query='UPDATE torpedo SET t_cantidad=$2 WHERE submarine_id=$1;';
        return query;
    }
}

module.exports = Queries;