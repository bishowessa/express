const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    contactName : String,
    contactEmail : String,
    contactSubject : String,
    contactMessage : String,
})

const ContactModel = mongoose.model('contact', contactSchema);

module.exports = ContactModel;
