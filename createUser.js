var User = require( './app/models/user' ).User;

var user = new User({
    username: "Zhopa",
    password: "secret"
});

User.find({ username: 'Zhopa' },function (err, results) {
    if (err) return console.error(err);
    console.log(results);
});

return false;

//User.remove({}, function(err) { 
//    console.log('collection removed') 
//});
//
//return false;

user.save( function( err, user, affected ) {
    if( err ) {
        throw err;
    }
    else {
        
    }
});

//console.log(User);