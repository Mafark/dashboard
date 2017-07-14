var gulp = require('gulp'),
  watch = require('gulp-watch'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync'),
  htmlmin = require('gulp-htmlmin'),
  reload = browserSync.reload;

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/style/',
    img: 'build/img/',
    libs: 'build/libs/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/main.js',
    style: 'src/style/main.scss',
    img: 'src/img/**/*.*',
    libs: 'src/libs/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/img/**/*.*'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: './build'
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  notify: false,
  livereload: true
};

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true }));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({ stream: true }));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({ stream: true }));
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'image:build'
]);

gulp.task('watch', function () {
  watch([path.watch.html], function (event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function (event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function (event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function (event, cb) {
    gulp.start('image:build');
  });
});

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);

gulp.task('libs:build', function () {
  gulp.src(path.src.libs)
    .pipe(gulp.dest(path.build.libs));
});