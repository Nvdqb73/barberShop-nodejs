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

module.exports = { validateTimeWorkingHour };
