var gulp = require("gulp");
var del = require("del");
var generateHTML = require("./generateHTML");
var fs = require("fs");
var gulpLoadPlugins = require("gulp-load-plugins");
var plugins = gulpLoadPlugins();

gulp.task("clean", function() {
  return del(["build"]);
});

gulp.task("writeHTML", ["clean"], function() {
  fs.mkdirSync("build");
  fs.writeFileSync("build/index.html", generateHTML());
  plugins.livereload.reload();
});

gulp.task("watch", function() {
  plugins.livereload.listen();
  gulp.watch(["*.js", "*.mustache"], ["writeHTML"]);
});

return gulp.task("default", ["writeHTML", "watch"]);
