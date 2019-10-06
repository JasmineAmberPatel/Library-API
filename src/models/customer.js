const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');
const isEmail = require('isemail');


const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    validate: [isEmail.validate, 'Invalid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is invalid'],
    minlength: 8,
  },
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

customerSchema.methods.countDocuments = function (err, count) {
  return count;
};


const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
