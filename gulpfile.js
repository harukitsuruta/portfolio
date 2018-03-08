// gulpプラグインの読み込み
const gulp = require('gulp'),
  // Sassをコンパイルするプラグインの読み込み
  sass = require('gulp-sass'),
  // Sassのソースマップを出力するプラグインの読み込み
  sourcemaps = require('gulp-sourcemaps'),
  // JSを結合するプラグインの読み込み
  uglify = require('gulp-uglify'),
  // JSをmin化するプラグインの読み込み
  concat = require('gulp-concat'),
  // エラーを起こしてもタスクが停止しないようにするプラグインの読み込み
  plumber = require('gulp-plumber'),
  // ファイル名を変更するプラグインの読み込み
  rename = require('gulp-rename');

// SASSのコンパイルを行うタスク
gulp.task('css', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    // Sassのコンパイルを実行
    .pipe(sass({
      outputStyle: 'compressed'//expanded,compressed
    }))
    //ソースマップの出力
    .pipe(sourcemaps.write('maps'))
    // cssフォルダー以下に保存
    .pipe(gulp.dest('docs/css'));
});

// defaultタスク
gulp.task('default', function () {
  //ファイルを監視（CSS）
  gulp.watch(['src/sass/**/*.scss'], ['css']);
  //ファイルを監視（JS）
  //gulp.watch(['src/js/**/*.js'], ['js']);
});