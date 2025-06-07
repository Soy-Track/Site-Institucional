function sair() {
    localStorage.removeItem("idEmpresa");
    localStorage.removeItem("nivel");
    localStorage.removeItem("nome");

    window.location.href = "../index.html"
}