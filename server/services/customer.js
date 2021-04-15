'use strict';
const Customer = require('../models/customer');
const validator = require('./validator');
const { v4: uuidv4 } = require('uuid');

/* Function to get all customer details */
const getCustomersDetails = async () => {
    try {
        const customers = await Customer.find();
        return customers;
    } catch (error) {
        throw new Error('Failed to get customer details');
    }
};

/**
 * Function add customer details
 * @param {JOSN} req request object containing customer details to be added
 * @return {Array} returns customer details on successful creation
 * */
const addCustomerDetails = async (req) => {
    try {
        const reqBody = req.body ? req.body : {};

        await validator.validateAddCustomerApiParams(reqBody);

        // Find duplicate entry for customer email and throw error if found
        const existingCustDetails = await Customer.find({
            userEmail: reqBody.userEmail,
        });
        if (Array.isArray(existingCustDetails) && existingCustDetails.length)
            throw new Error(`Email '${reqBody.userEmail}' already exist`)

        const customer = new Customer({
            id: uuidv4(),
            userEmail: reqBody.userEmail,
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            isActive: reqBody.isActive,
        })
        const result = await customer.save()
        return result;
    } catch (error) {
        throw Error(error);
    }
};

/**
 * Function update customer details
 * @param {JOSN} req request object containing customer details to be updated
 * @return {JOSN} returns customer details on successful update
 * */
const updateCustomerDetails = async (req) => {
    try {
        const reqBody = req.body ? req.body : {};
        reqBody.id = req.params.id;
        await validator.validateUpdateCustomerApiParams(reqBody);

        const customer = await Customer.find({
            id: reqBody.id,
        });

        // throw if customer details is not found
        if (!Array.isArray(customer) || !customer.length) {
            throw new Error(`Couldn't find customer details for the ID: ${reqBody.id}`)
        } else {
            customer[0].userEmail = reqBody.userEmail ? reqBody.userEmail : customer[0].userEmail;
            customer[0].lastName = reqBody.lastName ? reqBody.lastName : customer[0].lastName;
            customer[0].firstName = reqBody.firstName ? reqBody.firstName : customer[0].firstName;
            customer[0].isActive = reqBody.hasOwnProperty('isActive') ? reqBody.isActive : customer[0].isActive;
        }

        const result = await customer[0].save();
        return result;
    } catch (error) {
        throw Error(error);
    }
};

/**
 * Function update customer details
 * @param {JOSN} req request object containing customer details to be updated
 * @return {JOSN} returns customer details on successful update
 * */
const deleteCustomerDetails = async (req) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.find({
            id: customerId,
        });

        // throw if customer details is not found
        if (!Array.isArray(customer) || !customer.length) {
            throw new Error(`Couldn't find customer details for the ID: ${customerId}`)
        }

        const result = await customer[0].remove();
        return result;
    } catch (error) {
        throw Error(error);
    }
};

module.exports = {
    getCustomersDetails: getCustomersDetails,
    addCustomerDetails: addCustomerDetails,
    updateCustomerDetails: updateCustomerDetails,
    deleteCustomerDetails: deleteCustomerDetails,
}