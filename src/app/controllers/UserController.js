const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const sendMail = require('../../utils/sendMail');
const crypto = require('crypto');

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
                const { password, role, refreshToken, ...userData } = user.toObject();
                // create accessToken
                const accessToken = generateAccessToken(userData?._id, role);
                // create refreshToken
                const refreshTokenNew = generateRefreshToken(userData?._id);
                // save refreshToken in db
                await User.findByIdAndUpdate(userData?._id, { refreshToken: refreshTokenNew }, { new: true });
                // save refreshToken in cookie
                res.cookie('refreshToken', refreshTokenNew, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

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

    // [POST] /api/v1/users/refreshToken
    refreshAccessToken = asyncHandler(async (req, res, next) => {
        const response = await User.findOne({ _id: req.user._id, refreshToken: req.user.refreshToken });
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? generateAccessToken(response.id, response.role) : 'Refresh token not matched',
        });
    });

    // [GET] /api/v1/users/logout
    logout = asyncHandler(async (req, res, next) => {
        const cookie = req.cookies;
        if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookie');
        // delete refresh token db
        await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true });
        // delete refresh token cookie
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        });

        return res.status(200).json({
            success: true,
            mes: 'Logout is done',
        });
    });

    // Client gửi email
    // Server check email có hợp lệ hay không => gửi email  + kèm theo link (password change token)
    // Client check email => click link
    // Client gửi api kèm token
    // Check token có giống token mà server gửi email hay không
    // Change password

    // [GET] /api/v1/users/forgotPassword
    forgotPassword = asyncHandler(async (req, res, next) => {
        const { email } = req.query;
        if (!email) throw new Error('Missing email!');
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found!');
        const resetToken = user.createPasswordChangedToken();
        await user.save();
        const data = {
            email,
            resetToken,
        };

        const info = await sendMail(data);

        return res.status(200).json({
            success: true,
            info,
        });
    });

    // [PUT] /api/v1/users/restPassword
    restPassword = asyncHandler(async (req, res, next) => {
        const { password, token } = req.body;
        if (!password || !token) throw new Error('Missing inputs');
        const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
        if (!user) throw new Error('Invalid reset token');
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordChangeAt = Date.now();
        user.passwordResetExpires = undefined;
        await user.save();
        return res.status(200).json({
            success: user ? true : false,
            mes: user ? 'Updated password done' : 'something went wrong',
        });
    });

    // [GET] /api/v1/users/getUsers
    getUsers = asyncHandler(async (req, res, next) => {
        const response = await User.find({}).select('-refreshToken -password -role');
        return res.status(200).json({
            success: response ? true : false,
            users: response,
        });
    });

    // [DELETE] /api/v1/users/
    deleteUser = asyncHandler(async (req, res, next) => {
        const { _id } = req.query;
        if (!_id) throw new Error('Missing inputs');
        const response = await User.findByIdAndDelete({ _id });
        return res.status(200).json({
            success: response ? true : false,
            deleteUser: response ? `User with useName: ${response.username} delete` : 'No user delete',
        });
    });

    // [PUT] /api/v1/users/userCurrent
    updateUser = asyncHandler(async (req, res, next) => {
        const { _id } = req.user;
        if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs');
        const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password, -role');
        return res.status(200).json({
            success: response ? true : false,
            UpdateUser: response ? response : 'Some thing went wrong',
        });
    });

    // [PUT] /api/v1/users/updateUserByAdmin
    updateUserByAdmin = asyncHandler(async (req, res, next) => {
        const { uid } = req.params;
        if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
        const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password, -role');
        return res.status(200).json({
            success: response ? true : false,
            UpdateUser: response ? response : 'Some thing went wrong',
        });
    });
}

module.exports = new UserController();
