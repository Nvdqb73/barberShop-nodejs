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
                    mes: 'invalid access token',
                });
            }
            console.log(decode);
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

module.exports = { verifyAccessToken };
