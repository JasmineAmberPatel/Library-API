const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
