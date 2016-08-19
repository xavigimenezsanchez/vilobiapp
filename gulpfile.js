var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var ngAnnotate = require("gulp-ng-annotate");
var sourcemaps = require("gulp-sourcemaps");
var nodemon = require("gulp-nodemon");

gulp.task('dev:server', function() {
    nodemon({
            script  :   'server.js',
            ext     :   'js',
            ignore  :   ['ng*','gulp*', 'assets*']
    });
});

gulp.task('js', function () {
    gulp.src(['ng/module.js','ng/**/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('vilobiApp.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("assets/js"));
});

gulp.task('js-dev', function () {
    gulp.src(['ng/module.js','ng/**/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('vilobiApp.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("assets/js"));
});

gulp.task('watch:js', ['js-dev'], function() {
    gulp.watch('ng/**/*.js', ['js-dev']);
});


gulp.task('copy-dist', function() {
    gulp.src(['assets/**/*.*'])
        .pipe(gulp.dest("dist/assets"));
})
gulp.task('js-dist', function () {
    

    gulp.src(['ng/module.js','ng/**/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('vilobiApp.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/assets/js"));
});


gulp.task('dev', ['watch:js', 'dev:server']);

gulp.task('dist', ['copy-dist','js-dist']);