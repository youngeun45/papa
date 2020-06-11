// require gulp module
const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const cache = require('gulp-cache');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify');
const browserify = require('browserify');
const babelify = require('babelify');
const autoprefixer = require('gulp-autoprefixer');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

// path config
const entryJSPoint = './src/js/App.js';
const browserDir = './';
const sassWatchPath = './src/scss/**/*.scss';
const jsWatchPath = './src/js/**/*.js';
const spriteWatchPath = './src/img/**/*.png';
const imgWatchPath = './src/images/**/*';
const htmlWatchPath = './html/**/*';

gulp.task('bs' , function(){
    browserSync.init({
        server: {
            baseDir : browserDir,
            directory: true,

        },
        port : 7070,
        ui: {
            port: 57070,
            weinre: {
                port: 59090
            }
        },
        open: false
    });
});


gulp.task('scss', function () {
    return gulp.src( sassWatchPath )
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('./_sassMaps'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({stream: true}));

});

gulp.task('sprite', function () {
    let timeStamp = new Date().getTime();
    let spriteData = gulp.src( spriteWatchPath )
        .pipe(spritesmith({
            imgName: 'dist/sprite.png',
            cssName: 'src/scss/_sprite.scss',
            cssTemplate: 'src/scss/scss.handlebars',
            cssVarMap: function (sprite ) {
                let current_f = path.parse(path.parse( sprite.source_image ).dir).base;
                sprite.name = current_f + '-' +sprite.name;
                sprite.force_cached_image = sprite.image + '?' + timeStamp;
            },

        }));
    return spriteData.pipe(gulp.dest('./'));
});
 
gulp.task('img:min', function () {
    gulp.src(imgWatchPath)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('javascript', function () {
    return browserify( entryJSPoint, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:min', function () {
    gulp.src(jsWatchPath)
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.min.js', '-min.js']
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:product', function () {
    return browserify( entryJSPoint, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('init', function(){
    runSequence('sprite', 'img:min', 'scss', 'js:min', 'bs');
});

gulp.task('watch', function () {

    watch( spriteWatchPath, function(){
        gulp.start('sprite');
    });
    watch( imgWatchPath, function(){
        gulp.start('img:min');
    });
    watch( sassWatchPath, function(){
        gulp.start('scss');
    });
    watch( jsWatchPath, function () {
        gulp.start('js:min');
    });
    watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}));
    });
});

gulp.task('clean', function (done) {
    return cache.clearAll(done);
});

// gulp develop
gulp.task('default', ['clean','init','watch']);

// git merge 후 또는 배포 전 gulp product 실행 후 dist 폴더 배포
gulp.task('product', function(){
    runSequence('sprite','img:min', 'scss', 'js:product');
});