var express = require('express');
var router = express.Router();

const flightsController = require('../controllers/flights');

// All paths start with "/flights"


//GET /flights
router.get('/', flightsController.index);

//GET /flights/new
router.get('/new', flightsController.new);

//GET /flights/:id
router.get('/:id', flightsController.show);

//POST /flights
router.post('/', flightsController.create);


module.exports = router;