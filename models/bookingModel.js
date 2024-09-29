const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    bookingDate : String,
    bookingTime : String,
    bookingName : String,
    bookingPhone : String,
    bookingPersons : Number
})

const BookingModel = mongoose.model('booking', bookingSchema);

module.exports = BookingModel;
