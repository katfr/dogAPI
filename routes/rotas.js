const express = require('express');
const router = express.Router(); // Cria um roteador para gerenciar as rotas
const homeController = require('../controllers/homeController'); // Importa o controller da página inicial
const dogController = require('../controllers/dogController'); // Importa o controller de cachorros

// Define a rota para a página inicial e associa ao método 'renderHomePage' do 'homeController'
router.get("/", homeController.renderHomePage);

// Define a rota para buscar uma raça de cachorro e associa ao método 'getDogByBreed' do 'dogController'
router.get("/dog", dogController.getDogByBreed);

module.exports = router; // Exporta o roteador para ser usado em 'app.js'
