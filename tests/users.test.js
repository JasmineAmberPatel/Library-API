const Customer = require('../src/models/customer');
const chai = require('chai');

describe('/artists', () => {
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
            expect(customer.password).to.equal('lindaHunny1');
            done();
          });
        });
    });
  });
});
