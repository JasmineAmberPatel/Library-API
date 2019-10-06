const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');


const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

customerSchema.pre('save', function encryptPassword(next) {
  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      next(error);
    } else {
      this.password = hash;
      return next();
    }
  });
});

customerSchema.methods.sanitise = function () {
  const customerObject = this.toObject();
  const { password, ...rest } = customerObject;
  return rest;
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
