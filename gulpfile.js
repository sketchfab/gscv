

var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var concatCss = require('gulp-concat-css');
var clean = require('gulp-clean');


gulp.task('connect', function() {
	connect.server({
	    root: [__dirname],
	    livereload: true,
	    port: 8080
	});
});

gulp.task('clean-css', function () {
    return gulp.src('css/style.css', {read: true})
        .pipe(clean())
        .pipe(connect.reload());
});

gulp.task('less', function () {
	return gulp.src('sources/less/*.less')
	.pipe(less())
	.pipe(gulp.dest('css/'))
	.pipe(connect.reload());
});

gulp.task('concat-css', function () {
  return gulp.src('css/*.css')
    .pipe(concatCss('style.css'))
    .pipe(gulp.dest('css/'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['sources/less/*.less'], ['less']);
});

gulp.task('default', ['connect','clean-css','less','concat-css','watch']);