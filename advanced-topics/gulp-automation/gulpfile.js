var gulp = require('gulp');
var concat = require('gulp-concat');

var appScripts = 'app/**/*.js';
gulp.task('build', function() {
  gulp.src(appScripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('build-for-test', function() {
  gulp.src([appScripts, '!app/index.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./tests/public/'));
});