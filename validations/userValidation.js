const {body} = require('express-validator');
const UserModel = require('../models/userModel');

const userValidations =[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid')
    .custom(async (value) => {
        let checkUser = await UserModel.findOne({email: value});
        if(checkUser){
            throw new Error('Email already exists');
        }
    }),
    body('password').notEmpty().withMessage('Password is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('address').notEmpty().withMessage('Address is required'),
]

module.exports = userValidations;