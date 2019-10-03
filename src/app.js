const express = require('express');
const app = express();
const customerControllers = require('./controllers/customer');

app.use(express.json());

app.get('', (req, res) => {
  res.status(200).json({ message: 'Hello Jasmine!' });
});

app.post('/customers', customerControllers.create);

module.exports = app;
