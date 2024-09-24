const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../app/middlewares/verifyToken');
const { isAdmin, isUIdExistCustomer } = require('../app/middlewares/verifyPermissions');

const employeeController = require('../app/controllers/EmployeeController');

router.post('/create', employeeController.create);
router.get('/', employeeController.getAll);
router.get('/:eId', employeeController.getById);
router.put('/:eId', [verifyAccessToken, isAdmin, isUIdExistCustomer], employeeController.update);
router.delete('/:eId', [verifyAccessToken, isAdmin], employeeController.delete);

module.exports = router;
