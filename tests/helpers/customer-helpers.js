const chai = require('chai');

exports.signUp = customer => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/customers')
    .send(customer)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
