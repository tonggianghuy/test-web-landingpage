const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

/* 
TOP LEVEL FUNCTIONS USED IN GULP
gulp.task: used to define the task.
gulp.src: used to point the file to be used.
gulp.desc: used to point to th output folder
gulp.wathc: gulp watched the changes in the files so that we don't have run every time.
EXAMPLE:
gulp.task('message', gulp.series(function(done) {
    console.log("hello gulp config of rhp team");
    done();
}));
*/



gulp.task('sass', gulp.series(function (done) {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream())
    done()
}))

gulp.task('browserSync', gulp.series(function (done) {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    })
    done()
}))

gulp.task('configServer', gulp.series(['browserSync'], function (done) {

    gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('src/*.html', browserSync.reload)
}))

gulp.task('default', gulp.series('configServer', function (done) {
    done()
}))