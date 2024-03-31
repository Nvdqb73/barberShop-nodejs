const userRouter = require('./users');

function route(app) {
    app.use('/api/v1/users', userRouter);

    app.use('/', (req, res) => {
        res.send('SERVER ON');
    });
}

module.exports = route;
