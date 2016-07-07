var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bower = require('gulp-bower');

var config = {
    sassPath: './sources/sass',
    bowerDir: './bower_components',
    bootstrapDir: './bower_components/bootstrap-sass',
    npmDir: './node_modules'
};

gulp.task('css', function() {
    return gulp.src(config.sassPath + '/style.scss')
        .pipe(sass({
            style: 'compressed',
            loadPath: [
                './app/sass',
                config.bootstrapDir + '/assets/stylesheets'
            ]
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('default', ['css']);