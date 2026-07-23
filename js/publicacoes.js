document.addEventListener("DOMContentLoaded", iniciarPublicacoes);

function iniciarPublicacoes() {

    carregarLista();

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (id) {

        abrirArtigo(id);

    } else {

        const primeiro = ArticleService.getRecentes(1)[0];

        if (primeiro) {

            abrirArtigo(primeiro.id);

        }

    }

    configurarPesquisa();

}

function carregarLista() {

    const lista = document.getElementById("articles-list");

    if (!lista) return;

    lista.innerHTML = "";

    const artigos = ArticleService.getTodos();

    artigos.forEach(artigo => {

        const item = document.createElement("button");

        item.className = "article-item";

        item.dataset.id = artigo.id;

        item.innerHTML = `
            <span class="categoria">${artigo.categoria}</span>
            <strong>${artigo.titulo}</strong>
        `;

        item.addEventListener("click", () => {

            abrirArtigo(artigo.id);

            history.replaceState(
                {},
                "",
                `?id=${artigo.id}`
            );

        });

        lista.appendChild(item);

    });

}

function abrirArtigo(id) {

    const artigo = ArticleService.getPorId(id);

    if (!artigo) return;

    destacarArtigo(id);

    const view = document.getElementById("article-view");

    view.innerHTML = "";

    const data = new Date(artigo.data);

    const dataFormatada = data.toLocaleDateString("pt-BR", {

        day: "2-digit",

        month: "long",

        year: "numeric"

    });

    view.innerHTML = `

        <span class="categoria">

            ${artigo.categoria}

        </span>

        <h1>

            ${artigo.titulo}

        </h1>

        <div class="article-meta">

            ${dataFormatada}
            •
            ${artigo.tempoLeitura}

        </div>

        ${
            artigo.imagem
                ? `<img src="${artigo.imagem}" class="article-image" alt="${artigo.titulo}">`
                : ""
        }

        <div id="article-content"></div>

    `;

    const conteudo = document.getElementById("article-content");

    artigo.conteudo.forEach(bloco => {

        switch (bloco.tipo) {

            case "titulo":

                conteudo.innerHTML += `
                    <h2>${bloco.texto}</h2>
                `;

                break;

            case "paragrafo":

                conteudo.innerHTML += `
                    <p>${bloco.texto}</p>
                `;

                break;

            case "lista":

                conteudo.innerHTML += `
                    <ul>
                        ${bloco.itens
                            .map(item => `<li>${item}</li>`)
                            .join("")}
                    </ul>
                `;

                break;

        }

    });

}

function destacarArtigo(id) {

    document
        .querySelectorAll(".article-item")
        .forEach(item => {

            item.classList.remove("active");

            if (item.dataset.id === id) {

                item.classList.add("active");

            }

        });

}

function configurarPesquisa() {

    const input = document.getElementById("article-search");

    if (!input) return;

    input.addEventListener("input", () => {

        const termo = input.value.toLowerCase();

        document
            .querySelectorAll(".article-item")
            .forEach(item => {

                item.style.display =
                    item.textContent
                        .toLowerCase()
                        .includes(termo)
                    ? ""
                    : "none";

            });

    });

}
