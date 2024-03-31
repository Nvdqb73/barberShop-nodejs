const asyncHandler = require('express-async-handler');
const User = require('../models/User');

class UserController {
    // [POST] /api/v1/users/register
    register = asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                mes: 'Missing inputs!',
            });
        }

        const response = await User.create(req.body);
        return res.status(200).json({
            success: response ? true : false,
            response,
        });
    });
}

module.exports = new UserController();
