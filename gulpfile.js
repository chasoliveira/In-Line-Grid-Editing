var gulp = require('gulp');
var minify = require('gulp-minify');
var useref = require('gulp-useref');
var concat = require('gulp-concat')
gulp.task('build', function () {
  return gulp.src('src/*.*') // Get source files with gulp.src
    .pipe(useref())
    .pipe(concat('in-line-grid-editing.js'))
    .pipe(minify({ext:{
            src:'-debug.js',
            min:'-min.js'
        }}))
    .pipe(gulp.dest('dist')) // Outputs the file in the destination folder
});
gulp.task('copyToDemo', function () {
  return gulp.src('src/*.*') // Get source files with gulp.src
    .pipe(useref())
    .pipe(concat('in-line-grid-editing.js'))
    .pipe(minify({ext:{
            src:'-debug.js',
            min:'-min.js'
        }}))
    .pipe(gulp.dest('demo/InLineGridEditing/Scripts')) // Outputs the file in the destination folder
})
