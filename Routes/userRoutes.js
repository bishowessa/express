const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const userValidations = require('../validations/userValidation');
const userMiddleware = require('../middlewares/userMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.route('/')
.get(userMiddleware,adminMiddleware,userController.getAllUsers)

router.route('/register')
.post(userValidations,userController.registerUser)

router.route('/login')
.post(userController.loginUser)

router.route('/addAdmin')
.post(userMiddleware,adminMiddleware,userController.addAdmin)

router.route('/updateUser/:email')
.patch(userMiddleware,adminMiddleware,userController.updateUser)

router.route('/deleteUser/:email')
.delete(userMiddleware,adminMiddleware,userController.deleteUser)

module.exports = router;