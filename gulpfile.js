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
  rename = require('gulp-rename'),
  // browserSyncプラグインの読み込み
  browserSync = require('browser-sync').create();

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
    .pipe(gulp.dest('docs/css'))
    .pipe(browserSync.stream());
});

// JSの結合を行うタスク
gulp.task('js.concat', function () {
  //読み込む順序を指定
  const jsFiles = [
    'src/js/stats.js',
    'src/js/particles.js',
    'src/js/index.js'
  ];
  return gulp.src(jsFiles)
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

// JSのmini化を行うタスク
gulp.task('js.uglify', function () {
  return gulp.src('src/js/main.js')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('docs/js'))
    .pipe(browserSync.stream());
});

// タスクをまとめる
gulp.task('js', ['js.concat', 'js.uglify']);  

// 更新を監視するタスク
gulp.task('watch', function(){
  //browserSyncを実行
  browserSync.init({
    server: {
      baseDir: "docs"
    }
  });
  //ファイルを監視（CSS）
  gulp.watch(['src/sass/**/*.scss'], ['css']);
  //ファイルを監視（JS）
  gulp.watch(['src/js/**/*.js'], ['js']);
});


// defaultタスク
gulp.task('default', ['css', 'watch']);