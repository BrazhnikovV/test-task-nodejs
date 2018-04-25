
var foo = 'bar';

describe('Truth', function () {
    it('should be true', function () {
        true.should.be.true
    })
  
    it('should not be false', function () {
        true.should.not.be.false
    })
})