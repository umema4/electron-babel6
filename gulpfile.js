const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('compile', () => {
  return gulp.src('src/**/*.{js,jsx}')
    .pipe($.babel())
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['compile']);
gulp.task('default', ['build']);
