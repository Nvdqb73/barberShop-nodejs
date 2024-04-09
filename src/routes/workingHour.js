const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../app/middlewares/verifyToken');
const { isAdmin } = require('../app/middlewares/verifyPermissions');
const { validateTimeWorkingHour } = require('../app/middlewares/validateTime');

const workingHourController = require('../app/controllers/WorkingHourController');

router.post('/create', [verifyAccessToken, isAdmin, validateTimeWorkingHour], workingHourController.create);
router.put('/update/:whId', [verifyAccessToken, isAdmin, validateTimeWorkingHour], workingHourController.update);
router.delete('/delete/:whId', [verifyAccessToken, isAdmin], workingHourController.delete);
router.get('/', workingHourController.getAll);
router.get('/:whId', workingHourController.getById);
module.exports = router;
