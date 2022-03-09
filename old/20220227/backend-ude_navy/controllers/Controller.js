const express = require('express');
const daoversion = require('../data/DAOVersion');
const Games = require('../services/Games');



exports.index = function (req, res) {
    res.send('Bienvenidos a UDE Navy');
};

exports.version = async function (req, res, next) {
    const daov = new daoversion();
    const result = await daov.version();
    console.log(result);
    res.send(result);
};

exports.partida = async function (req, res, next) {
    var gamePlay = new Games();
    var jsonGame = JSON.stringify(gamePlay);
    //console.log('Luego de convertir a JSON: ' + jsonGame);
    res.send(jsonGame);
    // res.render('http://localhost:5500/credits.html', { jsonGame } );

};

exports.ready = async function (req, res, next) {
    res.send(true);
};
