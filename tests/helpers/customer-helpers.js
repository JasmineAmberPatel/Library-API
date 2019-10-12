const chai = require('chai');

exports.signUp = customer => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/customers')
    .send(customer)
    .end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
});
