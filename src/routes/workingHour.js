const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../app/middlewares/verifyToken');
const { isAdmin } = require('../app/middlewares/verifyPermissions');
const { validateTime } = require('../app/middlewares/validate');

const workingHourController = require('../app/controllers/WorkingHourController');

router.post('/create', [verifyAccessToken, isAdmin, validateTime], workingHourController.create);
router.get('/', workingHourController.getAll);
router.get('/:whId', workingHourController.getById);
router.put('/:whId', [verifyAccessToken, isAdmin, validateTime], workingHourController.update);
router.delete('/:whId', [verifyAccessToken, isAdmin], workingHourController.delete);
module.exports = router;
