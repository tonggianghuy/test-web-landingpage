const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()




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