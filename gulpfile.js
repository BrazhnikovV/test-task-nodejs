var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
//var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var newer  = require('gulp-newer');
var imagemin = require('gulp-imagemin');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
/*
gulp.task('sass', function() {
    return gulp.src('public/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});
*/

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return //gulp.src('public/js/*.js')
        gulp.src(['public/js/bootstrap.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'));
});

// Concatenate & Minify CSS
gulp.task('css', function () {
    //gulp.src('public/css/*.css')
    gulp.src([
        'public/css/main.css',
        'public/css/bootstrap.css'
    ])
    .pipe(concat('all.css'))
    .pipe(cssmin())        
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('public/dist/css'));
});

// copy fonts
gulp.task('copy', function () {
    return gulp.src(['public/webfonts/**/*', 'public/webfonts/**/*'])
      .pipe(gulp.dest('public/dist/webfonts'));
});

// image processing
/*
gulp.task('images', function() {
    return gulp.src('public/images/*')
      .pipe(newer('public/dist/images'))
      .pipe(imagemin({ optimizationLevel: 2 }))
      .pipe(gulp.dest('public/dist/images'));
  });
*/

// Watch Files For Changes
//gulp.task('watch', function() {
//    gulp.watch('public/js/*.js', ['lint', 'scripts']);
//    gulp.watch('public/scss/*.scss', ['sass']);
//    gulp.watch('public/images/*', ['images']);
//});

// Default Task
gulp.task('default', ['copy','lint', /*'images', 'sass',*/ 'scripts', 'css'/*,'watch' */]);