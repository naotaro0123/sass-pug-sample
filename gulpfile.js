var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber  = require('gulp-plumber');
var pug = require('gulp-pug');

var targetPath = './chapter1/';
var inputPath = {
    'scss': targetPath + 'src/sass/**/*.scss',
    'js': targetPath + 'src/js/**/*.js',
    'pug': [targetPath + 'src/pug/**/*.pug', '!' + targetPath + 'src/pug/**/_*.pug'],
};
var outputPath = {
    'css': targetPath + 'dist/css/',
    'js': targetPath + 'dist/js/', 
    'html': targetPath + 'dist/',
};
var sassOptions = {
    outputStyle: 'commpressed'
};
var pugOptions = {
    pretty: true
};

gulp.task('scss', function() {
    gulp.src(inputPath.scss)
        .pipe(plumber())
        .pipe(sass(sassOptions))
        .pipe(autoprefixer())
        .pipe(gulp.dest(outputPath.css));
});

gulp.task('pug', function() {
    gulp.src(inputPath.pug)
        .pipe(plumber())
        .pipe(pug(pugOptions))
        .pipe(gulp.dest(outputPath.html));
});

gulp.task('babel', function() {
    gulp.src(inputPath.js)
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest(outputPath.js));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: outputPath.html
        }
    });
    gulp.watch(outputPath.js, ['reload']);
    gulp.watch(outputPath.html, ['reload']);
    gulp.watch(outputPath.css, ['reload']);
});

gulp.task('reload', function() {
    browserSync.reload();
});

gulp. task('watch', function() {
    gulp.watch(inputPath.scss, ['scss']);
    gulp.watch(inputPath.pug, ['pug']);
    gulp.watch(inputPath.js, ['babel']);
});

gulp. task('build', ['scss', 'pug', 'babel']);

// gulp.task('default', ['browser-sync', 'watch']);
gulp.task('default', ['watch']);

