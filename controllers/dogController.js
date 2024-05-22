const axios = require("axios"); // Importa o módulo 'axios' para fazer requisições HTTP

// Método para buscar uma imagem de cachorro de uma raça específica
exports.getDogByBreed = async (req, res) => {
    const selectedBreed = req.query.breed; // Obtém a raça selecionada pelo usuário
    const customBreed = req.query.customBreed ? req.query.customBreed.toLowerCase() : ''; // Obtém a raça personalizada (se houver) e converte para minúsculas
    const breed = selectedBreed || customBreed; // Usa a raça selecionada ou a personalizada
    const APIUrl = `https://dog.ceo/api/breed/${breed}/images`; // Monta a URL da API para buscar imagens da raça
    let dog;
    let error = null;
    let breeds = [];

    try {
        // Faz uma requisição à API para obter imagens da raça especificada
        const response = await axios.get(APIUrl);
        const images = response.data.message; // Extrai as imagens da resposta da API
        const randomImage = images[Math.floor(Math.random() * images.length)]; // Seleciona uma imagem aleatória
        dog = { message: randomImage }; // Cria um objeto 'dog' com a imagem selecionada

        // Faz uma requisição à API para obter a lista de raças de cachorros
        const breedsResponse = await axios.get('https://dog.ceo/api/breeds/list/all');
        breeds = Object.keys(breedsResponse.data.message); // Extrai as raças da resposta da API

        // Renderiza a página inicial ('index') passando a imagem do cachorro, a raça, e a lista de raças
        res.render("index", { dog, breed, error, breeds });
    } catch (err) {
        console.log(err.response ? err.response.data : err.message); // Loga o erro para depuração

        // Define a mensagem de erro com base no status da resposta da API
        if (err.response && err.response.status === 404) {
            error = `A raça ${breed} não está listada`;
        } else {
            error = "Algo deu errado, tente novamente";
        }

        // Faz uma requisição à API para obter a lista de raças de cachorros
        const breedsResponse = await axios.get('https://dog.ceo/api/breeds/list/all');
        breeds = Object.keys(breedsResponse.data.message); // Extrai as raças da resposta da API

        // Renderiza a página inicial ('index') com a mensagem de erro e a lista de raças
        res.render("index", { dog: null, error, breeds });
    }
};
