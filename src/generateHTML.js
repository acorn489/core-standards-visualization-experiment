import Mustache from "mustache";
import fs from "fs";

export default function() {
  var template = loadFile("./template.mustache");
  var data = loadFile("../resource/data.json");
  return Mustache.render(template, JSON.parse(data));
}

function loadFile(fileName) {
  return fs.readFileSync(require.resolve(fileName)).toString();
}
