const express = require('express');
const daoversion = require('../data/DAOVersion');
const daogame = require('../data/DAOGame');
const Games = require('../services/Games.js');
let cargado = 0;

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
    const result = gamePlay.saveGame();
    console.log(result);
    res.send(result);
};

exports.cargar = async function (req, res, next) {
    const gamePlay = new Games();
    let result ='error'
    if (cargado == 0) {
        cargado++;
        result = await gamePlay.LoadGame(req.query.gameId);
        gamePlay.loading(true);
        gamePlay.espera()
    } else {
        try {
            gamePlay.loading(true);
            gamePlay.espera()
            result='ok'
        } catch (err) {
            console.log('error   ' + err);
        }

    }
    console.log({ result });
    res.send({ result });

};

exports.cancelar = async function (req, res, next) {
    const gamePlay = new Games();
    const result='ok';
    console.log(result);
    res.send(result);
};

exports.partida = async function (req, res, next) {
    var gamePlay = new Games();
    var jsonGame = JSON.stringify(gamePlay);
    res.send(jsonGame);
};

exports.dificultad = async function (req, res, next) {
    const daog = new daogame();
    const result = await daog.dificultad(req.query.dificultad);
    const value=JSON.stringify(result[0].multiTime);
    console.log(value);
    res.send(value);
};

exports.ready = async function (req, res, next) {
    res.send(true);
};