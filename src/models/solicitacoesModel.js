var database = require("../database/config");

function buscarPedidos(idempresa) {
    var instrucaoSql = `
    select f.* from funcionario f join empresa
	on idEmpresa = FKempresa
		where idEmpresa = ${idempresa} and permissao = 0;
    `
    return database.executar(instrucaoSql);
}

function atualizarstatus(idfuncionario) {
    var instrucaoSql = `
    update funcionario set permissao = 1 where idFuncionario = ${idfuncionario};
    `
    return database.executar(instrucaoSql);
}

function recusarfuncionario(idfuncionario) {
    var instrucaoSql = `
    delete from funcionario where idFuncionario = ${idfuncionario};
    `
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPedidos,
    atualizarstatus,
    recusarfuncionario,
}