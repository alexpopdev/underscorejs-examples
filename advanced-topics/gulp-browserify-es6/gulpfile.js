var gulp = require('gulp');
var open = require('gulp-open');
var glob = require('glob');

var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build-app', function() {
  return browserify('./app/index_client.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('build-tests', function() {
  var specFiles = glob.sync('./spec/**/*Spec.js');
  return browserify({
      entries: specFiles
    })
    .bundle()
    .pipe(source('specs.js'))
    .pipe(gulp.dest('./spec/output/'));
});

gulp.task('open-app', ['build-app'], function() {
  return gulp.src('./index.html')
    .pipe(open());
});

gulp.task('open-tests', ['build-tests'], function() {
  return gulp.src('./SpecRunner.html')
    .pipe(open({
      app: 'firefox'
    }));
});

gulp.task('default', ['open-app', 'open-tests'], function() {
  // using the default task to trigger all the other tasks for this project
});