const express = require('express');
const router = express.Router();
const BookingModel = require('../models/bookingModel');
const bookingController = require('../Controllers/bookingController');
const bookingValidations = require('../validations/bookingValidations');
const {body} = require('express-validator');

router.route('/')
.get(bookingController.getAllBookings)
.post(bookingValidations,bookingController.createBooking)

module.exports = router
