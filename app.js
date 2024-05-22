const express = require('express'); // Importa o módulo Express
const path = require('path'); // Importa o módulo 'path' para trabalhar com diretórios e caminhos de arquivos
const app = express(); // Cria uma instância do Express
const rotas = require('./routes/rotas'); // Importa as rotas definidas em 'routes/index.js'

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Configurações de view engine e múltiplas pastas de views
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'templates')]); // Define os diretórios de views
app.set('view engine', 'ejs'); // Define 'ejs' como a view engine
app.engine('html', require('ejs').renderFile); // Configura a view engine para renderizar arquivos HTML


// Middleware para usar as rotas definidas
app.use('/', rotas);

// Middleware para tratar erro 404
app.use((req, res, next) => {
  res.status(404).render('404', { url: req.url });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
