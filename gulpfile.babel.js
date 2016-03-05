/*globals process:false*/

import "babel-polyfill";
import gulp from "gulp";
import del from "del";
import generateHTML from "./src/generateHTML";
import extractXMLData from "./src/extractXMLData";
import adaptDataForTemplate from "./src/adaptDataForTemplate";
import fs from "fs";
import mocha from "gulp-mocha";
import babel from "babel-core/register";
import livereload from "gulp-livereload";
import http from "http";
import ecstatic from "ecstatic";
import runSequence from "run-sequence";
import {loadFile} from "./src/helpers";
import gutil from "gulp-util";

let SERVER_ADDRESS = "0.0.0.0";

gulp.task("clean", () => {
  return del(["build"]);
});

gulp.task("test", () => {
  return gulp.src(["test/**/*.js"])
    .pipe(mocha({compilers: {js: babel}}));
});

gulp.task("build", ["clean"], (done) => {
  extractXMLData(loadFile("../resource/math.xml"))
    .then(data => {
      let viewData = adaptDataForTemplate(data);
      fs.mkdirSync("build");
      fs.writeFileSync("build/data.json", JSON.stringify(data));
      fs.writeFileSync("build/index.html", generateHTML(viewData));
      livereload.reload();
      done();
    })
    .catch(e => console.log(e, e.stack));
});

gulp.task("watch", () => {
  livereload.listen();
  gulp.watch(
    ["src/**/*.js", "src/**/*.handlebars", "resource/**/*.json", "test/**/*.js"],
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
