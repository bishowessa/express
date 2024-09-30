const UserModel = require('../models/userModel');
const userValidations = require('../validations/userValidation');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const responseMsgs = require('../utilities/responseMsgs');
const { stat } = require('fs');
const {response} = require('express');


const getAllUsers = async (req, res) => {
    let data = await UserModel.find({});
    res.status(200).json(data);
}

const registerUser = async (req, res) => {
    try{
        let newUser = req.body;
        let validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            throw res.status(400).json({
                status : responseMsgs.FAIL,
                data : validationErrors});
        }


        newUser.password = await bcrypt.hash(newUser.password, 10);
        await UserModel.create(newUser);
        console.log('User created successfully');
        res.status(201).json({
            status : responseMsgs.SUCCESS,
            message: 'User created successfully'
        })
    }catch(err){
        res.status(500).json({
            status : responseMsgs.FAIL,
            data : err.message
        })
    }
}




const loginUser = async (req, res) => {
    let loginDetails = req.body;
    try{
        let loginUser = await UserModel.findOne({email: loginDetails.email});
        if(!loginUser){
            throw res.status(400).json({
                status : responseMsgs.FAIL,
                data : "User not found"});
        }
        let checkPassword = await bcrypt.compare(loginDetails.password, loginUser.password);
        if(!checkPassword){
            throw res.status(401).json({
                status : responseMsgs.FAIL,
                data:  "Wrong password"});
        }

        
        let token = jwt.sign({id: loginUser._id, role: loginUser.role}, 'process.env.JWTKEY');

        res.cookie('jwt', token).json({
            status : responseMsgs.SUCCESS,
            message: 'Login successful',
            token : token
        })

    }catch(err){
        res.status(500).json({
            status : 'fail',
            data : err
        })
    }
}



const User = require('../models/userModel'); // Assuming you have a User model

// Add a new admin by email
const addAdmin = async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }

        // Update the user's role to 'admin'
        user.role = 'admin';
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Admin role assigned successfully',
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message || 'An error occurred while adding admin',
        });
    }
};

// Update user by email (admin-only)
const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ email: req.params.email }, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message || 'An error occurred while updating user',
        });
    }
};

// Delete user by email (admin-only)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message || 'An error occurred while deleting user',
        });
    }
};



module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    addAdmin,
    updateUser,
    deleteUser
}