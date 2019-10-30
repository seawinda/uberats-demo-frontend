"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var typograf = require("typograf");
var server = require("browser-sync").create();
var ghPages = require('gh-pages');
var path = require('path');



gulp.task("style", function () {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task('typograf', function () {
  gulp.src('source/*.html')
    .pipe(typograf({
      locale: ['ru', 'en-US']
    }))
    .pipe(gulp.dest('source/test'));
});

gulp.task('deploy', function () {
  ghPages.publish(path.join(process.cwd(), './source'));
});
