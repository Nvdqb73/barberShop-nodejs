function route(app) {
    app.use('/', (req, res) => {
        res.send('SERVER ON');
    });
}

module.exports = route;
