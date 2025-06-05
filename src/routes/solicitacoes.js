var express = require("express");
var router = express.Router();

var solicitacoesController = require("../controllers/solicitacoesController");

router.get("/buscarPedidos/:idempresa", function (req, res) {
    solicitacoesController.buscarPedidos(req, res);
})

router.post("/atualizarstatus", function (req, res) {
    solicitacoesController.atualizarstatus(req, res);
})

router.post("/recusarfuncionario", function (req, res) {
    solicitacoesController.recusarfuncionario(req, res);
})

module.exports = router;