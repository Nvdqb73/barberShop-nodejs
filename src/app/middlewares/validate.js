const asyncHandler = require('express-async-handler');

const validateTimeWorkingHour = asyncHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    const { startTime, endTime } = req.body;
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
        return res.status(400).send('Invalid time format. Please use "HH:mm" format.');
    }

    next();
});

const validatePhone = asyncHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    const { phone } = req.body;

    if (phone) {
        const phoneRegex = /^(\+84|0)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/;

        if (!phoneRegex.test(phone)) {
            return res.status(400).send('Invalid phone format!');
        }

        next();
    }

    next();
});

module.exports = { validateTimeWorkingHour, validatePhone };
