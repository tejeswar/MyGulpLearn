/*
This application has been developed by following the below tutorial
https://www.youtube.com/watch?v=1rw9MfIleEg

https://www.youtube.com/watch?v=rmXVmfx3rNo

*/

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
gulp.task('message', function(){
    console.log("Hellow world...");
});

gulp.task('copyHtmlFiles',function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('imageMin',function(){
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('minifyJs',function(){
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});
gulp.task('sass',function(){
    gulp.src('src/scss/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css'))
    //.pipe(browserSync.stream())
});
gulp.task('concat',function(){
gulp.src('src/js/*.js')
.pipe(concat('main.js'))
.pipe(uglify())
.pipe(gulp.dest('dist/js'));
});
gulp.task('watch',function(){
    gulp.watch('src/index.html',['copyHtmlFiles']);
    gulp.watch('src/js/*.js',['concat']);
    gulp.watch('src/scss/*.scss',['sass']);
    gulp.watch('src/images/*',['imageMin']);

});
gulp.task('serve',function(){
    browserSync.init({
        server:'./dist'  //the internal server will pick up the content from the dist folder and run the appl
    });
    gulp.watch('src/scss/*.scss',['sass']).on('change',browserSync.reload);
});
//gulp.task('default',['message','copyHtmlFiles','imageMin','minifyJs','sass'])
gulp.task('default',['message','copyHtmlFiles','imageMin','concat','sass','serve','watch'])