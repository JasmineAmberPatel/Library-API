const express = require('express');
const app = express();
const customerControllers = require('./controllers/customer');

app.use(express.json());

app.post('/customers', customerControllers.create);

module.exports = app;
