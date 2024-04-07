const asyncHandler = require('express-async-handler');

const isAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.status(401).json({
            success: false,
            mes: 'Require admin role!',
        });
    }
    next();
});

module.exports = { isAdmin };
