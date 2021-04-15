'use strict';
const ScratchCard = require('../models/scratch-card');
const validator = require('./validator');
const { v4: uuidv4 } = require('uuid');
const helper = require('./helper');

/**
 * Function to get scratch card details,
 * supports for passed filters as well else return all the scratch cards
 * @param {JSON} req request body can contain different filters like isScratched, isActive 
 * @returns {Array} object containg scratch card details
 */
const getScratchCardDetails = async (req) => {
    try {
        // validate filters
        const filters = req.body ? req.body : {};
        await validator.validateGetScratchCardApiParams(filters);
        
        const dbFilters = {};
        if (filters.hasOwnProperty('isActive')) dbFilters.isActive = filters.isActive;
        if (filters.hasOwnProperty('isScratched')) dbFilters.isScratched = filters.isScratched;

        // fetch scratch card details
        const scratchCardDetails = await ScratchCard.find(dbFilters);
        return scratchCardDetails;
    } catch (error) {
        throw Error(error);
    }
};

/**
 * Function to add scratch card details,
 * @param {JSON} req request body scratch card details to add
 * @returns {Array} object containg scratch card details
 */
const addScratchCardDetails = async (req) => {
    try {
        const reqBody = req.body ? req.body : {};
        // validate request body paramters
        await validator.validateAddScratchCardApiParams(reqBody);

        let numOfScratchCards = reqBody.numOfScratchCards;
        const existingScratchCardDetails = await ScratchCard.find({isScratched: false, isActive: true});
        if (existingScratchCardDetails && Array.isArray(existingScratchCardDetails) && existingScratchCardDetails.length >= numOfScratchCards) {
            throw new Error(`${numOfScratchCards} number of active scratch cards still exists in the DB. Did not create any new scratch cards`)
        }

        // add scratch card details
        const result = [];
        numOfScratchCards = new Array(numOfScratchCards).fill(0);
        for (const index of numOfScratchCards) {
            const scratchCardDetails = new ScratchCard({
                id: uuidv4(),
                discountAmount: helper.getDiscountAmount(),
                expiryDate: helper.getExpiryDate(),
                isScratched: false,
                isActive: true,
            })
            const details = await scratchCardDetails.save()
            result.push(details);
        }
        return result;
    } catch (error) {
        throw Error(error);
    }
};

module.exports = {
    getScratchCardDetails: getScratchCardDetails,
    addScratchCardDetails: addScratchCardDetails,
}