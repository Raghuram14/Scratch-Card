'use strict';
const express = require('express');
const router = express.Router()
const services = require('../services/scratch-card');

/**
 * POST API to get scratch card details
 * */
router.post('/get', async (req, res) => {
    try {
        const scratchCardDetails = await services.getScratchCardDetails(req);
        res.status(200).json(scratchCardDetails)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

/**
 * REST API to add scratch card details
 * */
 router.post('/add', async (req, res) => {
    try {
        const scratchCard = await services.addScratchCardDetails(req);
        res.status(200).json(scratchCard);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router;