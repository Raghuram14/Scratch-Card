'use strict';
const cardExpiresIn = 5;

/* Function to generate random discount amount for the scratch cards */
const getDiscountAmount = () => {
    return Math.round(Math.random() * (1000 - 0) + 0);
}

/* Function to generate expiry date for the scratch cards */
const getExpiryDate = () => {
    let currentDate = new Date();
    currentDate = currentDate.setDate(currentDate.getDate() + cardExpiresIn);   
    return new Date(currentDate);
}

module.exports = {
    getDiscountAmount: getDiscountAmount,
    getExpiryDate: getExpiryDate,
}