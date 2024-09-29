const BookingModel = require('../models/bookingModel');
const {validationResult} = require('express-validator');
const bookingValidations = require('../validations/bookingValidations');

const createBooking = async (req, res) => {
    try{
        let newBooking = req.body;

        let validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            throw (validationErrors)
        }
        await BookingModel.create(newBooking);
        console.log('Booking created successfully');
        res.status(201).json({message: 'Booking created successfully'})
    }catch(err){
        res.status(500).json(err)
    }
}

const getAllBookings = async (req, res) => {
    let data = await BookingModel.find({});
    res.status(200).json(data);
}

module.exports = {
    createBooking,
    getAllBookings
}