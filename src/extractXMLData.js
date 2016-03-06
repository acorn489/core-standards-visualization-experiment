import {Parser} from "xml2js";
import {range} from "./helpers";
import {buildDomains} from "./dataBuilder";

const SUPPORTED_GRADES = [...range(5)];

export default function(xmlString) {
  let parser = new Parser();
  return new Promise((resolve, reject) => {
    parser.parseString(xmlString, (err, result) => {
      if (err) reject(err);
      resolve({domains: buildDomains(result, SUPPORTED_GRADES)});
    });
  });
}
