document.addEventListener("DOMContentLoaded", carregarArtigosHome);

async function carregarArtigosHome() {
    try {

        const resposta = await fetch("data/articles.json");
        const artigos = await resposta.json();

        const publicados = artigos
            .filter(a => a.publicado)
            .sort((a, b) => new Date(b.data) - new Date(a.data))
            .slice(0, 2);

        const container = document.querySelector(".articles-grid");

        if (!container) return;

        container.innerHTML = "";

        publicados.forEach(artigo => {

            const data = new Date(artigo.data);

            const dataFormatada = data.toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric"
            });

            container.innerHTML += `
                <article class="article-card">

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

                </article>
            `;
        });

    } catch (erro) {

        console.error("Erro ao carregar artigos:", erro);

    }
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
