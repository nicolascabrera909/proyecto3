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

}

module.exports = Queries;