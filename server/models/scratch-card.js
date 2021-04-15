'use strict';
const mongoose = require('mongoose');

const scratchCardSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique : true,
    },
    discountAmount: {
        type: Number,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    isScratched: {
        type: Boolean,
        required: true,
        default: false,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    }
})

module.exports = mongoose.model('ScratchCard', scratchCardSchema);