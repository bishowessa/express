const express = require('express');
const router = express.Router();
const BookingModel = require('../models/bookingModel');
const bookingController = require('../Controllers/bookingController');
const bookingValidations = require('../validations/bookingValidations');
const {body} = require('express-validator');
const userMiddleware = require('../middlewares/userMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.route('/')
.get(bookingController.getAllBookings)
.post(userMiddleware,bookingValidations,bookingController.createBooking)

module.exports = router
