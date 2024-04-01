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

        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            if (user?.username === username && user?.email === email)
                throw new Error('Username & Email already exists!!');
            else if (user?.username === username) throw new Error('Username already exists!!');
            else throw new Error('Email already exists!!');
        } else {
            const newUser = await User.create(req.body);
            return res.status(200).json({
                success: newUser ? true : false,
                mes: newUser ? 'Register is successfully' : 'Something went wrong',
                newUser,
            });
        }
    });
}

module.exports = new UserController();
