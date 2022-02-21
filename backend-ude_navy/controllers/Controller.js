const express = require('express');
var daoversion = require('../data/DAOVersion'); 


exports.index = function(req, res) {
    res.send('Bienvenidos a UDE Navy');
};

exports.version = function(req, res, next) {
    const result=daoversion.version();
    console.log(result);
    res.send('Holaaaa');
};
