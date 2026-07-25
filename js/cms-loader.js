async function carregarArtigosDoCMS() {
    const repoOwner = "worldsolidaryart-cmyk";
    const repoName = "AmigoZF";
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/content/articles`;

    try {
        const res = await fetch(url);
        if (!res.ok) return;

        const files = await res.json();

        for (const file of files) {
            if (file.name.endsWith('.md')) {
                const response = await fetch(file.download_url);
                const text = await response.text();

                const partes = text.split('---');
                if (partes.length >= 3) {
                    const cabecalho = partes[1];
                    const corpoMarkdown = partes.slice(2).join('---').trim();

                    const getValor = (chave) => {
                        const match = cabecalho.match(new RegExp(`${chave}:\\s*"?([^"\\n]+)"?`));
                        return match ? match[1].trim() : null;
                    };

                    const blocos = corpoMarkdown.split('\n\n').map(bloco => {
                        const texto = bloco.trim();
                        if (texto.startsWith('## ')) {
                            return { tipo: "titulo", texto: texto.replace('## ', '') };
                        } else if (texto.startsWith('* ') || texto.startsWith('- ')) {
                            const itens = texto.split('\n').map(i => i.replace(/^[\*\-]\s*/, ''));
                            return { tipo: "lista", itens: itens };
                        } else {
                            return { tipo: "paragrafo", texto: texto };
                        }
                    });

                    const novoArtigo = {
                        id: getValor('id') || file.name.replace('.md', ''),
                        titulo: getValor('titulo') || 'Sem Título',
                        categoria: getValor('categoria') || 'Geral',
                        autor: getValor('autor') || 'Amigo Z. F.',
                        data: getValor('data') || new Date().toISOString().split('T')[0],
                        imagem: getValor('imagem') || '',
                        resumo: getValor('resumo') || '',
                        tempoLeitura: getValor('tempoLeitura') || '5 min',
                        destaque: getValor('destaque') === 'true',
                        publicado: getValor('publicado') !== 'false',
                        palavrasChave: [],
                        conteudo: blocos
                    };

                    if (typeof window.ARTICLES !== 'undefined') {
                        const index = window.ARTICLES.findIndex(a => a.id === novoArtigo.id);
                        if (index !== -1) {
                            window.ARTICLES[index] = novoArtigo;
                        } else {
                            window.ARTICLES.push(novoArtigo);
                        }
                    }
                }
            }
        }

        // Atualiza a tela se as funções do seu site existirem
        if (typeof iniciarHome === "function" && document.querySelector(".articles-grid")) {
            iniciarHome();
        }
        if (typeof iniciarPublicacoes === "function" && document.getElementById("articles-list")) {
            iniciarPublicacoes();
        }

    } catch (err) {
        console.error("Erro ao carregar artigos do CMS:", err);
    }
}

document.addEventListener("DOMContentLoaded", carregarArtigosDoCMS);
