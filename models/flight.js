const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availableAirports = ['SFO', 'AUS', 'DFW', 'LAX'];



const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: availableAirports,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const flightSchema = new Schema({
    airline: {
        type: String
    },
    airport: {
        type: String,
        default: 'SFO',
        enum: availableAirports
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999,
        required: true
    },
    departs: {
        type: Date,
        required: true,
        // validate: {
        //     validator: function(value) {
        //         const now = new Date();
        //         return value > now;
        //     },
        //     message: 'Departure date should be in the future'
        // },
        default: function() {
            const nowPlusOneYear = new Date();
            nowPlusOneYear.setFullYear(nowPlusOneYear.getFullYear() + 1);
            return nowPlusOneYear;
        }
    },
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
      }],
    departsTime: {
        type: String,
        required: true
    },
    destinations: [destinationSchema], //this is an array of flight subdocs
    
}, {
    timestamps: true
});



module.exports = mongoose.model('Flight', flightSchema);