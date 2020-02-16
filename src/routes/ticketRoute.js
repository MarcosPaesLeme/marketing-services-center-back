'use strict'

const express = require('express');
const ticket = require('../controllers/ticketController');
const router = express.Router();

router.get('/', ticket.getTickets);
router.post('/create', ticket.createTicket);

module.exports = router;