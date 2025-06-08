function validar() {
    if (localStorage.nivel != 1) {
        mensagem_negacao.innerHTML = `
        <div id="tela_inteira">
            <div id="modal">
                <h2>Você não tem permissão para visualizar o painel de solicitações!! Por favor não insista</h2>
                <button onclick="voltar()">Ok</button>
            </div>
        </div>
        `
    }
}
validar()

function voltar() {
    window.location.href = "dashboard.html"
}

function buscarPedidos() {
    var idempresaVar = localStorage.idEmpresa

    fetch(`/empresa/buscarPedidos/${idempresaVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
                conteudoPedidos.innerHTML = ""
                if (resposta2.length == 0) {
                    conteudoPedidos.innerHTML = `<br> <span id="mensagem_sol">Você não possui solicitações no momento</span>`
                }
                for (let i = 0; i < resposta2.length; i++) {
                    conteudoPedidos.innerHTML += `
                    <tr class="dados_tabela">
                        <td id="numeroElementos">${i + 1}</td>
                        <td id="titulo_nome">${resposta2[i].nome}</td>
                        <td id="titulo_email">${resposta2[i].email}</td>
                        <td id="buttonsSolicitacoes">
                            <div class="div_btSolicitacao">
                                <button onclick="aceitar(${resposta2[i].idFuncionario})" class="btAceitar">Aceitar</button>
                                <button onclick="negar(${resposta2[i].idFuncionario})" class="btNegar">Negar</button>
                            </div>
                        </td>
                    </tr>
                    
                    `;
                }
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function aceitar(id_funcionario) {
    var idfuncionarioVar = id_funcionario

    fetch("/empresa/atualizarstatus", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idFuncionario: idfuncionarioVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            buscarPedidos()
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function negar(id_funcionario) {
    var idfuncionarioVar = id_funcionario

    fetch("/empresa/recusarfuncionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idFuncionario: idfuncionarioVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            buscarPedidos()
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

buscarPedidos()