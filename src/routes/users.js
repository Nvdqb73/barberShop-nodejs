const express = require('express');
const router = express.Router();
const { verifyAccessToken, verifyRefreshToken } = require('../app/middlewares/verifyToken');

const userController = require('../app/controllers/UserController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/userCurrent', verifyAccessToken, userController.getUserCurrent);
router.post('/refreshToken', verifyRefreshToken, userController.refreshAccessToken);

module.exports = router;
