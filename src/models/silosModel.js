var database = require("../database/config");

function busca_silos(empresaid) {

  var instrucaoSql = `SELECT * FROM silo WHERE fkempresa = ${empresaid}`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  busca_silos,
}