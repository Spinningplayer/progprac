var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
chai.use(chaiHttp);
describe('API Test', function() {
    it('Test GET /api/v2/recipes', function(done) {
        chai.request(server)
            .get('/api/v2/recipes')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});