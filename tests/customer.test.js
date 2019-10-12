const Customer = require('../src/models/customer');
const chai = require('chai');
const DataFactory = require('./helpers/data-factory');
const customerHelper = require('./helpers/customer-helpers');

describe('/customers', () => {
  beforeEach((done) => {
    Customer.deleteMany({}, (error) => {
      done();
    });
  });

  describe('POST /customers', () => {
    it('creates a new customer in the database', (done) => {
      const data = DataFactory.user();
      customerHelper.signUp(data)
        .then((res) => {
          expect(res.status).to.equal(201);
          Customer.findById(res.body._id, (err, customer) => {
            expect(err).to.equal(null);
            expect(customer.firstName).to.equal(data.firstName);
            expect(customer.lastName).to.equal(data.lastName);
            expect(customer.email).to.equal(data.email);
            expect(customer.password).to.not.equal('lindaHunny1');
            expect(customer.password).to.have.length(60);
            expect(res.body).not.to.have.property('password');
            done();
          });
        })
        .catch((error) => done(error));
    });

    it('checks the customers email address is valid', (done) => {
      const data = DataFactory.user({ email: 'lindaisahunny' });
      customerHelper.signUp(data)
        .then((res) => {
          expect(res.status).to.equal(400);
          Customer.findById(res.body._id, (err, customer) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(400);
            expect(res.body.errors.email).to.equal('Invalid email address');
            done();
          });
        })
        .catch((error) => done(error));
    });

    it('checks the customers password is valid', (done) => {
      const data = DataFactory.user({ password: 'Linda' });
      customerHelper.signUp(data)
        .then((res) => {
          expect(res.status).to.equal(400);
          Customer.findById(res.body._id, (err, customer) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(400);
            expect(res.body.errors.password).to.equal('Password is invalid');
            done();
          });
        })
        .catch((error) => done(error));
    });
  });
});
