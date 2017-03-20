/** eslint */
const gulp = require('gulp');
const shell = require('gulp-shell');
const clean = require('gulp-clean');
// const group = require('gulp-group-files');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
// const spriter = require('gulp-css-spriter');
// const base64 = require('gulp-base64');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const task = require('tsp-util/lib/task');
// const replace = require('gulp-replace');
// const livereload = require('gulp-livereload');

const env = process.argv[2];
// const filesetScss = {
//   src: enterSass
//   // base64: {
//   //   baseDir: './src/containers/**/img/base64/',
//   //   extensions: ['png', 'webp', 'jpg'],
//   //   maxImageSize: 10 * 1024, // bytes
//   //   debug: false
//   // }
//   // spriter: {
//   //   spriteSheet: '../Server/www/static/img/index_sprite.png',
//   //   pathToSpriteSheetFromCSS: '../img/index_sprite.png',
//   //   spritesmithOptions: {
//   //     padding: 2
//   //   }
//   // }
// };


function scssCompile() {
  const dest = './assert/css';
  return gulp.src('./src/entry/scss/*.scss', { base: './src/entry/scss' })
    .pipe(gulpif(env === 'dev', plumber()))
    .pipe(gulpif(env === 'dev', changed(dest)))
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    // .pipe(gulpif(fileset.spriter !== undefined, spriter(fileset.spriter)))
    // .pipe(gulpif(fileset.sprbase64iter !== undefined, base64(fileset.base64)))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'Firefox < 20'],
      cascade: false
    }))
    .pipe(gulpif(env === 'dev', sourcemaps.write('./')))
    .pipe(gulpif(env !== 'dev', minifycss()))
    .pipe(gulp.dest('./output/assert/css'));
}

function imgToBuild() {
  return gulp.src('./src/res/img/*.*', { base: './src/res/img' })
    .pipe(gulp.dest('./output/assert/img'));
}

function buildImgClean() {
  return gulp.src('./output/assert/img/*', { read: false })
    .pipe(clean());
}

function addCommonJs() {
  return gulp.src('./src/res/js/*.*', { base: './src/res/js' })
    .pipe(gulp.dest('./output/assert/js'));
}
function addCommonCss() {
  return gulp.src('./src/res/css/*.*', { base: './src/res/css' })
    .pipe(gulp.dest('./output/assert/css'));
}

function addFonts() {
  return gulp.src('./src/res/fonts/*.*', { base: './src/res/fonts' })
    .pipe(gulp.dest('./output/assert/fonts'));
}

function html() {
  return gulp.src('./src/page/**/*.html')
    .pipe(gulpif(env === 'dev', changed('./output', { extension: '.html' })))
    .pipe(gulp.dest('./output'));
}

function outputHtml() {
  return gulp.src('./src/page/**/*.html ', { base: './src/page/' })
    .pipe(gulp.dest('./huatianweb'));
}

const filesetSvg = {
  src: './src/**/**/svg/*.svg',
  dest: './output/assert'
};

task.svgSprites = task.svgSprites.bind(null, filesetSvg);

function watch() {  
  gulp.watch('./src/**/**/svg/*.svg', gulp.parallel(task.svgSprites));
  gulp.watch('./src/**/*.scss', gulp.parallel(scssCompile));
  // gulp.watch('./src/**/**/svg/*.svg', gulp.parallel(task.svgSprites));
  gulp.watch('./src/page/**/*.html', gulp.parallel(html));
  gulp.watch('./src/res/img/*.*', gulp.parallel(gulp.series(
      imgToBuild
    ))
  );
  gulp.watch('./src/res/js/*.*', gulp.parallel(gulp.series(
      addCommonJs
    ))
  );
  gulp.watch('./src/res/css/*.*', gulp.parallel(gulp.series(
      addCommonCss
    ))
  );
  gulp.watch('./src/res/fonts/*.*', gulp.parallel(gulp.series(
      addFonts
    ))
  );
}

gulp.task('webpack', shell.task([
  'set NODE_ENV=production&&webpack --build --progress --profile --colors'
]));

gulp.task('dev', gulp.series(
  buildImgClean,
  imgToBuild,
  task.svgSprites,
  html,
  scssCompile,
  addCommonJs,
  addCommonCss,
  addFonts,
  watch
));

gulp.task('build', gulp.series(
  buildImgClean,
  imgToBuild,
  task.svgSprites,
  scssCompile, 
  html,
  outputHtml,
  addCommonCss,
  addFonts,
  addCommonJs
  // 'webpack'
));
