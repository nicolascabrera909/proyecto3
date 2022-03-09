const express = require('express');
const daoversion = require('../data/DAOVersion');
const daogame = require('../data/DAOGame');
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

exports.lista = async function (req, res, next) {
    const daog = new daogame();
    const result = await daog.list();
    console.log(result);
    res.send(result);
};

exports.guardar = async function (req, res, next) {
    const gamePlay = new Games();
    const result=gamePlay.saveGame();
    console.log(result);
    res.send(result);
};

exports.cargar = async function (req, res, next) {
    const gamePlay = new Games();
    const result= await gamePlay.LoadGame('asdasdasdasdasd',27);
    console.log(result);
    res.send(result);
};

exports.cancelar = async function (req, res, next) {
    const gamePlay = new Games();
    // const result=gamePlay.cancelGame();
    const result='ok';
    console.log(result);
    res.send(result);
};

exports.partida = async function (req, res, next) {
    var gamePlay = new Games();
    var jsonGame = JSON.stringify(gamePlay);
    console.log('Luego de convertir a JSON: ' + jsonGame);
    res.send(jsonGame);
    // res.render('http://localhost:5500/credits.html', { jsonGame } );
};

exports.ready = async function (req, res, next) {
    console.log('Notifico la la partida esta lista para comenzar');
    res.send(true);
};