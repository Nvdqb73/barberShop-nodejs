const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    const tokenFully = req?.headers?.authorization;
    if (tokenFully?.startsWith('Bearer')) {
        const token = tokenFully.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    mes: 'Invalid access token!',
                });
            }
            req.user = decode;
            next();
        });
    } else {
        return res.status(401).json({
            success: false,
            mes: 'Error require authentication!',
        });
    }
});

const verifyRefreshToken = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookie');
    jwt.verify(cookie.refreshToken, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({
                success: false,
                mes: 'Invalid refresh token!',
            });
        }
        req.user = {
            _id: decode._id,
            refreshToken: cookie.refreshToken,
        };
        next();
    });
});

module.exports = { verifyAccessToken, verifyRefreshToken };
