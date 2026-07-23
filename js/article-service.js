class ArticleService {

    static getTodos() {

        return [...window.ARTICLES]
            .filter(artigo => artigo.publicado)
            .sort((a, b) => new Date(b.data) - new Date(a.data));

    }

    static getRecentes(qtd = 2) {

        return this.getTodos().slice(0, qtd);

    }

    static getPorId(id) {

        return this.getTodos().find(a => a.id === id);

    }

    static getCategorias() {

        return [...new Set(
            this.getTodos().map(a => a.categoria)
        )].sort();

    }

}
