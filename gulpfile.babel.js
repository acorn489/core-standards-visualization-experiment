/*globals process:false*/

import "babel-polyfill";
import gulp from "gulp";
import del from "del";
import extractXMLData from "./src/extractXMLData";
import fs from "fs";
import mocha from "gulp-mocha";
import uglify from "gulp-uglify";
import babel from "babel-core/register";
import livereload from "gulp-livereload";
import http from "http";
import ecstatic from "ecstatic";
import runSequence from "run-sequence";
import {loadFile} from "./src/helpers";
import gutil from "gulp-util";
import sass from "gulp-sass";
import babelify from "babelify";
import browserify from "browserify";
import browserifyHandlebars from "browserify-handlebars";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";

let SERVER_ADDRESS = "0.0.0.0";

gulp.task("clean", () => {
  return del(["build"]);
});

gulp.task("test", () => {
  return gulp.src(["test/**/*.js"])
    .pipe(mocha({compilers: {js: babel}}));
});

gulp.task("sass", () => {
  gulp.src("src/**/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("build/"));
});

gulp.task("html", () => {
  gulp.src("src/html/index.html")
    .pipe(gulp.dest("build/"));
});

gulp.task("browserify", () => {
  browserify({entries: "./src/main.js", extensions: [".js"], debug: true})
   .transform(babelify)
   .transform(browserifyHandlebars)
   .bundle()
   .pipe(source("bundle.js"))
   .pipe(buffer())
   .pipe(uglify())
   .pipe(gulp.dest("build/js"));
});

gulp.task("build", ["clean"], (done) => {
  extractXMLData(loadFile("../xml/math.xml"))
    .then(data => {
      fs.mkdirSync("build");
      fs.writeFileSync("build/data.json", JSON.stringify(data));
      runSequence("sass", "html", "browserify");
      livereload.reload();
      done();
    })
    .catch(e => console.log(e, e.stack));
});

gulp.task("watch", () => {
  livereload.listen();
  gulp.watch(
    ["src/**/*.js", "src/**/*.handlebars", "test/**/*.js", "src/**/*.sass"],
    ["build"]
  );
});

gulp.task("deploy", () => {
  let port = process.env.PORT || 8080;
  let server = http.createServer(
    ecstatic({root: __dirname + "/build"})
  ).listen(port, SERVER_ADDRESS, () => gutil.log(
    gutil.colors.red(`Listening on http://${server.address().address}:${port}`)
  ));
});

gulp.task("default", () => {
  runSequence("build", "watch", "deploy");
});

gulp.task("heroku", () => {
  runSequence("build", "deploy");
});
