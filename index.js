const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bookingRoutes = require('./Routes/bookingRoutes');
const cors = require('cors');

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

app.use('/book',bookingRoutes)
