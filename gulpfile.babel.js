import gulp from "gulp";
import del from "del";
import generateHTML from "./src/generateHTML";
import fs from "fs";
import gulpLoadPlugins from "gulp-load-plugins";
let plugins = gulpLoadPlugins();

gulp.task("clean", () => {
  return del(["build"]);
});

gulp.task("writeHTML", ["clean"], () => {
  fs.mkdirSync("build");
  fs.writeFileSync("build/index.html", generateHTML());
  plugins.livereload.reload();
});

gulp.task("watch", () => {
  plugins.livereload.listen();
  gulp.watch(["src/**/*.js", "src/**/*.mustache", "resource/**/*.json"], ["writeHTML"]);
});

gulp.task("default", ["writeHTML", "watch"]);
