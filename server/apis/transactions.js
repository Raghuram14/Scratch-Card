'use strict';
const express = require('express');
const router = express.Router()
const services = require('../services/transactions');

/**
 * POST API to get transaction details
 * */
router.post('/get', async (req, res) => {
    try {
        const transactionDetails = await services.getTranactionDetails(req);
        res.status(200).json(transactionDetails)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

/**
 * REST API to add transaction details
 * */
 router.post('/add', async (req, res) => {
    try {
        const customers = await services.addTransactionDetails(req);
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router;