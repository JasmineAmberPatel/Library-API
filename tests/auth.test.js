const chai = require('chai');
const DataFactory = require('./helpers/data-factory');
const customerHelper = require('./helpers/customer-helpers');

describe('POST /auth/login', () => {
  it('decodes the JWT', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send({
        firstName: 'Linda',
        lastName: 'Hunny',
        email: 'linda@hunny.com',
        password: 'lindaHunny1',
      })
      .end((error, res) => {
        expect(error).to.equal(null);
        expect(res.status).to.equal(200);

        Customer.findById(res.body._id, (err, customer) => {
          expect(err).to.equal(null);
          expect(customer.firstName).to.equal('Linda');
          expect(customer.lastName).to.equal('Hunny');
          expect(customer.email).to.equal('linda@hunny.com');
          expect(customer.password).to.not.equal('lindaHunny1');
          expect(customer.password).to.have.length(60);
          expect(res.body).not.to.have.property('password');
          done();
        });
      });
  });
});
