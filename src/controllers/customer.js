const Customer = require('../models/customer');

exports.create = (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  customer.save()
    .then(() => {
      res.status(201).json(customer.sanitise());
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const emailError = error.errors.email ? error.errors.email.message : null;
        const passwordError = error.errors.password ? error.errors.password.message : null;
        res.status(400).json({
          errors: {
            email: emailError,
            password: passwordError,
          },
        });
      } else {
        res.sendStatus(500);
      }
    });
};
