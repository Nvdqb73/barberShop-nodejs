const asyncHandler = require('express-async-handler');
const { body } = require('express-validator');

const validateRegisterUser = () => {
    return [
        body('username', 'username does not Empty').not().isEmpty(),
        body('username', 'username must be Alphanumeric').isAlphanumeric(),
        body('username', 'Username more than 6 digits').isLength({ min: 6 }),
        body('email', 'Email dose not Empty').not().isEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('password', 'password more than 6 digits').isLength({ min: 6 }),
        body('password', 'Password does not meet the strength requirements').isStrongPassword({
            minNumbers: 1,
            minSymbols: 1,
            minLowercase: 1,
            minUppercase: 1,
        }),
    ];
};

const validateLogin = () => {
    return [
        body('username', 'username does not Empty').not().isEmpty(),
        body('username', 'username must be Alphanumeric').isAlphanumeric(),
        body('username', 'Username more than 6 digits').isLength({ min: 6 }),
        body('password', 'password more than 6 digits').isLength({ min: 6 }),
        body('password', 'Password does not meet the strength requirements').isStrongPassword({
            minNumbers: 1,
            minSymbols: 1,
            minLowercase: 1,
            minUppercase: 1,
        }),
    ];
};

const validateTime = asyncHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    const { startTime, endTime } = req.body;

    if (startTime || endTime) {
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (startTime === undefined || endTime === undefined) {
            if (!timeRegex.test(startTime) && !timeRegex.test(endTime)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid time format. Please use "HH:mm" format.',
                });
            }
            return next();
        }
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid time format. Please use "HH:mm" format.',
            });
        }
        next();
    } else {
        next();
    }
});

const validatePhone = asyncHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    const { phone } = req.body;

    if (phone) {
        const phoneRegex = /^(\+84|0)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/;

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid phone format!',
            });
        }

        next();
    }

    next();
});

module.exports = { validateTime, validatePhone, validateRegisterUser, validateLogin };
