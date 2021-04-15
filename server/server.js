'use strict';

require('dotenv').config()
const app = require('./app');
const express = require('express');
const mongoose = require('mongoose');
const routers = require('./apis');


// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Data base connection
const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

// Connect to database and start server on successful connection to DB
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {
        routers(app);
        console.log(`Server is runnig on port: ${PORT}`)
    }))
    .catch((error) => {
        console.log('Erorr while connecting to mongoose db ', error);
    })

mongoose.set('useFindAndModify', false);