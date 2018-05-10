// подключить главные модули приложения
var express = require('express');
var router = express.Router();
// подключить express-form
var form = require('express-form');
var field = form.field;
// Модель пользователя системы
var Product = require( '../app/models/product' ).Product;
// Генератор случайных картинок
var fs = require('fs');
var img_gen = require('js-image-generator');
// Количество продуктов на странице
var count_prods_on_page = 1;
// Количество кнопок в пагинации
var count_pgn_buttons = 5;
// Объект pagination
var pagination = {};

/* GET products page. */
router.get( '/', function( req, res, next ) {      
    Product.find({},function ( err, results ) {
        if ( err ) {
            return console.error( err );
        }

        pagination.cnt_records = results.length;

        if ( req.session.hasOwnProperty( 'user' ) ) {
            res.locals.user = req.session.user;            
            res.render( './pages/products', { 
                title: 'Продукты', 
                products: results.splice( 0, count_prods_on_page ),
                pagination: pagination
            });
        } 
        else {
            res.locals.user = 'Guest';
            res.render( './pages/products', { 
                title: 'Продукты', 
                products: results.splice( 0, count_prods_on_page ),
                pagination: pagination
            });     
        }                    
    });   
});

/* GET products/page page. */
router.get( '/page/*', function( req, res, next ) {      
    
    let arr_route = req.path.split("/");
    let cur_page = arr_route[2];
    //res.locals.breadcrumbs = {};

    Product.count({}, function( err, cnt_results ) {               
        pagination.cnt_records = cnt_results;
        pagination.cur_page = cur_page;

        Product.find( {}, function ( err, results ) {
            if ( err ) {
                return console.error( err );
            }
    
            if ( req.session.hasOwnProperty( 'user' ) ) {
                res.locals.user = req.session.user;            
                res.render( './pages/products', { 
                    title: 'Продукты', 
                    products: results,
                    pagination: pagination
                });
            }
            else {
                res.locals.user = 'Guest';
                res.render( './pages/products', { 
                    title: 'Продукты', 
                    products: results,
                    pagination: pagination
                });
            }
        })
        .skip( ( cur_page -1 ) )
        .limit( count_prods_on_page );
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

/* POST products/add page. */
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
                    img_gen.generateImage(800, 600, 80, function(err, image) {
                        fs.writeFileSync('public/dist/images/'+req.form.name+'.jpg', image.data);

                        var product = new Product({ 
                            name: req.form.name, 
                            title: req.form.title,
                            description: req.form.description,
                            image: '/dist/images/'+req.form.name+'.jpg'
                        });
    
                        product.save(function ( err, results ) {
                            res.redirect( '/products' );
                        });
                    });                                       
                }
            });            
        }
    }
);

/* POST products/delete page. */
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
        else {
            res.redirect( '/products' );
        }
    }
);

/* POST products/deleteall page. */
router.post( '/deleteall',
    function(req, res){        
        if ( req.session.hasOwnProperty( 'user' ) ) {
            res.locals.user = req.session.user; 
            Product.remove(function ( err, results ) {
                if ( err ) {
                    return console.error(err);
                }

                res.redirect( '/products' );
            });
        } 
        else {
            res.redirect( '/products' );
        }
    }
);

module.exports = router;
