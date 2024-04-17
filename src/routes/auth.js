const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.get('/google', authController.loginGoogle);
router.get('/google/callback', authController.resultLoginGoogle);

module.exports = router;
