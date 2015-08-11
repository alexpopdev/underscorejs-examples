var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build', function() {
  gulp.src('app/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/'));
});