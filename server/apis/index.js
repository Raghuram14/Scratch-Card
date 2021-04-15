const customerApis = require('./customer');
const scratchCardApis = require('./scratch-card');
const transactionsApis = require('./transactions');

const apis = (app) => {
    app.use('/v0/customer', customerApis);
    app.use('/v0/scratch-card', scratchCardApis);
    app.use('/v0/transactions', transactionsApis);
};

module.exports = apis;