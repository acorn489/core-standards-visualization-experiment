import fs from "fs";
import "babel-polyfill";

export let endsWithLetter = (string = "") => string.match(/[A-Za-z]$/);

export function* gradeRange(n) {
  for (let i = 1; i <= n; i++) {
    yield `0${i.toString()}`.slice(-2);
  }
}

export function loadFile(fileName) {
  return fs.readFileSync(require.resolve(fileName)).toString();
}
