import {Parser} from "xml2js";
import {gradeRange} from "./helpers";
import {buildGrades} from "./dataBuilder";

const SUPPORTED_GRADES = ["k", ...gradeRange(5)];

export default function(xmlString) {
  let parser = new Parser();
  return new Promise((resolve, reject) => {
    parser.parseString(xmlString, (err, result) => {
      if (err) reject(err);
      resolve({grades: buildGrades(result, SUPPORTED_GRADES)});
    });
  });
}
