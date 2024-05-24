const axios = require("axios"); // Importa o módulo 'axios' para fazer requisições HTTP

// Método para renderizar a página inicial
exports.renderHomePage = async (req, res) => {
    try {
        const breedsResponse = await axios.get('https://dog.ceo/api/breeds/list/all');
        const breeds = Object.keys(breedsResponse.data.message);
        const breed = req.query.breed || ''; // Definindo breed como vazio se não estiver definido na query
        res.render("index", { dog: null, error: null, breeds, breed });
      } catch (error) {
        console.error('Erro ao carregar a página inicial:', error);
        res.render("index", { dog: null, error: 'Erro ao carregar a página inicial', breeds: [], breed: '' });
      }
};