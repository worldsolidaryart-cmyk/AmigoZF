class ArticleService {

    static async getTodos() {

        const resposta = await fetch("data/articles.json");

        const artigos = await resposta.json();

        return artigos
            .filter(artigo => artigo.publicado)
            .sort((a, b) => new Date(b.data) - new Date(a.data));

    }

    static async getRecentes(qtd = 2) {

        const artigos = await this.getTodos();

        return artigos.slice(0, qtd);

    }

    static async getPorId(id) {

        const artigos = await this.getTodos();

        return artigos.find(a => a.id === id);

    }

    static async getCategorias() {

        const artigos = await this.getTodos();

        return [...new Set(artigos.map(a => a.categoria))];

    }

}
