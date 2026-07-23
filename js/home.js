document.addEventListener("DOMContentLoaded", iniciarHome);

async function iniciarHome() {

    const artigos = await ArticleService.getRecentes(2);

    renderizarArtigos(artigos);

}

function renderizarArtigos(artigos) {

    const grid = document.querySelector(".articles-grid");

    if (!grid) return;

    grid.innerHTML = "";

    artigos.forEach(artigo => {

        grid.appendChild(criarCard(artigo));

    });

}

function criarCard(artigo) {

    const card = document.createElement("article");

    card.className = "article-card";

    const data = new Date(artigo.data);

    const dataFormatada = data.toLocaleDateString("pt-BR", {

        month: "long",

        year: "numeric"

    });

    card.innerHTML = `

        <span class="article-date">

            ${capitalizar(dataFormatada)}

        </span>

        <h3>${artigo.titulo}</h3>

        <p>${artigo.resumo}</p>

        <a
            href="publicacoes.html?id=${artigo.id}"
            class="article-link">

            Ler artigo completo →

        </a>

    `;

    return card;

}

function capitalizar(texto) {

    return texto.charAt(0).toUpperCase() + texto.slice(1);

}
