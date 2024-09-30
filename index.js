const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bookingRoutes = require('./Routes/bookingRoutes');
const cors = require('cors');
const contactRoutes = require('./Routes/contactRoutes');
const {cookie} = require('express-validator');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('node:path');
const userRoutes = require('./Routes/userRoutes');

app.listen(3005, () => {
    console.log('Listening on port 3005');
})

mongoose.connect('mongodb://localhost:27017/test').then(() => {
    console.log('Connected to MongoDB');
})

app.use(cors({
    origin: 'http://localhost:4200',
    withcredentials: true
}))




app.use(express.json())

app.use(cookieParser())

app.use('/user',userRoutes)
app.use('/book',bookingRoutes)
app.use('/contact',contactRoutes)
