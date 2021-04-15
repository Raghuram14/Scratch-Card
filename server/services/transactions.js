'use strict';
const Transactions = require('../models/transactions');
const validator = require('./validator');
const { v4: uuidv4 } = require('uuid');
const helper = require('./helper');
const Customer = require('../models/customer');
const ScratchCard = require('../models/scratch-card');

/**
 * Function to get taransation details,
 * supports for passed filters as well else return all the transactions
 * @param {JSON} req request body can contain different filters like dateOfTransaction, userId, transactionAmount 
 * @returns {Array} object containg transaction details
 */
const getTranactionDetails = async (req) => {
    try {
        // validate filters
        const filters = req.body ? req.body : {};
        await validator.validateGetTransactionDetailsApiParams(filters);
        
        const dbFilters = {};
        if (filters.userId) dbFilters.userId = filters.userId;
        if (filters.transactionAmount) dbFilters.transactionAmount = filters.transactionAmount;

        // fetch scratch card details
        const transactionDetails = await Transactions.find(dbFilters);
        return transactionDetails;
    } catch (error) {
        throw Error(error);
    }
};

/**
 * Function to add scratch card details,
 * @param {JSON} req request body scratch card details to add
 * @returns {Array} object containg scratch card details
 */
const addTransactionDetails = async (req) => {
    try {
        const reqBody = req.body ? req.body : {};
        // validate request body paramters
        await validator.validateAddTransactionDetailsApiParams(reqBody);

        const {scrachCardid, userId} = reqBody;

        // Get scratch card details and validate
        let scratchCardDetails = await ScratchCard.find({id:scrachCardid, isScratched: false, isActive: true});
        if (!scratchCardDetails || !Array.isArray(scratchCardDetails) || !scratchCardDetails.length) {
            throw new Error(`Scrach card is either used or not found, for id: ${scrachCardid}`);
        } else {
            const currentDate = new Date();
            scratchCardDetails = scratchCardDetails[0]; 
            const expiryDate = scratchCardDetails.expiryDate;
            if (currentDate > expiryDate)
                throw new Error(`Scrach card is expired, for id: ${scrachCardid}`);
        }

        // Get customer details and Validate
        let customer = await Customer.find({id: userId, isActive: true});
        if (!customer || !Array.isArray(customer) || !customer.length) {
            throw new Error(`Couldn't find customer details or customer is in-active, for userId: ${userId}`);
        }
        customer =  customer[0];

        // add transaction details
        const transactionDetails = new Transactions({
            id: uuidv4(),
            dateOfTransaction: new Date(),
            transactionAmount: scratchCardDetails.discountAmount,
            userId: customer.id,
            scratchCardId: scratchCardDetails.id,
        })
        const details = await transactionDetails.save()

        // update scratch card details, so that it can't used again
        await ScratchCard.updateOne({id:scrachCardid}, { isScratched: false, isActive: false});

        return details;
    } catch (error) {
        throw Error(error);
    }
};

module.exports = {
    getTranactionDetails: getTranactionDetails,
    addTransactionDetails: addTransactionDetails,
}