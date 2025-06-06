var usuarioModel = require("../models/usuarioModel");
var siloModel = require("../models/silosModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined || senha == undefined) {
        res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
        return;
    }

    usuarioModel.autenticar(email, senha)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados no model: ${resultadoAutenticar.length}`);
                console.log(`Dados do usuário do banco: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 1) {
                    const usuarioLogado = resultadoAutenticar[0];
                    console.log("Usuário autenticado com sucesso:", usuarioLogado);

                    if (usuarioLogado.empresaid == null || usuarioLogado.empresaid == undefined) {
                        console.warn("ATENÇÃO: empresaid é nulo ou indefinido para este usuário. Retornando usuário sem silos.");
                        res.status(200).json({
                            id: usuarioLogado.idfuncionario, 
                            email: usuarioLogado.email,
                            nome: usuarioLogado.nome,
                            senha: usuarioLogado.senha,
                            empresa: usuarioLogado.empresaid, 
                            nivel: usuarioLogado.fknivel, 
                            permissao: usuarioLogado.permissao,
                        });
                        return;
                    }
                    siloModel.busca_silos(usuarioLogado.empresaid)
                        .then((resultadoAquarios) => {
                            const silosData = Array.isArray(resultadoAquarios) ? resultadoAquarios : [];
                            
                            res.status(200).json({ 
                                id: usuarioLogado.idfuncionario,
                                email: usuarioLogado.email,
                                nome: usuarioLogado.nome,
                                senha: usuarioLogado.senha,
                                empresa: usuarioLogado.empresaid, 
                                nivel: usuarioLogado.fknivel,
                                permissao: usuarioLogado.permissao,
                                silos: silosData
                            });
                        })
                        .catch(function (erroSilos) {
                            console.error("Houve um erro ao buscar os silos! Erro: ", erroSilos.sqlMessage || erroSilos);
                            res.status(200).json({ 
                                id: usuarioLogado.idfuncionario,
                                email: usuarioLogado.email,
                                nome: usuarioLogado.nome,
                                empresa: usuarioLogado.empresaid,
                                nivel: usuarioLogado.fknivel,
                                permissao: usuarioLogado.permissao,
                            });
                        });

                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).json({ mensagem: "Email e/ou senha inválido(s)." }); 
                } else {
                    res.status(403).json({ mensagem: "Mais de um usuário com o mesmo login e senha. Contate o suporte." }); 
                }
            }
        ).catch(
            function (erro) {
                console.error("Houve um erro ao realizar o login! Erro: ", erro.sqlMessage || erro);
                res.status(500).json({ mensagem: "Erro interno do servidor. Tente novamente mais tarde.", erroDetalhe: erro.sqlMessage || erro.message || "Erro desconhecido" }); 
            }
        );
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var empresa = req.body.empresaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else 

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, empresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


module.exports = {
    autenticar,
    cadastrar
}