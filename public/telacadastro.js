function cadastro() {
    var nome = ipt_nomeCadastro.value
    var email = ipt_emailCadastro.value
    var senha = ipt_senhaCadastro.value
    var confirma_senha = ipt_confirSenha.value
    var token = ipt_tokenCadastro.value

    if (nome == "" || email == "" || senha == "" || confirma_senha == "" || token == "") {
        alert("Campos em branco, favor preencher todos os campos")
    } else {
        selecionarempresas(token)
    }
}

function senha() {
    var senha = ipt_senhaCadastro.value
    if ((senha.includes('1') || senha.includes('2') || senha.includes('3') || senha.includes('4') || senha.includes('5') ||
        senha.includes('6') || senha.includes('7') || senha.includes('8') || senha.includes('9') || senha.includes('0')) &&
        (senha.includes('!') || senha.includes('@') || senha.includes('#') || senha.includes('$') || senha.includes('%') ||
            senha.includes('¨') || senha.includes('&') || senha.includes('*')) && (senha.length >= 6)) {
        txt.innerHTML = `<span style="color: darkgreen;">Senha forte</span>`
    } else {
        txt.innerHTML = `<span style="color: red;">Senha fraca (precisa ter pelo menos um caracter especial, um número e 6 caracteres no mínimo)</span>`
    }
}

function selecionarempresas(idtoken) {
    var idtokenVar = idtoken

    fetch(`/empresa/selecionarempresas/${idtokenVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                if (resposta2.length == 0) {
                    alert("Sinto muito, Token inexistente ou inválido")
                } else {
                    console.log(resposta2)
                    efetuarcadastro(resposta2[0].idEmpresa)
                }
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function efetuarcadastro(id_empresa) {
    var nomeVar = ipt_nomeCadastro.value
    var emailVar = ipt_emailCadastro.value
    var senhaVar = ipt_senhaCadastro.value
    var idempresaVar = id_empresa

    fetch("/empresa/efetuarcadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: nomeVar,
            email: emailVar,
            senha: senhaVar,
            idEmpresa: idempresaVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            ipt_nomeCadastro.value = ""
            ipt_emailCadastro.value = ""
            ipt_senhaCadastro.value = "" 
            ipt_confirSenha.value = ""
            ipt_tokenCadastro.value = ""
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}