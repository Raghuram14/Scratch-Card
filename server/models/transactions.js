'use strict';
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique : true,
    },
    dateOfTransaction: {
        type: Date,
        required: true,
    },
    transactionAmount: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    scratchCardId: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Transactions', transactionSchema);