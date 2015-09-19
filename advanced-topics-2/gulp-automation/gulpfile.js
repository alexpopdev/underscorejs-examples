var gulp = require('gulp');
var concat = require('gulp-concat');
var open = require('gulp-open');

var appScripts = 'app/**/*.js';
gulp.task('build-app', function() {
  gulp.src(appScripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('build-tests', function() {
  gulp.src([appScripts, '!app/index.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./spec/public/'));
});

gulp.task('open-app', ['build-app'], function() {
  gulp.src('./index.html')
    .pipe(open());
});

gulp.task('open-tests', ['build-tests'], function() {
  gulp.src('./SpecRunner.html')
    .pipe(open({
      app: 'firefox'
    }));
});

gulp.task('default', ['open-app', 'open-tests'], function() {
  // using the default task to trigger all the other tasks for this project
});