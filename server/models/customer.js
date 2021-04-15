'use strict';
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique : true,
    },
    userEmail: {
        type: String,
        required: true,
        unique : true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    }
})

module.exports = mongoose.model('Customer', customerSchema);