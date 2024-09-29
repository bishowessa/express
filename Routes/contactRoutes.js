const express = require('express');
const router = express.Router();
const ContactModel = require('../models/contactModel');
const contactController = require('../Controllers/contactController');
const contactValidations = require('../validations/contactValidations');
const {body} = require('express-validator');

router.route('/')
.get(contactController.getAllContacts)
.post(contactValidations,contactController.createContact)

module.exports = router