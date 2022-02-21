const express = require('express');
const daoversion = require('../data/DAOVersion');


exports.index = function(req, res) {
    res.send('Bienvenidos a UDE Navy');
};

exports.version = async function(req, res, next) {
    const daov = new daoversion();
    const result = await daov.version();
    console.log(result);
    res.send(result);

    
};
