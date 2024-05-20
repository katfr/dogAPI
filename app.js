const express = require('express');
const app = express();
const axios = require("axios");

const PORT = 3000;

// Verificar se está rodando
app.listen(PORT, function(){
    console.log(`O express está rondando na porta ${PORT}`);
});

// Definindo view engine para ejs que vai renderizar as views da sua aplicação
// EJS é uma engine de templates que permite a inclusão de código JavaScript dentro de templates HTML. 
app.set("view engine", "ejs");

// Configura o Express para servir arquivos estáticos a partir da pasta "public"
app.use(express.static("public"));

// Renderiza a página inicial
app.get("/", (req, res) => {
  res.render("index", { dog: null, error: null });
});

// Rota chamada quando o usuário aperta o botão e busca uma raça de cachorro
app.get("/dog", async (req, res) => {    
    const breed = req.query.breed.toLowerCase();   // Obtem a raça do cachorro digitada pelo usuário    
    const APIUrl = `https://dog.ceo/api/breed/${breed}/images`;
    let dog;
    let error = null;

    try{
      const response = await axios.get(APIUrl); //faz uma requisição GET a API
      dog = response.data;
      //console.log(dog)
      res.render("index", { dog, breed, error }); //envia os dados retornados pela API para a view
    }catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);

      if (error.response) {
        if (error.response.status === 404) {
          error = `A raça ${breed} não está listada`; 
        }else{        
          error = "Algo deu errado, tente novamente"; 
        }       
      }else{
        error = "Erro na requisição. Tente novamente mais tarde."; 
      }
      res.render("index", {dog: null, error }); //envia o erro para o usuário na view
    }
});
