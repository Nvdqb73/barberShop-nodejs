const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../app/middlewares/verifyToken');

const userController = require('../app/controllers/UserController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/userCurrent', verifyAccessToken, userController.getUserCurrent);

module.exports = router;
