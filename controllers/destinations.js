const Flight = require('../models/flight');

module.exports = {
    create
};

async function create(req, res) {
    const flight = await Flight.findById(req.params.id);

    const arrivalDateTime = new Date(`${req.body['arrival.date']} ${req.body['arrival.time']}`);
    
    if (arrivalDateTime <= flight.departs) {
        console.log('Arrival date and time have to be later than flight departure.');
        return res.redirect(`/flights/${flight._id}`);
    }


    const newDestination = {
        airport: req.body.airport,
        arrivalDate: req.body['arrival.date'],
        arrivalTime: req.body['arrival.time']

    };

    flight.destinations.push(newDestination);


    try {
        await flight.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/flights/${flight._id}`);
}