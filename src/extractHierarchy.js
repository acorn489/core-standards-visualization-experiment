import _ from "lodash";
import {endsWithLetter} from "./helpers";

export default function(grade) {
  var hierarchy = {};
  grade.forEach(node => updateHierarchy(hierarchy, node.StatementCodes[0].StatementCode[0]));
  return hierarchy;
}

function updateHierarchy(hierarchy, statementCode) {
  var elements = statementCode.split(".");
  var level3Name = elements[elements.length - 1].toLowerCase();
  var level2Name = elements[elements.length - 2].toLowerCase();
  var level1Name = elements[elements.length - 3].toLowerCase();
  hierarchy[level1Name] = getUpdatedLevel2(hierarchy[level1Name], level2Name, level3Name);
}

function getUpdatedLevel2(oldLevel1, level2Name, level3Name) {
  return _.assignWith({}, oldLevel1, {[level2Name]: [level3Name]}, customizer(level3Name));
}

function customizer(level3Name) {
  return (objVal, srcVal, key, object, src) => {
    if (_.isUndefined(objVal)) {
      return src[key];
    }
    if (endsWithLetter(level3Name)) {
      return object[key];
    }
    return [...objVal, ...srcVal];
  };
}
