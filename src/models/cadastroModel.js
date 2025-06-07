var database = require("../database/config");

function selecionarempresas(idtoken) {
    var instrucaoSql = `
    select idEmpresa, idToken from empresa 
		join token 
        on idEmpresa = FKempresa 
        where statustoken = 1 and idToken = ${idtoken};
    `
    return database.executar(instrucaoSql);
}

function efetuarcadastro(nome, email, senha, idempresa) {
    var instrucaoSql = `
    insert into funcionario (nome, email, senha, permissao, FKempresa, FKnivel) values
    ('${nome}', '${email}', '${senha}', 0, ${idempresa}, 2);
    `
    return database.executar(instrucaoSql);
}

function logar(email, senha) {
    var instrucaoSql = `
    select nome, permissao, FKempresa, FKnivel from funcionario 
    where email = '${email}' and senha = '${senha}';
    `
    return database.executar(instrucaoSql);
}

module.exports = {
    selecionarempresas,
    efetuarcadastro,
    logar,
}