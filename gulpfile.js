const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const runSequence = require('run-sequence');
const stylelint = require('gulp-stylelint').default;
const consoleReporter = require('gulp-stylelint-console-reporter').default;
const del = require('del');
const pngquant = require('imagemin-pngquant');

const BUILD_DIR = path.join(__dirname, '/assets/');
const BUILD_IMG_DIR = path.join(__dirname, '/assets/images');

gulp.task('bootstrap-dev', () => {
  return gulp.src('src/scss/custom-bootstrap.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass())
      .on('error', (err) => {
        console.log(err.message);
      })
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('bootstrap-prod', () => {
  return gulp.src('src/scss/custom-bootstrap.scss')
    .pipe($.sass())
      .on('error', (err) => {
        console.log(err.message);
      })
    .pipe($.cssnano())
    .pipe(gulp.dest(BUILD_DIR));
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
  return gulp.src('src/**/*.{js, jsx, css}')
    .pipe($.env.set({
      NODE_ENV: 'dev',
    }))
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('webpack-prod', () => {
  return gulp.src('src/**/*.{js, jsx, css}')
    .pipe($.env.set({
      NODE_ENV: 'production',
    }))
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('eslint', () => {
  return gulp.src(['src/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('stylelint', () => {
  return gulp.src(['src/**/*.css'])
    .pipe(stylelint({
      reporters: [
        consoleReporter(),
      ],
    }));
});

gulp.task('imgmin', () => {
  return gulp.src(['src/images/*'])
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [
        { removeViewBox: false },
        { cleanupIDs: false },
      ],
      use: [pngquant()],
    }))
    .pipe(gulp.dest(BUILD_IMG_DIR));
});

gulp.task('lint', ['eslint', 'stylelint']);

gulp.task('build-dev', () => {
  runSequence('lint',
    'build-clean',
    'bootstrap-dev',
    'webpack-dev');
});

gulp.task('build-prod', () => {
  runSequence('lint',
    'build-clean',
    'bootstrap-prod',
    'webpack-prod');
});

gulp.task('default', ['build-dev']);
