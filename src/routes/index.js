const { notFound, handleError } = require('../app/middlewares/handleError');
const userRouter = require('./users');
const authRouter = require('./auth');
const workingHourRouter = require('./workingHour');
const serviceRouter = require('./services');
const branchRouter = require('./branch');
const employeeRouter = require('./employees');
const customerRouter = require('./customers');
const bookingRouter = require('./bookings');
const detailServiceRouter = require('./detailServices');
const calendarRouter = require('./calender');
// const authController = require('../app/controllers/AuthController');
// const { handleGoogleLogin } = require('../app/middlewares/verifyGoogleToken');

function route(app) {
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/calendar', calendarRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/workingHours', workingHourRouter);
    app.use('/api/v1/services', serviceRouter);
    app.use('/api/v1/branch', branchRouter);
    app.use('/api/v1/employees', employeeRouter);
    app.use('/api/v1/customers', customerRouter);
    app.use('/api/v1/bookings', bookingRouter);
    app.use('/api/v1/detailServices', detailServiceRouter);
    // app.use('/callback', [handleGoogleLogin], authController.resultLoginGoogle);

    app.use(notFound);
    app.use(handleError);
}

module.exports = route;
