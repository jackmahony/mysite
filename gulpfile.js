var gulp = require('gulp');
var haml = require('gulp-haml');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

// Folders
var paths = {
	sass: ['./sass/**/*.sass','./sass/**/*.scss'],
	haml: ['./haml/**/*.haml'],

  js: [
  ],

  vendor: [
    './bower_components/animate.css/animate.min.css'
  ],

	compiled: [
	 './templates/*.twig',
	 './js/**/*.js',
	 './assets/**/*'
 ]
};

// HAML
gulp.task('haml', function () {
  gulp.src(paths.haml)
    .pipe(haml({ext: '.twig'}))
    .pipe(gulp.dest('./templates'))
});

// SASS
gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      css: './assets/stylesheets',
      sass: 'sass'
    }))
    .pipe(nano())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./assets/stylesheets'))
		.pipe(browserSync.stream());
});

// Watch
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.haml, ['haml']);
  gulp.watch(paths.js, ['js']);

	gulp.watch(paths.compiled).on('change', browserSync.reload);

  browserSync.init({
      proxy: "http://localhost/Jack_site/"
  });
});

// Default gulp task
gulp.task('default', ['watch']);
