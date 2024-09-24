const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../app/middlewares/verifyToken');
const { isAdmin } = require('../app/middlewares/verifyPermissions');
const { updateBookingEndTime } = require('../app/middlewares/validate');

const bookingController = require('../app/controllers/BookingController');

router.post('/create', [updateBookingEndTime], bookingController.create);
router.get('/trash', [verifyAccessToken, isAdmin], bookingController.getTrash);
router.get('/', bookingController.getAll);
router.get('/:bId', bookingController.getById);
router.put('/:bId', [verifyAccessToken, isAdmin], bookingController.update);
router.patch('/:bId/restore', bookingController.restore);
router.delete('/:bId', bookingController.softDelete);
router.delete('/:bId/force', [verifyAccessToken, isAdmin], bookingController.forceDestroy);

module.exports = router;
