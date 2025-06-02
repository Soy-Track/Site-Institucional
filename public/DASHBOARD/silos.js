var dia = [0, 7]
silo_selecionado.value = 1

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

const graficoLinha = new Chart(
    document.getElementById('graficoLinha'),
    config
);

var qtd_silos = 0

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
                carregarselect()
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
contarsilos()

let i = 1
function carregarselect() {
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
}


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
                carregarselect()
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}