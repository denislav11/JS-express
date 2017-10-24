const gulp = require('gulp');
const minifyCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

gulp.task('css', function () {
  return gulp.src('./public/css/*.css')
    .pipe(minifyCSS({
      compability: 'ie8'
    }))
    .pipe(gulp.dest('./build/css'))
});

gulp.task('htmlmin', function () {
  return gulp.src('./views/*.html')
  .pipe(htmlmin({collapseWhitespace:true}))
  .pipe(gulp.dest('./build/html'))
});

gulp.task('default', ['css', 'htmlmin']);