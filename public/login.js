function login() {
    var email = ipt_email.value
    var senha = ipt_senha.value

    if (email == "" || senha == "") {
        alert("Campos em branco, favor preencher todos os campos")
    } else {
        logar(email, senha)
    }
}

function logar(s_email, s_senha) {
    var emailVar = s_email
    var senhaVar = s_senha

    fetch(`/empresa/logar/${emailVar}/${senhaVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                if (resposta2.length == 0) {
                    alert("Email ou senha inválidos")
                } else {
                    if (resposta2[0].permissao == 0) {
                        alert("Sinto muito, sua solicitação ainda não foi aprovada, tente novamente mais tarde")
                    } else {
                        localStorage.nome = resposta2[0].nome
                        localStorage.idEmpresa = resposta2[0].FKempresa
                        localStorage.nivel = resposta2[0].FKnivel

                        if (resposta2[0].FKnivel == 3) {
                            window.location.href = "http://192.168.0.61:3001/" 
                        } else {
                            window.location.href = "DASHBOARD/dashboard.html"
                        }
                    }
                    console.log(resposta2)
                }
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}