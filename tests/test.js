
// Первый тест
var foo = 'bar';

describe('Truth', function () {
    it('should be true', function () {
        true.should.be.true
    });
  
    it('should not be false', function () {
        true.should.not.be.false
    });
});

// Второй тест
var request = require('supertest'), app = require(__dirname + '/../app');

describe('GET /', function () {
    it('should contain text "Hello, Express!"', function (done) {
        request(app)
        .get('/')
        .expect(/Hello, Express!/, done)
    })
});