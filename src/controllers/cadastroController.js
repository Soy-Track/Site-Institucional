var cadastroModel = require("../models/cadastroModel");

function selecionarempresas(req, res) {
    var idtoken = req.params.idtoken;

    cadastroModel.selecionarempresas(idtoken).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function efetuarcadastro(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var idempresa = req.body.idEmpresa;

    cadastroModel.efetuarcadastro(nome, email, senha, idempresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function logar(req, res) {
    var email = req.params.email;
    var senha = req.params.senha;

    cadastroModel.logar(email, senha).then((resultado) => {
        res.status(201).json(resultado);
    });
}

module.exports = {
    selecionarempresas,
    efetuarcadastro,
    logar,
};