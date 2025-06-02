var dia = [0, 7]

var qtd_silos = 0
// Descobrir a quantidade de silos que devem aparecer nas opções
function contarsilos() {
    var idempresaVar = localStorage.idEmpresa
    // para teste
    idempresaVar = 1

    fetch(`/empresa/contarsilos/${idempresaVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
                qtd_silos = resposta2[0].quantidadeSILOS
                console.log(qtd_silos)
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
contarsilos()

// Pego a quantidade de silos (contada anteriormente)
// e exibo as opções
let i = 1
function iniciarsilos() {
    dia = vt_ultimos7
    for (; i <= qtd_silos; i++) {
        const selectsilo = document.getElementById('silo');
        const novaopcaosilo = document.createElement('option');

        novaopcaosilo.value = i;
        novaopcaosilo.textContent = `silo${i}`;

        selectsilo.appendChild(novaopcaosilo);
    }

    graficoLinha.data.datasets[0].data = dia
    graficoLinha.update()
}

var siloselecionado = 1
function VARsilos() {
    for (let i = 1; i <= qtd_silos; i++) {
        if (silo.value == i) {
            siloselecionado = i
            console.log(siloselecionado)
            vt_ultimos7 = []
            selecionardadosgrafico()
        }
    }
    graficoLinha.data.datasets[0].data = dia
    graficoLinha.update()
}

const labels = [
    '00/00',
    '00/00',
    '00/00',
    '00/00',
    '00/00',
    '00/00',
    '00/00'
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Nível de grãos de soja',
        backgroundColor: '#45a834',
        borderColor: '#45a834',
        data: dia,
    }]
}

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Altura(m)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tempo(dias)'
                }
            }
        }
    }
};

const config2 = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Nível de grãos de soja',
            backgroundColor: '#febc1d',
            borderColor: '#febc1d',
            data: [],
        }]
    },
    options: {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Altura(m)'
                }
            }
        }
    }
};

const graficoLinha = new Chart(
    document.getElementById('graficoLinha'),
    config
);

const graficoBarra = new Chart(
    document.getElementById('graficoBarra'),
    config2
);

VARsilos()

var vt_ultimos7 = []
var vt_ultimosdias = []
function selecionardadosgrafico() {
    var idempresaVar = localStorage.idEmpresa
    var idsiloVar = siloselecionado
    // para teste
    idempresaVar = 1

    fetch(`/empresa/selecionardadosgrafico/${idempresaVar}/${idsiloVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
                for (let i = 6; i >= 0; i--) {
                    console.log(resposta2[i])
                    vt_ultimos7.push(resposta2[i].distancia)

                    const dataatual = new Date(resposta2[i].dtCaptura);

                    const dia = String(dataatual.getDate()).padStart(2, '0');
                    const mes = String(dataatual.getMonth() + 1).padStart(2, '0');
                    const horas = String(dataatual.getHours()).padStart(2, '0');
                    const minutos = String(dataatual.getMinutes()).padStart(2, '0');
                    const segundos = String(dataatual.getSeconds()).padStart(2, '0');

                    const dataTratada = `${dia}/${mes} ${horas}:${minutos}:${segundos}`;


                    labels[6 - i] = dataTratada
                }
                for (let i = 0; i < 7; i ++) {
                    
                }
                iniciarsilos()
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function atualizardadosgrafico() {
    setInterval(() => {
        var idempresaVar = localStorage.idEmpresa
        var idsiloVar = siloselecionado
        // para teste
        idempresaVar = 1

        fetch(`/empresa/selecionardadosgrafico/${idempresaVar}/${idsiloVar}`, {
            method: "GET",
        })
            .then(function (resposta) {
                resposta.json().then((resposta2) => {
                    console.log(resposta2)
                    dadosDash = resposta2
                    for (let i = 6; i >= 0; i--) {
                        vt_ultimos7.push(resposta2[i].distancia)

                        const dataatual = new Date(resposta2[i].dtCaptura);

                        const dia = String(dataatual.getDate()).padStart(2, '0');
                        const mes = String(dataatual.getMonth() + 1).padStart(2, '0');
                        const horas = String(dataatual.getHours()).padStart(2, '0');
                        const minutos = String(dataatual.getMinutes()).padStart(2, '0');
                        const segundos = String(dataatual.getSeconds()).padStart(2, '0');

                        const dataTratada = `${dia}/${mes} ${horas}:${minutos}:${segundos}`;


                        labels[i] = dataTratada
                    }
                    iniciarsilos()
                    VARsilos()
                })
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }, 2000);
}


// data.datasets[0].data = dados

function exibirsilosbarra() {
    var idempresaVar = localStorage.idEmpresa
    // para teste
    idempresaVar = 1

    fetch(`/empresa/exibirsilosbarra/${idempresaVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                for (let i = 0; i < resposta2.length; i++) {
                    graficoBarra.data.labels.push(`silo${i + 1}`);
                    graficoBarra.data.datasets[0].data.push(resposta2[i].distancia)
                }
                graficoBarra.update()
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function atualizarsilosbarra() {
    setInterval(() => {
        var idempresaVar = localStorage.idEmpresa
        // para teste
        idempresaVar = 1

        fetch(`/empresa/exibirsilosbarra/${idempresaVar}`, {
            method: "GET",
        })
            .then(function (resposta) {
                resposta.json().then((resposta2) => {
                    dadosDash = resposta2

                    for (let i = 0; i < resposta2.length; i++) {
                        graficoBarra.data.datasets[0].data[i] = (resposta2[i].distancia)
                    }
                    graficoBarra.update()
                })
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }, 2000);
}

exibirsilosbarra()
selecionardadosgrafico()

function exibirkpi1() {
    var idempresaVar = localStorage.idEmpresa
    // para teste
    idempresaVar = 1

    fetch(`/empresa/exibirkpi1/${idempresaVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
                prox_txt.innerHTML = resposta2.length

                novos_alertas.innerHTML = ""
                for (let i = 0; i < resposta2.length; i++) {
                    novos_alertas.innerHTML += `
                    <h2 class="nome_silo">Silo ${resposta2[i].nomeSilo} </h2> <br>
                    `
                }
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

var nomesilolength = 0
function exibirkpi2() {
    var idempresaVar = localStorage.idEmpresa
    // para teste
    idempresaVar = 1

    fetch(`/empresa/exibirkpi2/${idempresaVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
                if (nomesilolength != resposta2.length) {
                    nomesilolength = 0
                    disponibilidade_txt.innerHTML = ""
                    for (let i = 0; i < resposta2.length; i++) {
                        if (i == 0) {
                            disponibilidade_txt.innerHTML += `${resposta2[i].nomeSilo}`
                        } else {
                            disponibilidade_txt.innerHTML += `, ${resposta2[i].nomeSilo}`
                        }
                    }
                }
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function exibirkpi3() {
    var idempresaVar = localStorage.idEmpresa
    // para teste
    idempresaVar = 1

    fetch(`/empresa/exibirkpi3/${idempresaVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
                armazenagem_txt.innerHTML = resposta2[0].nomeSilo
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function exibirkpi4() {
    var idempresaVar = localStorage.idEmpresa
    // para teste
    idempresaVar = 1

    fetch(`/empresa/exibirkpi4/${idempresaVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
                alertas_txt.innerHTML = resposta2[0].total_alertas
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

var alertaslength = 0
function alertar() {
    var idempresaVar = localStorage.idEmpresa
    // para teste
    idempresaVar = 1

    fetch(`/empresa/alertar/${idempresaVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
                if (alertaslength != resposta2.length) {
                    alertaslength = resposta2.length
                    box_alertas.innerHTML = ""
                    for (let i = resposta2.length - 1; i >= 0; i--) {

                        const dtalerta = new Date(resposta2[i].dtCaptura);

                        const diaA = String(dtalerta.getDate()).padStart(2, '0');
                        const mesA = String(dtalerta.getMonth() + 1).padStart(2, '0');
                        const ano = String(dtalerta.getFullYear()).padStart(4, '0');
                        const horasA = String(dtalerta.getHours()).padStart(2, '0');
                        const minutosA = String(dtalerta.getMinutes()).padStart(2, '0');
                        const segundosA = String(dtalerta.getSeconds()).padStart(2, '0');

                        const datadalerta = `${diaA}/${mesA}/${ano} ${horasA}:${minutosA}:${segundosA}`;

                        var estado = resposta2[i].nome
                        box_alertas.innerHTML += `
                        <div class="caixinhas">
                            <img src="../img/Imagens-Site/Caution-Background-PNG.png" width="15%">
                            <div class="estado-alerta">
                                Silo ${resposta2[i].nomeSilo} em estado de alerta ${estado}!
                                <b style="font-size: 70%;">${datadalerta}</b>
                            </div>
                        </div>
                        `
                    }
                }
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function atualizarkpis() {
    setInterval(() => {
        exibirkpi1()
        exibirkpi2()
        exibirkpi3()
        exibirkpi4()
        alertar()
    }, 2000);
}

atualizardadosgrafico()
atualizarsilosbarra()
atualizarkpis()

exibirkpi1()
exibirkpi2()
exibirkpi3()
exibirkpi4()
alertar()