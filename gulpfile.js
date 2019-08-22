const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"  /* Меняем значение с src на dist */
        }
    });
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

// Add style from sass or scss to style.min.css, clean code, compress code
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({            
            prefix: "",
            suffix: ".min"            
          }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css")) /* Меняем значение с src на dist */
        .pipe(browserSync.stream());
});

// Watch for changes in sass or scss and html files made - browser will reload
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles")); /* Добавляем значение css  */
    gulp.watch("src/*.html").on("change", gulp.parallel('html'));
});

// Минимизируем html файлы и перемещаем их в dist
gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))
});

// Перемещаем файлы js в dist
gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")        
        .pipe(gulp.dest("dist/js"))
});

// Перемещаем шрифты в dist
gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")        
        .pipe(gulp.dest("dist/fonts"))
});

// Перемещаем иконки в dist
gulp.task('icons', function() {
    return gulp.src("src/icons/**/*")        
        .pipe(gulp.dest("dist/icons"))
});

// Перемещаем mailer в dist
gulp.task('mailer', function() {
    return gulp.src("src/mailer/**/*")        
        .pipe(gulp.dest("dist/mailer"))
});

// Перемещаем и оптимизируем картинки
gulp.task('images', function() {
    return gulp.src("src/img/**/*") 
        .pipe(imagemin())       
        .pipe(gulp.dest("dist/img"))
});

// Include all tasks in one default
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer', 'images'));