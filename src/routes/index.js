const { notFound, errHandler } = require('../app/middlewares/errHandler');
const userRouter = require('./users');

function route(app) {
    app.use('/api/v1/users', userRouter);
    app.use(notFound);
    app.use(errHandler);
}

module.exports = route;
