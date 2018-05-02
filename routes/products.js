// подключить главные модули приложения
var express = require('express');
var router = express.Router();
// подключить express-form
var form = require('express-form');
var field = form.field;
// Модель пользователя системы
var Product = require( '../app/models/product' ).Product;

/* GET products page. */
router.get( '/', function( req, res, next ) {                 
    Product.find({},function ( err, results ) {
        if ( err ) {
            return console.error(err);
        }            
        if ( req.session.hasOwnProperty( 'user' ) ) { 
            res.locals.user = req.session.user;
            res.render( './pages/products', { 
                  title: 'Продукты', 
                  errors: [],
                  products: results
            });
        } 
        else {
            res.locals.user = 'Guest';  
            res.render( './pages/products', { 
                title: 'Продукты', 
                errors: [],
                products: results
            });     
        }                    
    });   
});

/* GET products/add page. */
router.get( '/add', function( req, res, next ) {
    if ( req.session.hasOwnProperty( 'user' ) ) {
        res.locals.user = req.session.user;
        res.render( './pages/productadd', { 
            title: 'Добавить продукт', 
            errors: [],
        });
    }
    else {
        res.locals.user = 'Guest';
        res.render( './pages/productadd', { 
            title: 'Добавить продукт', 
            errors: [],
        });
    }
});

/* POST products page. */
router.post( '/add',
    // Form filter and validation middleware 
    form(
        field( "name" ).trim().required().is( /^[a-zA-z\s']+$/ ),
        field( "title" ).trim().required().is( /^[a-zA-z\s']+$/ ),
        field( "description" ).trim().required().is( /^[a-zA-z\s]+$/ )
    ),

    // Express request-handler now receives filtered and validated data 
    function(req, res){
        if ( !req.form.isValid ) {
            res.locals.user = req.session.user; 
            res.status(401).render( 'pages/productadd', { 
                title: 'Добавить продукт', 
                errors: req.form.errors,
            });
        } 
        else {
            Product.find({ username: req.form.name },function ( err, results ) {
                if ( err ) {
                    return console.error(err);
                }

                if ( results.length ) {
                    res.locals.user = req.session.user;
                    res.render( 'pages/productadd', { 
                        title: 'Добавить продукт', 
                        errors: ['Продукт существует.']
                    });                    
                }
                else {
                    var product = new Product({ 
                        name: req.form.name, 
                        title: req.form.title,
                        description: req.form.description
                    });

                    product.save(function ( err, results ) {
                        res.redirect( '/products' );
                    });                  
                }
            });            
        }
    }
);

/* POST products page. */
router.post( '/delete',
    function(req, res){        
        if ( req.session.hasOwnProperty( 'user' ) ) {
            res.locals.user = req.session.user; 
            Product.findOneAndRemove({ name: req.body.product_name },function ( err, results ) {
                if ( err ) {
                    return console.error(err);
                }

                res.redirect( '/products' );
            });
        } 
    }
);

module.exports = router;
