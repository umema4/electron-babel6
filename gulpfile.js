const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const runSequence = require('run-sequence');
const del = require('del');

const BUILD_DIR = path.join(__dirname, '/assets/');

gulp.task('bootstrap', () => {
  return gulp.src('src/scss/custom-bootstrap.scss')
    .pipe($.sass())
      .on('error', (err) => {
        console.log(err.message);
      })
    .pipe(gulp.dest('src/css'));
});

gulp.task('check-transformed-code', () => {
  return gulp.src('src/**/*.{js,jsx}')
    .pipe($.babel())
    .pipe(gulp.dest('build'));
});

gulp.task('build-clean', () => {
  return del([BUILD_DIR]);
});

gulp.task('webpack-dev', () => {
  return gulp.src('src/**/*.{js, jsx}')
    .pipe($.env.set({
      NODE_ENV: 'dev',
    }))
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('webpack-prod', () => {
  return gulp.src('src/**/*.{js, jsx}')
    .pipe($.env.set({
      NODE_ENV: 'production',
    }))
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('build-dev', () => {
  runSequence('lint',
    'build-clean',
    'bootstrap',
    'webpack-dev');
});

gulp.task('build-prod', () => {
  runSequence('lint',
    'build-clean',
    'bootstrap',
    'webpack-prod');
});

gulp.task('default', ['build-dev']);
