var solicitacoesModel = require("../models/solicitacoesModel");

function buscarPedidos(req, res) {
    var idempresa = req.params.idempresa;

    solicitacoesModel.buscarPedidos(idempresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function atualizarstatus(req, res) {
    var idfuncionario = req.body.idFuncionario;

    solicitacoesModel.atualizarstatus(idfuncionario).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function recusarfuncionario(req, res) {
    var idfuncionario = req.body.idFuncionario;

    solicitacoesModel.recusarfuncionario(idfuncionario).then((resultado) => {
        res.status(201).json(resultado);
    });
}

module.exports = {
    buscarPedidos,
    atualizarstatus,
    recusarfuncionario,
};