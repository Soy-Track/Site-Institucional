var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/selecionardadosgrafico/:idempresa/:idsilo", function (req, res) {
    dashboardController.selecinardadosgrafico(req, res);
})

router.get("/contarsilos/:idempresa", function (req, res) {
    dashboardController.contarsilos(req, res);
})

router.get("/exibirsilosbarra/:idempresa", function (req, res) {
    dashboardController.exibirsilosbarra(req, res);
})

router.get("/exibirkpi1/:idempresa", function (req, res) {
    dashboardController.exibirkpi1(req, res);
})

router.get("/exibirkpi2/:idempresa", function (req, res) {
    dashboardController.exibirkpi2(req, res);
})

router.get("/exibirkpi3/:idempresa", function (req, res) {
    dashboardController.exibirkpi3(req, res);
})

router.get("/exibirkpi4/:idempresa", function (req, res) {
    dashboardController.exibirkpi4(req, res);
})

router.get("/alertar/:idempresa", function (req, res) {
    dashboardController.alertar(req, res);
})

router.get("/exibirbarrinha/:idempresa/:nomesilo", function (req, res) {
    dashboardController.exibirbarrinha(req, res);
})

router.get("/calcularTON/:idempresa/:nomesilo", function (req, res) {
    dashboardController.calcularTON(req, res);
})

router.get("/alertarsilo/:idempresa/:nomesilo", function (req, res) {
    dashboardController.alertarsilo(req, res);
})

router.get("/contagemsilos/:idempresa/:nomesilo", function (req, res) {
    dashboardController.contagemsilos(req, res);
})

module.exports = router;