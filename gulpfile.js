require('es6-promise').polyfill();

const { watch, dest, series, src } = require("gulp");

const mocha      = require('gulp-mocha');
const sourcemaps = require("gulp-sourcemaps");
const babel      = require("gulp-babel");
const nodemon    = require('gulp-nodemon');
const path       = require('path');


function build() {
  return src(["./src/**/*.js", "!./src/**/*.tests.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({
      plugins: ['@babel/transform-runtime']
    }))
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: path.join(__dirname, 'src')}
    ))
    .pipe( dest("./dist"));
}
function test () {
  return src('./src/**/*.tests.js', {read: false})
    .pipe( mocha({
      reporter: 'nyan',
      exit: true,
      require: [
        '@babel/register',
        '@babel/polyfill'
      ]
    }))
    .on('error', console.error)
}

function server () {
  return nodemon({
    script: './dist/server.js',
    watch: './src/*',
    tasks: ['build', 'test']
  })
}

//need to export this so that nodemon build will work
//if the task is not exported, it will not be registered by name
exports.build = build;
exports.test = test;
exports.default = series( build, test, server );
