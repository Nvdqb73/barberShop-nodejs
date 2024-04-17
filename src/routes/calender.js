const express = require('express');
const router = express.Router();
const calenderController = require('../app/controllers/CalenderController');

router.post('/create', calenderController.createEvent);
router.post('/', calenderController.getAll);

module.exports = router;
