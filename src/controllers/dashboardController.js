var dashboardModel = require("../models/dashboardModel");

function selecinardadosgrafico(req, res) {
    var idempresa = req.params.idempresa;
    var idsilo = req.params.idsilo;

    dashboardModel.selecinardadosgrafico(idempresa, idsilo).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function contarsilos(req, res) {
    var idempresa = req.params.idempresa;

    dashboardModel.contarsilos(idempresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirsilosbarra(req, res) {
    var idempresa = req.params.idempresa;

    dashboardModel.exibirsilosbarra(idempresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirkpi1(req, res) {
    var idempresa = req.params.idempresa;

    dashboardModel.exibirkpi1(idempresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirkpi2(req, res) {
    var idempresa = req.params.idempresa;

    dashboardModel.exibirkpi2(idempresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirkpi3(req, res) {
    var idempresa = req.params.idempresa;

    dashboardModel.exibirkpi3(idempresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirkpi4(req, res) {
    var idempresa = req.params.idempresa;

    dashboardModel.exibirkpi4(idempresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function alertar(req, res) {
    var idempresa = req.params.idempresa;

    dashboardModel.alertar(idempresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

module.exports = {
    selecinardadosgrafico,
    contarsilos,
    exibirsilosbarra,
    exibirkpi1,
    exibirkpi2,
    exibirkpi3,
    exibirkpi4,
    alertar,
};