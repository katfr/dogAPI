// Middleware para tratar erro 404 - Página não encontrada
module.exports = (req, res, next) => {
    res.status(404).render('404', { url: req.url });
};
