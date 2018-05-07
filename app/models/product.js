var mongoose = require( '../../libs/mongoose' );
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Product = mongoose.model( 'Product', schema );