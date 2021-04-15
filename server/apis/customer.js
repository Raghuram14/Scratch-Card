'use strict';
const express = require('express');
const router = express.Router()
const services = require('../services/customer');

/**
 * REST API to get all customer details
 * */
router.get('/', async (req, res) => {
    try {
        const customers = await services.getCustomersDetails();
        res.status(200).json(customers)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

/**
 * REST API to add customer details
 * */
router.post('/', async (req, res) => {
    try {
        const customers = await services.addCustomerDetails(req);
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * REST API to update customer details
 * */
router.patch('/:id', async (req, res) => {
    try {
        const customer = await services.updateCustomerDetails(req);
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json(error.message)
    }
});

/**
 * REST API to delete customer details
 * */
router.delete('/:id', async (req, res) => {
    try {
        const updateRes = await services.deleteCustomerDetails(req);
        res.status(200).json(updateRes);
    } catch (error) {
        res.status(400).json(error.message)
    }
});

module.exports = router;