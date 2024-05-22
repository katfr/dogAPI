const axios = require("axios"); // Importa o módulo 'axios' para fazer requisições HTTP

// Método para renderizar a página inicial
exports.renderHomePage = async (req, res) => {
    try {
        // Faz uma requisição à API para obter a lista de raças de cachorros
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        const breeds = Object.keys(response.data.message); // Extrai as raças da resposta da API
        // Renderiza a página inicial ('index') passando as raças obtidas
        res.render("index", { dog: null, error: null, breeds });
    } catch (error) {
        // Em caso de erro, renderiza a página inicial com uma mensagem de erro e uma lista de raças vazia
        res.render("index", { dog: null, error: 'Erro ao buscar lista de raças', breeds: [] });
    }
};
