'use strict';
const joi = require('joi');
const JOI_DEFAULT_OPTS = {
    'allowUnknown': true,
    'abortEarly': false,
    'noDefaults': true,
    'convert': false,
};

// common function to validate and throw error
const validateNThrowErr = (validatedObj) => {
    const errsArr = [];
    if (validatedObj.error) {
        validatedObj.error.details.map((err) => errsArr.push(err.message));
        throw new Error(errsArr);
    }
};

/**
 * Function to validate customer details before adding
 * @param {JOSN} params request object containing customer details to be added
 * @return {JOSN} returns customer details on successful creation else throws validation error
 * */
 const validateAddCustomerApiParams = (params) => {
    const validatedObj = joi.object({
        userEmail: joi.string().required().email().error(() => 'Invalid Email-ID'),
        firstName: joi.string().required().error(() => 'Firstname is missing'),
        lastName: joi.string().required().error(() => 'Lastname is missing'),
        isActive: joi.boolean().required().error(() => 'Active can be either true or false'),
    }).validate(params, JOI_DEFAULT_OPTS);

    return validateNThrowErr(validatedObj);
};

/**
 * Function to validate customer details before adding
 * @param {JOSN} params request object containing customer details to be added
 * @return {None} throws validation error on failure
 * */
 const validateUpdateCustomerApiParams = (params) => {
    const validatedObj = joi.object({
        id: joi.string().required().error(() => 'Invalid Customer ID'),
        userEmail: joi.string().email().error(() => 'Invalid Email-ID'),
        firstName: joi.string().error(() => 'Firstname is shoule be a string'),
        lastName: joi.string().error(() => 'Lastname is shoule be a string'),
        isActive: joi.boolean().error(() => 'Active can be either true or false'),
    }).validate(params, JOI_DEFAULT_OPTS);

    return validateNThrowErr(validatedObj);
};

/**
 * Function to validate get scratch card API filters
 * @param {JOSN} params request object containing filters to get scratch card details
 * @return {None} throws validation error on failure
 * */
 const validateGetScratchCardApiParams = (params) => {
    const datePattern = /^((([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4})$/;
    const validatedObj = joi.object({
        id: joi.string().error(() => 'Invalid Scratch ID'),
        discountAmount: joi.number().error(() => 'Invalid Discount Amount'),
        expiryDate: joi.string().regex(datePattern).error(() => 'Invalid date time format'),
        isScratched: joi.boolean().error(() => 'Scratched can be either true or false'),
        isActive: joi.boolean().error(() => 'Active can be either true or false'),
    }).validate(params, JOI_DEFAULT_OPTS);

    return validateNThrowErr(validatedObj);
};

/**
 * Function to validate add scratch card details
 * @param {JOSN} params request object containing scratch card details to add
 * @return {None} throws validation error on failure
 * */
 const validateAddScratchCardApiParams = (params) => {
    const validatedObj = joi.object({
        numOfScratchCards: joi.number().positive().required().error(() => 'Invalid Number of Scratch Cards'),
    }).validate(params, JOI_DEFAULT_OPTS);

    return validateNThrowErr(validatedObj);
};

/**
 * Function to validate get transaction details API filters
 * @param {JOSN} params request object containing filters to get transaction details
 * @return {None} throws validation error on failure
 * */
 const validateGetTransactionDetailsApiParams = (params) => {
    const datePattern = /^((([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4})$/;
    const validatedObj = joi.object({
        userId: joi.string().error(() => 'Invalid User ID'),
        transactionAmount: joi.number().error(() => 'Invalid Transaction Amount'),
        dateOfTransaction: joi.string().regex(datePattern).error(() => 'Invalid date time format'),
    }).validate(params, JOI_DEFAULT_OPTS);

    return validateNThrowErr(validatedObj);
};

/**
 * Function to validate Add transaction details API params
 * @param {JOSN} params request object containing filters to add transaction details
 * @return {None} throws validation error on failure
 * */
 const validateAddTransactionDetailsApiParams = (params) => {
    const datePattern = /^((([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4})$/;
    const validatedObj = joi.object({
        scrachCardid: joi.string().required().error(() => 'Invalid Scratch Card ID'),
        userId: joi.string().required().error(() => 'Invalid User ID'),
    }).validate(params, JOI_DEFAULT_OPTS);

    return validateNThrowErr(validatedObj);
};

module.exports = {
    validateAddCustomerApiParams: validateAddCustomerApiParams,
    validateUpdateCustomerApiParams: validateUpdateCustomerApiParams,
    validateGetScratchCardApiParams: validateGetScratchCardApiParams,
    validateAddScratchCardApiParams: validateAddScratchCardApiParams,
    validateGetTransactionDetailsApiParams: validateGetTransactionDetailsApiParams,
    validateAddTransactionDetailsApiParams: validateAddTransactionDetailsApiParams,
}