// Include gulp
var gulp = require('gulp');


 // Include plugins

var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var path = require('path');
var del = require('del');

gulp.task('clean', function(){
  return del('./deploy/**/*');
});

gulp.task('copy-all', function() {
    return gulp
        .src(['app/components/**/*.*',
              'app/css/**/*.*',
              'app/images/*.*',
              'app/**/*.html'], { "base" : "./app" })
        .pipe(gulp.dest('./deploy/'));
});


// Static Server + watching scss/html files
gulp.task('serve', ['copy-all', 'html', 'minify-css'], function() {

    browserSync.init({
         server: "./deploy"
    });
   // gulp.watch("./less/*.less").on('change', browserSync.reload);
    gulp.watch("app/js/*.js", ['scripts, copy-all']);
    gulp.watch("app/*.html", ['copy-all']);
    gulp.watch("./less/*.less", ['minify-css']);
    gulp.watch("./app/*.html").on('change', browserSync.reload);
    gulp.watch("./app/scripts/*.js").on('change', browserSync.reload);
});


gulp.task('html', function() {
    return gulp.src("./app/*.html")
        .pipe(browserSync.stream());
});


gulp.task('less', function () {
  return gulp.src('./less/styles.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./deploy/css'))
    .pipe(browserSync.stream());
});

gulp.task('minify-css', ['less'], function() {
  return gulp.src('./deploy/css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./deploy/css/'))
    .pipe(browserSync.stream());
});

 // Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src('./app/scripts/*.js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./deploy/scripts/'));
});


 
gulp.task('build', ['copy-all', 'minify-css']);
gulp.task('default', ['serve','scripts']);

