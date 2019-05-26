"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");
var jsmin = require('gulp-jsmin');
var del = require("del");
var run = require("run-sequence");
var pug = require("gulp-pug");

gulp.task("clean", function() {
    return del("build");
});

gulp.task("copy", function() {
    return gulp.src([
        "fonts/**/*.{woff,woff2}",
        "img/**",
        "js/**",
    ], {
        base: "."
    })
        .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
    gulp.src("sass/style*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({browsers: [
                    "last 3 versions"
                ]}),
            mqpacker({
                sort: false
            })
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task("images", function() {
    return gulp.src("build/img/**/*.{png,jpg,gif}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true})
        ]))
        .pipe(gulp.dest("build/img"));
});


gulp.task("html", function buildHTML() {
    return gulp.src("*.pug")
        .pipe(plumber())
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest("build/"))
        .pipe(server.stream());
});

gulp.task("js", function() {
    gulp.src("js/script.js")
        .pipe(gulp.dest("build/js"))
        .pipe(jsmin())
        .pipe(rename("script.min.js"))
        .pipe(gulp.dest("build/js"));
});

gulp.task("js:copy", function() {
    return gulp.src("*js/script.js")
        .pipe(gulp.dest("build/js"))
        .pipe(jsmin())
        .pipe(rename("script.min.js"))
        .pipe(gulp.dest("build/js"))
        .pipe(server.stream());
});

gulp.task("js:update", function(done) {
  server.reload();
  done();
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.pug", ["html"]);
  gulp.watch("js/script.js", ["js:copy"]);
});

gulp.task ("build", function(fn) {
    run(
        "clean",
        "copy",
        "style",
        "js",
        "images",
        "html",
        fn
    );
});