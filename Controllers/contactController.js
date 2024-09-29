const ContactModel = require('../models/contactModel');
const {validationResult} = require('express-validator');
const contactValidations = require('../validations/contactValidations');


const createContact = async (req, res) => {
    try{
        let newContact = req.body;

        let validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            throw (validationErrors)
        }
        await ContactModel.create(newContact);
        console.log('Contact created successfully');
        res.status(201).json({message: 'Contact created successfully'})
    }catch(err){
        res.status(500).json(err)
    }
}

const getAllContacts = async (req, res) => {
    let data = await ContactModel.find({});
    res.status(200).json(data);
}

module.exports = {
    createContact,
    getAllContacts
}