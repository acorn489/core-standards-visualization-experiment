import fs from "fs";
import "babel-polyfill";

export function* range(n) {
  for (let i = 0; i <= n; i++) {
    yield i;
  }
}

export function loadFile(fileName) {
  return fs.readFileSync(require.resolve(fileName)).toString();
}
