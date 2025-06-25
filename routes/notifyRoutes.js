const express = require('express');
const router = express.Router();
const { notifyStatus } = require('../controllers/notifyController');

router.post('/', notifyStatus);

module.exports = router;
