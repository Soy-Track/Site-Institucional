var silosModel = require("../models/silosModel");

function busca_silos(req, res) {
  var idUsuario = req.params.idUsuario;

  silosModel.busca_silos(idfuncionario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os silos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}
module.exports = {
  busca_silos
}