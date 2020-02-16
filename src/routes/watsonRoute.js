'use strict'

const express = require('express');
const watson = require('../controllers/watsonController');
const router = express.Router();

router.post('/first', watson.getFirst);
router.post('/send', watson.sendMessage);

module.exports = router;