const express = require('express');
const app = express();
const axios = require("axios");

const PORT = 3000;

// Verificar se está rodando
app.listen(PORT, () => {
    console.log(`O express está rodando na porta ${PORT}`);
});

// Definindo view engine para ejs
app.set("view engine", "ejs");
app.set("views", "views"); // Definindo o diretório de views

// Configura o Express para servir arquivos estáticos a partir da pasta "public"
app.use(express.static("public"));

// Renderiza a página inicial
app.get("/", async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
    const breeds = Object.keys(response.data.message);
    res.render("index", { dog: null, error: null, breeds });
  } catch (error) {
    res.render("index", { dog: null, error: 'Erro ao buscar lista de raças', breeds: [] });
  }
});

// Rota chamada quando o usuário aperta o botão e busca uma raça de cachorro
app.get("/dog", async (req, res) => {
  const selectedBreed = req.query.breed;
  const customBreed = req.query.customBreed.toLowerCase();
  const breed = selectedBreed || customBreed;
  const APIUrl = `https://dog.ceo/api/breed/${breed}/images`;
  let dog;
  let error = null;
  let breeds = [];

  try {
    const response = await axios.get(APIUrl);
    const images = response.data.message;
    const randomImage = images[Math.floor(Math.random() * images.length)];
    dog = { message: randomImage };
    const breedsResponse = await axios.get('https://dog.ceo/api/breeds/list/all');
    breeds = Object.keys(breedsResponse.data.message);
    res.render("index", { dog, breed, error, breeds });
  } catch (err) {
    console.log(err.response ? err.response.data : err.message);
    if (err.response && err.response.status === 404) {
      error = `A raça ${breed} não está listada`;
    } else {
      error = "Algo deu errado, tente novamente";
    }
    const breedsResponse = await axios.get('https://dog.ceo/api/breeds/list/all');
    breeds = Object.keys(breedsResponse.data.message);
    res.render("index", { dog: null, error, breeds });
  }
});
