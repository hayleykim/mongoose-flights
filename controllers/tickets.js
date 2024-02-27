const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create,
    addToTicket
};

async function addToTicket(req, res) {
    try {
        const flight = await Flight.findById(req.params.id);

        const newTicket = new Ticket({
            seat: req.body.seat,
            price: req.body.price,
            flight: flight._id
        });

        await newTicket.save();

        flight.tickets.push(newTicket);

        await flight.save();

        res.redirect(`/flights/${flight._id}`);
    } catch (err) {
        console.log(err);
    }
}

async function newTicket(req, res) {
    // const flight = await Flight.findById(req.params.id);
    // const tickets = await Ticket.find({flight: flight._id});  
    // res.render('tickets/new', {title: 'Add Ticket', errorMsg: '', tickets});
    try {
        const flightId = req.query.flightId;

        if (!flightId) {
            return res.status(400).send('Missing flightId parameter');
        }

        const flight = await Flight.findById(flightId);

        if (!flight) {
            return res.status(404).send('Flight not found');
        }

        const tickets = await Ticket.find({ flight: flight._id });
        res.render('tickets/new', { title: 'Add Ticket', errorMsg: '', tickets, flight });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

}

async function create(req, res) {
    // const flight = await Flight.findById(req.params.id);

    // flight.tickets.push(req.body);
    
    // try {
    //     await flight.save();
    // } catch (err) {
    //     console.log(err);
    // }
    
    // res.redirect(`/flights/${flight._id}`);
    try {
        await Ticket.create(req.body);
      } catch (err) {
        console.log(err);
      }
      res.redirect('/tickets/new');
}