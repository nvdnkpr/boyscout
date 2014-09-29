var path = require('path'),
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    debug = false;

gulp.task('css', function() {
  var options = {
    errLogToConsole: true
  };
  if (!debug) {
    options.outputStyle = 'expanded';
    options.sourceComments = 'map';
  }
  var cssTask = gulp.src([
    'sass/base.scss',
    'sass/theme/painting/styles.scss'
  ], { base: 'sass' }).pipe(sass(options));
  if (!debug) {
    cssTask.pipe(minifyCSS());
  }
  cssTask
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  gulp.watch(['index.html'], function() {
    gulp.src(['index.html'])
      .pipe(connect.reload());
  });

  connect.server({
    livereload: true
  });
});

function changeNotification(event) {
  console.log('File', event.path, 'was', event.type, ', running tasks...');
}

gulp.task('watch-mode', function() {
  var cssWatcher = gulp.watch('sass/**/*.scss', ['css']);

  cssWatcher.on('change', changeNotification);
});

gulp.task('debug', function() {
  debug = true;
});

gulp.task('default', ['watch-mode', 'css']);
gulp.task('server', ['connect', 'default']);
