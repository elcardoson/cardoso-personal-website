// Include gulp
var gulp = require('gulp');

// include init vars plugins 
var browserSync = require('browser-sync').create();
var path = require('path');
var bower = require('gulp-bower');
var tinypng = require('gulp-tinypng');


var config = {
     bowerDir: './app/bower_components' 
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'css'], function() {

    browserSync.init({
         server: "./app"
    });

    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/css/*.css").on('change', browserSync.reload);
});


gulp.task('html', function() {
    return gulp.src("app/*.html")
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src("app/css/*.css")
        .pipe(browserSync.stream());
});

gulp.task('tinypng', function () {
    gulp.src('app/images/uncompressed/*.png')
        .pipe(tinypng('QnQH2_9UnpfGd-mJYCKfoUSLMGxyzFwc'))
        .pipe(gulp.dest('app/images'));
});


gulp.task('default', ['serve', 'bower', 'tinypng']);



