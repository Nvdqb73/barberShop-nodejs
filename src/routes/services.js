const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../app/middlewares/verifyToken');
const { isAdmin } = require('../app/middlewares/verifyPermissions');

const serviceController = require('../app/controllers/ServiceController');

router.post('/create', serviceController.create);
router.get('/trash', [verifyAccessToken, isAdmin], serviceController.getTrash);
router.get('/', serviceController.getAll);
router.get('/:sId', serviceController.getById);
router.put('/:sId', [verifyAccessToken, isAdmin], serviceController.update);
router.patch('/:sId/restore', serviceController.restore);
router.delete('/:sId', serviceController.softDelete);
router.delete('/:sId/force', [verifyAccessToken, isAdmin], serviceController.forceDestroy);

module.exports = router;
