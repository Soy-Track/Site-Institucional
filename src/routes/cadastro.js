var express = require("express");
var router = express.Router();

var cadastroController = require("../controllers/cadastroController");

router.get("/selecionarempresas/:idtoken", function (req, res) {
    cadastroController.selecionarempresas(req, res);
})

router.post("/efetuarcadastro", function (req, res) {
    cadastroController.efetuarcadastro(req, res);
})

router.get("/logar/:email/:senha", function (req, res) {
    cadastroController.logar(req, res);
})

module.exports = router;