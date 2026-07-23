class ArticleService {

    static getTodos() {

        return [...window.ARTICLES]
            .filter(artigo => artigo.publicado)
            .sort((a, b) => new Date(b.data) - new Date(a.data));

    }

    static getRecentes(quantidade = 2) {

        return this.getTodos().slice(0, quantidade);

    }

    static getPorId(id) {

        return this.getTodos().find(
            artigo => artigo.id === id
        );

    }

    static getCategorias() {

        return [...new Set(
            this.getTodos().map(
                artigo => artigo.categoria
            )
        )].sort();

    }

    static getPorCategoria(categoria) {

        return this.getTodos().filter(
            artigo => artigo.categoria === categoria
        );

    }

    static pesquisar(texto) {

        texto = texto.toLowerCase();

        return this.getTodos().filter(artigo =>

            artigo.titulo.toLowerCase().includes(texto)

            ||

            artigo.resumo.toLowerCase().includes(texto)

            ||

            artigo.palavrasChave.some(chave =>

                chave.toLowerCase().includes(texto)

            )

        );

    }

    static getRelacionados(id, limite = 3) {

        const atual = this.getPorId(id);

        if (!atual) return [];

        return this.getTodos()

            .filter(artigo =>

                artigo.id !== atual.id

                &&

                artigo.categoria === atual.categoria

            )

            .slice(0, limite);

    }

}
