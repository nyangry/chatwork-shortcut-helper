var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var gutil  = require('gulp-util');

// default task
gulp.task('default', ['coffee', 'dist_js'], function () {
  gulp.watch('src/*.coffee', ['dist_js']);
});

// compile coffee to js
gulp.task('coffee', function() {
  // return することで実行順序を保証
  return gulp.src('src/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('src'));
});

// minify and concat content_scripts js
gulp.task('dist_js', ['coffee'], function() {
  gulp
    .src([
      './node_modules/jquery/dist/jquery.min.js',
      './src/*.js',
    ])
    .pipe(uglify({
      preserveComments: 'license'
    }).on('error', gutil.log))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'));
});
