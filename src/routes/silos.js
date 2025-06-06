var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/silosController");

router.get("/:empresaid", function (req, res) {
  aquarioController.busca_silos(req, res);
});

router.post("/cadastrar", function (req, res) {
  aquarioController.cadastrar(req, res);
})

module.exports = router;