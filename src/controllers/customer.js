const Customer = require('../models/customer');

exports.create = (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  customer.save().then(() => {
    res.status(201).send(customer);
  });
};
