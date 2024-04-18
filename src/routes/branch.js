const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../app/middlewares/verifyToken');
const { isAdmin } = require('../app/middlewares/verifyPermissions');
const { validatePhone } = require('../app/middlewares/validate');

const branchController = require('../app/controllers/BranchController');

router.post('/create', [verifyAccessToken, isAdmin], branchController.create);
router.get('/', branchController.getAll);
router.get('/:bId', branchController.getById);
router.put('/:bId', [verifyAccessToken, isAdmin, validatePhone], branchController.update);
router.delete('/:bId', [verifyAccessToken, isAdmin], branchController.delete);

module.exports = router;
