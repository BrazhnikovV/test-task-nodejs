var request = require('supertest'), app = require(__dirname + '/../../app');

describe('Pages', function () {
    describe('GET /', function () {
        it('should Home page => return status code 200', function (done) {
            request(app)
                .get('/')
                .expect(200, done)
                //.expect('location', '/')
                //.expect(302, done)
        });
    });

    describe('GET /products', function () {
        it('should return status code 200', function (done) {
            request(app)
                .get('/products')
                .expect(200, done)
        });
  
        it('should contain text "Продукты"', function (done) {
            request(app)
                .get('/products')
                .expect(/Продукты/, done)
        });
    });
});