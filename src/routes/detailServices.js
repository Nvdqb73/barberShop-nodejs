const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../app/middlewares/verifyToken');
const { isAdmin } = require('../app/middlewares/verifyPermissions');

const detailServiceController = require('../app/controllers/DetailServiceController');

router.post('/create', [verifyAccessToken, isAdmin], detailServiceController.create);
router.get('/trash', [verifyAccessToken, isAdmin], detailServiceController.getTrash);
router.get('/', detailServiceController.getAll);
router.get('/:dsId', detailServiceController.getById);
router.put('/:dsId', [verifyAccessToken, isAdmin], detailServiceController.update);
router.patch('/:dsId/restore', detailServiceController.restore);
router.delete('/:dsId', detailServiceController.softDelete);
router.delete('/:dsId/force', [verifyAccessToken, isAdmin], detailServiceController.forceDestroy);

module.exports = router;
