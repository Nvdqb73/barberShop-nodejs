const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');

class UserController {
    // [POST] /api/v1/users/register
    register = asyncHandler(async (req, res, next) => {
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

    // [POST] /api/v1/users/login
    login = asyncHandler(async (req, res, next) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                mes: 'Missing inputs!',
            });
        }
        const user = await User.findOne({ username });
        if (user) {
            if (await user.isCheckPassword(password)) {
                const { password, role, ...userData } = user.toObject();
                // create accessToken
                const accessToken = generateAccessToken(userData?._id, role);
                // create refreshToken
                const refreshToken = generateRefreshToken(userData?._id);
                // save refreshToken in db
                await User.findByIdAndUpdate(userData?._id, { refreshToken }, { new: true });
                // save refreshToken in cookie
                res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

                return res.status(200).json({
                    success: true,
                    accessToken,
                    userData,
                });
            } else throw new Error('Invalid password!');
        } else throw new Error('Invalid username!');
    });

    // [GET] /api/v1/users/userCurrent
    getUserCurrent = asyncHandler(async (req, res, next) => {
        const { _id } = req.user;
        const user = await User.findById({ _id }).select('-refreshToken -password -role');

        return res.status(200).json({
            success: user ? true : false,
            result: user ? user : 'User not found!',
        });
    });

    // [GET] /api/v1/users/refreshToken
    refreshAccessToken = asyncHandler(async (req, res, next) => {
        const response = await User.findOne({ _id: req.user._id, refreshToken: req.user.refreshToken });
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? generateAccessToken(response.id, response.role) : 'Refresh token not matched',
        });
    });
}

module.exports = new UserController();
