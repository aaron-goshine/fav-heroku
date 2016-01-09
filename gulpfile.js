'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var del = require('del');

var config = {
  paths: {
    source: ['./source/js/**/*.js'],
    tests: ['./test/js/test/*.js']
  }
};

gulp.task('styles', function () {
  return sass('source/stylesheets/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/styles/'));
});

gulp.task('styles2', function () {
  return sass('source/stylesheets/photos-main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/styles/'));
});

gulp.task('scripts', function () {
  return gulp.src('source/js/**/*.js')
    .pipe(concat('build.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('clean', function () {
  return del(['public/styles/*', 'public/js/*']);
});

gulp.task('watch', function () {
  gulp.watch('source/stylesheets/**/*.scss', ['styles']);
  gulp.watch('source/js/**/*.js', ['scripts']);
  livereload.listen();
  gulp.watch(['source/js', 'source/stylesheets/'])
  .on('change', livereload.changed);
});

gulp.task('default', ['styles', 'styles2', 'scripts']);
