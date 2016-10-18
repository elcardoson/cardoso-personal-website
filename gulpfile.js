// Include gulp
var gulp = require('gulp');


 // Include plugins

var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var path = require('path');

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'minify-css'], function() {

    browserSync.init({
         server: "./app"
    });
   // gulp.watch("./less/*.less").on('change', browserSync.reload);
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
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

gulp.task('minify-css', ['less'], function() {
  return gulp.src('./app/css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./app/css/'))
    .pipe(browserSync.stream());
});

 // Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src('app/scripts/*.js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./dist/scripts/'));
});


 // Default Task
gulp.task('default', ['serve','scripts']);
