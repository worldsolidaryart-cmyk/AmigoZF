document.addEventListener("DOMContentLoaded", carregarArtigosHome);

async function carregarArtigosHome() {

    try {

        const resposta = await fetch("data/articles.json");

        const artigos = await resposta.json();

        const recentes = artigos
            .filter(artigo => artigo.publicado)
            .sort((a, b) => new Date(b.data) - new Date(a.data))
            .slice(0, 2);

        const grid = document.querySelector(".articles-grid");

        if (!grid) return;

        grid.innerHTML = "";

        recentes.forEach(artigo => {

            grid.appendChild(criarCardArtigo(artigo));

        });

    }

    catch (erro) {

        console.error("Erro ao carregar artigos:", erro);

    }

}

function criarCardArtigo(artigo) {

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

        <h3>

            ${artigo.titulo}

        </h3>

        <p>

            ${artigo.resumo}

        </p>

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
