var gulp = require('gulp');
var iife = require('gulp-iife');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('default', ['build', 'watch']);

gulp.task('build', function () {
  return gulp.src('src/**/*.js')
    .pipe(concat('vk-api-angular.js'))
    .pipe(iife())
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['build']);
});
