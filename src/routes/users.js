const express = require('express');
const router = express.Router();
const { verifyAccessToken, verifyRefreshToken } = require('../app/middlewares/verifyToken');
const { isAdmin } = require('../app/middlewares/verifyPermissions');

const userController = require('../app/controllers/UserController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/userCurrent', [verifyAccessToken], userController.getUserCurrent);
router.post('/refreshToken', [verifyRefreshToken], userController.refreshAccessToken);
router.get('/logout', userController.logout);
router.get('/forgotPassword', userController.forgotPassword);
router.put('/restPassword', userController.restPassword);
router.get('/', [verifyAccessToken, isAdmin], userController.getUsers);
router.delete('/', [verifyAccessToken, isAdmin], userController.deleteUser);
router.put('/userCurrent', [verifyAccessToken], userController.updateUser);
router.put('/:uid', [verifyAccessToken, isAdmin], userController.updateUserByAdmin);

module.exports = router;
