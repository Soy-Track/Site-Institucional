var silo1 = 0
var silo2 = 0
var silo3 = 0
var silo4 = 0
var silo5 = 0
var silo6 = 0

// Toneladas de soja totais que cabem dentro de 6 silos de 7m por 3,5r
var total_silos = 1452.405 / 6
// Toneladas de soja que cabem dentro de um sétimo de um silo
var setimo_silo = total_silos / 7
// Total de soja armazenada em todos os silos
var total_armazenado = 0
// Total disponível nos silos para armazenamento
var total_livre = 1452.405

var irregular = 0

function calcular() {
    var exibir_silo1 = silo1 * setimo_silo
    var exibir_silo2 = silo2 * setimo_silo
    var exibir_silo3 = silo3 * setimo_silo
    var exibir_silo4 = silo4 * setimo_silo
    var exibir_silo5 = silo5 * setimo_silo
    var exibir_silo6 = silo6 * setimo_silo

    total_armazenado = exibir_silo1 + exibir_silo2 + exibir_silo3 + exibir_silo4 + exibir_silo5 + exibir_silo6
    total_livre = total_livre - total_armazenado

    //disponibilidade_txt.innerHTML = `${total_livre.toFixed(3)}t`
    //armazenagem_txt.innerHTML = `${total_armazenado.toFixed(3)}t`
}

calcular()