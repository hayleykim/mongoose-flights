const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets');

router.get('/tickets/new', ticketsController.new);
router.post('/tickets', ticketsController.create);
router.post('/flights/:id/tickets', ticketsController.addToTicket);

module.exports = router;