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
        const selectsilo = document.getElementById('silo_selecionado');
        const novaopcaosilo = document.createElement('option');

        novaopcaosilo.value = i;
        novaopcaosilo.textContent = `silo${i}`;

        selectsilo.appendChild(novaopcaosilo);
    }

    graficoLinha.data.datasets[0].data = dia
    graficoLinha.update()
}

var siloselecionado = 1
function atualizarGraficos() {
    atualizaralerta()
    atualizarbarrinha()
    for (let i = 1; i <= qtd_silos; i++) {
        if (silo_selecionado.value == i) {
            siloselecionado = i
            console.log(siloselecionado)
            vt_ultimos7 = []
            selecionardadosgrafico()
        }
    }
    graficoLinha.data.datasets[0].data = dia
    graficoLinha.update()

    prox_txt.innerHTML = `Silo ${siloselecionado}`
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
                },
                min: 0,
                max: 7.9,
                ticks: {
                    stepSize: 1
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
                },
                min: 0,
                max: 7,
                ticks: {
                    stepSize: 1
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

atualizarGraficos()

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
                for (let i = 0; i < 7; i++) {

                }
                iniciarsilos()
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
selecionardadosgrafico()

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
                    atualizarGraficos()
                })
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }, 2000);
}

var valor_atual = 0
function exibirbarrinha() {
    var idempresaVar = localStorage.idEmpresa
    var nomesiloVar = siloselecionado
    console.log("socorro", nomesiloVar)
    // para teste
    idempresaVar = 1

    fetch(`/empresa/exibirbarrinha/${idempresaVar}/${nomesiloVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                valor_atual = resposta2[0].distancia
                graficoBarra.data.labels.push(`silo${siloselecionado}`);
                graficoBarra.data.datasets[0].data.push(resposta2[0].distancia)
                graficoBarra.update()
                calcularTON(valor_atual)
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function atualizarbarrinha() {
    setInterval(() => {
        var idempresaVar = localStorage.idEmpresa
        var nomesiloVar = siloselecionado
        console.log("socorro", nomesiloVar)
        // para teste
        idempresaVar = 1

        fetch(`/empresa/exibirbarrinha/${idempresaVar}/${nomesiloVar}`, {
            method: "GET",
        })
            .then(function (resposta) {
                resposta.json().then((resposta2) => {
                    valor_atual = resposta2[0].distancia
                    console.log("valor_atual", valor_atual)
                    graficoBarra.data.labels[0] = (`silo${siloselecionado}`);
                    graficoBarra.data.datasets[0].data[0] = (resposta2[0].distancia)
                    graficoBarra.update()
                    calcularTON(valor_atual)
                })
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }, 2000);
}

function calcularTON(valor_ocupado) {
    var idempresaVar = localStorage.idEmpresa
    var nomesiloVar = siloselecionado
    // para teste
    idempresaVar = 1

    fetch(`/empresa/calcularTON/${idempresaVar}/${nomesiloVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                // Variáveis que determinam o tamanho do silo
                var vertical = Number(resposta2[0].altura)
                var horizontal = Number(resposta2[0].raio)
                // Variáveis que determinam o volume disponível/ocupado no silo
                var volume_dispo = (Math.PI * Math.pow(horizontal, 2) * (vertical - valor_ocupado)).toFixed(2);
                var volume_ocupado = (Math.PI * Math.pow(horizontal, 2) * valor_ocupado).toFixed(2);
                // Variáveis que calculam a massa dos grãos
                var toneladas_dispo = ((volume_dispo * 770) / 1000).toFixed(2)
                var toneladas_ocupado = ((volume_ocupado * 770) / 1000).toFixed(2)
                //exibindo os resultados
                disponibilidade_txt.innerHTML = `${toneladas_dispo}t`
                armazenagem_txt.innerHTML = `${toneladas_ocupado}t`
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

var ultimadata = ""
function alertarsilo() {
    var idempresaVar = localStorage.idEmpresa
    var nomesiloVar = siloselecionado
    // para teste
    idempresaVar = 1

    fetch(`/empresa/alertarsilo/${idempresaVar}/${nomesiloVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            box_alertas.innerHTML = ""
            resposta.json().then((resposta2) => {
                for (let i = 0; i < resposta2.length; i++) {
                    ultimadata = resposta2[0].dtCaptura

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
                            <img src="../img/Imagens-Site/Caution-Background-PNG.png" width="15%" />
                            <div class="estado-alerta">
                            Silo ${resposta2[i].nomeSilo} em estado de alerta ${estado}!
                            <b style="font-size: 70%">${datadalerta}</b>
                            </div>
                        </div>
                        `
                }
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function atualizaralerta() {
    setInterval(() => {
        var idempresaVar = localStorage.idEmpresa
        var nomesiloVar = siloselecionado
        // para teste
        idempresaVar = 1

        fetch(`/empresa/alertarsilo/${idempresaVar}/${nomesiloVar}`, {
            method: "GET",
        })
            .then(function (resposta) {
                resposta.json().then((resposta2) => {
                    console.log("teste vai", resposta2)
                    if (resposta2.length == 0) {
                        box_alertas.innerHTML = `
                        <div class="caixinhas">
                                <div style="text-align: center;" class="estado-alerta">
                                Este silo não possui nenhum alerta no momento!
                                </div>
                            </div>
                        `
                    } else if (ultimadata != resposta2[0].dtCaptura) {
                        ultimadata = resposta2[0].dtCaptura
                        box_alertas.innerHTML = ""

                        for (let i = 0; i < resposta2.length; i++) {

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
                                <img src="../img/Imagens-Site/Caution-Background-PNG.png" width="15%" />
                                <div class="estado-alerta">
                                Silo ${resposta2[i].nomeSilo} em estado de alerta ${estado}!
                                <b style="font-size: 70%">${datadalerta}</b>
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
    }, 2000);
}

function contagemsilos() {
    var idempresaVar = localStorage.idEmpresa
    var nomesiloVar = siloselecionado
    // para teste
    idempresaVar = 1

    fetch(`/empresa/contagemsilos/${idempresaVar}/${nomesiloVar}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log("ai que odio", resposta2)
                total_alertas_txt.innerHTML = resposta2[0].qtd_alertas
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function atualizar() {
    setInterval(() => {
        contagemsilos()
    }, 2000);
}

atualizar()

contagemsilos()

atualizardadosgrafico()
atualizarbarrinha()
atualizaralerta()

alertarsilo()
exibirbarrinha()