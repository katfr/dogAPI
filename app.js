const express = require('express');
const app = express();

const axios = require("axios");

const PORT = 3000;
// imprime no terminal 
app.listen(PORT, function(){
    console.log(`O express está rondando na porta ${PORT}`);
});
// app.listen(PORT, () => console.log(`O express está rondando na porta ${PORT}`));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for dog and error
app.get("/", (req, res) => {
  res.render("index", { dog: null, error: null });
});

// Handle the /dog route
app.get("/dog", async (req, res) => {
    // Get the breed from the query parameters
    const breed = req.query.breed;
    //const apiKey = "c6af79e25ae6c6d62396d439199274aa";
  
    // Add your logic here to fetch dog data from the API
    const APIUrl = `https://dog.ceo/api/breed/${breed}/images`;
    let dog;
    let error = null;
    try {
      const response = await axios.get(APIUrl);
      dog = response.data;
      console.log(dog)
      res.render("index", { dog, error });
    }catch (error) {
      dog = null;
      if (error.response.status == 404) {
        console.log(error.response.data);
        console.log(error.response.status);
        //console.log(error.response.headers);
        error = "O cachorro não foi encontrado"; 
      }else{        
        error = "Algo deu errado, tente novamente";        
      }
      res.render("index", {dog, error });
    }
    // Render the index template with the dog data and error message
    // res.render("index", { dog, error });
});
