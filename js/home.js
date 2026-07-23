document.addEventListener("DOMContentLoaded", iniciarHome);

function iniciarHome() {

    const artigos = ArticleService.getRecentes(2);

    renderizarArtigos(artigos);

}
