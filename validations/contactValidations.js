const {body} = require('express-validator');
const ContactModel = require('../models/contactModel');

const contactValidations =[
    body('contactName').notEmpty().withMessage('Contact Name is required'),
    body('contactEmail').notEmpty().withMessage('Contact Email is required').isEmail().withMessage('Contact Email is not valid'),
    body('contactSubject').notEmpty().withMessage('Contact Subject is required'),
    body('contactMessage').notEmpty().withMessage('Contact Message is required'),
]

module.exports = contactValidations