import "babel-polyfill";
import gulp from "gulp";
import del from "del";
import generateHTML from "./src/generateHTML";
import extractXMLData from "./src/extractXMLData";
import fs from "fs";
import mocha from "gulp-mocha";
import babel from "babel-core/register";
import livereload from "gulp-server-livereload";
import {loadFile} from "./src/helpers";

gulp.task("clean", () => {
  return del(["build"]);
});

gulp.task("test", () => {
  return gulp.src(["test/**/*.js"])
    .pipe(mocha({compilers: {js: babel}}));
});

gulp.task("build", ["clean"], () => {
  extractXMLData(loadFile("../resource/math.xml"))
    .then(data => {
      fs.mkdirSync("build");
      fs.writeFileSync("build/data.json", JSON.stringify(data));
      fs.writeFileSync("build/index.html", generateHTML(data));
    })
    .catch(e => console.log(e, e.stack));
});

gulp.task("watch", () => {
  gulp.watch(
    ["src/**/*.js", "src/**/*.mustache", "resource/**/*.json", "test/**/*.js"],
    ["build"]
  );
});

gulp.task("default", ["test", "build", "watch"], function() {
  gulp.src("./build")
    .pipe(livereload({livereload: true, open: true}));
});
