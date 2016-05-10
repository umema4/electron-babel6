const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const runSequence = require('run-sequence');
const stylelint = require('gulp-stylelint').default;
const consoleReporter = require('gulp-stylelint-console-reporter').default;
const del = require('del');
const pngquant = require('imagemin-pngquant');
const packager = require('electron-packager');

const RELEASE_DIR = path.join(__dirname, '/release/');
const DIST_DIR = path.join(__dirname, '/dist/');
const BUILD_DIR = path.join(__dirname, '/dist/assets/');
const BUILD_IMG_DIR = path.join(__dirname, '/dist/assets/images');

gulp.task('bootstrap', () => {
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

gulp.task('release-clean', () => {
  return del([RELEASE_DIR]);
});

gulp.task('build-clean', () => {
  return del([DIST_DIR]);
});

gulp.task('copy-package', () => {
  return gulp.src('./package.json')
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task('copy-index', () => {
  return gulp.src('./index.html')
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task('copy-mainjs', () => {
  return gulp.src('./main.js')
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task('webpack', () => {
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

gulp.task('lint', ['eslint', 'stylelint']);

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

gulp.task('package-win', (done) => {
  packager({
    dir: 'dist',
    out: 'release/win',
    name: 'ElectronApp',
    arch: 'x64',
    platform: 'win32',
    version: '0.37.2',
  }, (err, pt) => {
    done();
  });
});

gulp.task('release', () => {
  runSequence(
    'release-clean',
    'build-prod',
    'package-win'
  );
});

gulp.task('build', () => {
  runSequence(
    'build-clean',
    ['lint', 'copy-package', 'copy-index', 'copy-mainjs',
     'imgmin', 'bootstrap', 'webpack']
  );
});

gulp.task('build-prod', () => {
  runSequence(
    'build-clean',
    ['lint', 'copy-package', 'copy-index', 'copy-mainjs',
     'imgmin', 'bootstrap-prod', 'webpack-prod']
  );
});

gulp.task('default', ['build']);
