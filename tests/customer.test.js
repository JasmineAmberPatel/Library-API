const Customer = require('../src/models/customer');
const chai = require('chai');

describe('/customers', () => {
  beforeEach((done) => {
    Customer.deleteMany({}, () => {
      done();
    });
  });

  describe('POST /customers', () => {
    it('creates a new customer in the database', (done) => {
      chai.request(server)
        .post('/customers')
        .send({
          firstName: 'Linda',
          lastName: 'Hunny',
          email: 'linda@hunny.com',
          password: 'lindaHunny1',
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(201);

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
    it('checks the customers email address is valid', (done) => {
      chai.request(server)
        .post('/customers')
        .send({
          firstName: 'Linda',
          lastName: 'Hunny',
          email: 'linda@hunny.cheesecake.com',
          password: 'lindaHunny1',
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(404);

          Customer.findById(res.body._id, (err, customer) => {
            expect(err).to.equal(null);
            expect(res.body.errors.email).to.equal('Invalid email address');
            expect(customer.countDocuments).to.equal(0);
            done();
          });
        });
    });
    it('checks the customers password is valid', (done) => {
      chai.request(server)
        .post('/customers')
        .send({
          firstName: 'Linda',
          lastName: 'Hunny',
          email: 'linda@hunny.com',
          password: 'lindahu',
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(404);

          Customer.findById(res.body._id, (err, customer) => {
            expect(err).to.equal(null);
            expect(res.body.errors.password).to.equal('Invalid password');
            done();
          });
        });
    });
  });
});
