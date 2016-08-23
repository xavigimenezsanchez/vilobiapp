var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var ngAnnotate = require("gulp-ng-annotate");
var sourcemaps = require("gulp-sourcemaps");
var nodemon = require("gulp-nodemon");
var clean = require('gulp-clean');
var runSequence = require('run-sequence');


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


gulp.task('del-dist', function() {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('copy-dist', ['del-dist'], function() {
    return gulp.src(['assets/**/*.*'])
        .pipe(gulp.dest("dist/assets"));
    /*gulp.src('dist/assets/js/vilobiApp.js')
        .pipe(clean({force:true}));*/
});
gulp.task('js-dist', ['copy-dist'], function () {
    return gulp.src(['ng/module.js','ng/**/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('vilobiApp.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/assets/js")); 
});


gulp.task('controllers-dist',['js-dist'],function() {
    return gulp.src(['controllers/**/*.js'])
                .pipe(gulp.dest('dist/controllers'))
});

gulp.task('layouts-dist',['controllers-dist'],function() {
    return gulp.src(['layouts/app.html','layouts/machine.html'])
                .pipe(gulp.dest('dist/layouts'));
});

gulp.task('templates-dist',['layouts-dist'], function() {
    return gulp.src(['templates/**/*.html'])
                .pipe(gulp.dest('dist/templates'));
})

gulp.task('dev', ['watch:js', 'dev:server']);

gulp.task('dist',['templates-dist'], function() {
    return gulp.src(['auth.js','config.js','db.js','server.js'])
                .pipe(gulp.dest('dist'));
});
