import Handlebars from "handlebars";
import {loadFile} from "./helpers";
Handlebars.registerHelper("inc", value => parseInt(value) + 1);
Handlebars.registerHelper("toUpperCase", value => value.toUpperCase());

export default function(jsonData) {
  let template = Handlebars.compile(loadFile("./template.handlebars"));
  return template(jsonData);
}
