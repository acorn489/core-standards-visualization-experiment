import Mustache from "mustache";
import fs from "fs";

export default function() {
  let template = loadFile("./template.mustache");
  let data = loadFile("../resource/data.json");
  return Mustache.render(template, JSON.parse(data));
}

function loadFile(fileName) {
  return fs.readFileSync(require.resolve(fileName)).toString();
}
