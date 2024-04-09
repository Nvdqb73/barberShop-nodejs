const { notFound, handleError } = require('../app/middlewares/handleError');
const userRouter = require('./users');
const workingHourRouter = require('./workingHour');

function route(app) {
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/workingHours', workingHourRouter);

    app.use(notFound);
    app.use(handleError);
}

module.exports = route;
