const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('compile', () => {
  return gulp.src('src/**/*.{js,jsx}')
    .pipe($.babel())
    .pipe(gulp.dest('build'));
});

gulp.task('lint',function(){
  return gulp.src(['src/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('build', ['compile']);
gulp.task('default', ['build']);
