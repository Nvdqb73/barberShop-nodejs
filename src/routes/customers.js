const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../app/middlewares/verifyToken');
const { isAdmin, isUIdExistEmployee } = require('../app/middlewares/verifyPermissions');

const customerController = require('../app/controllers/CustomerController');

router.post('/create', [isUIdExistEmployee], customerController.create);
router.get('/', customerController.getAll);
router.get('/:cId', customerController.getById);
router.put('/:cId', [verifyAccessToken, isUIdExistEmployee], customerController.update);
router.delete('/:cId', [verifyAccessToken, isAdmin], customerController.delete);

module.exports = router;
