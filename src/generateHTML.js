import Mustache from "mustache";
import {loadFile} from "./helpers";

export default function(jsonData) {
  let template = loadFile("./template.mustache");
  return Mustache.render(template, jsonData);
}
