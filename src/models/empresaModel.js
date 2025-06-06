var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT a.idtoken, b.nome as empresa,
  a.fkempresa FROM token as a JOIN empresa as b on fkempresa = idempresa`;

  return database.executar(instrucaoSql);
}

function listaremail() {
  var instrucaoSql = `SELECT email FROM funcionario`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorId, cadastrar, listar, listaremail };
