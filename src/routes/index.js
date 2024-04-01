const { notFound, handleError } = require('../app/middlewares/handleError');
const userRouter = require('./users');

function route(app) {
    app.use('/api/v1/users', userRouter);
    app.use(notFound);
    app.use(handleError);
}

module.exports = route;
