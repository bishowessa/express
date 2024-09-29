const {body} = require('express-validator');
const BookingModel = require('../models/bookingModel');

const bookingValidations =[
    body('bookingDate').notEmpty().withMessage('Booking Date is required'),
    body('bookingTime').notEmpty().withMessage('Booking Time is required'),
    body('bookingName').notEmpty().withMessage('Booking Name is required'),
    body('bookingPhone').notEmpty().withMessage('Booking Phone is required'),
    body('bookingPersons').notEmpty().withMessage('Persons are required'),
    
]

module.exports = bookingValidations
