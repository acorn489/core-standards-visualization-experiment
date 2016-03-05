import _ from "lodash";

export default function(grade) {
  let hierarchy = {};
  grade.forEach(node => updateHierarchy(hierarchy, node.StatementCodes[0].StatementCode[0]));
  return hierarchy;
}

function updateHierarchy(hierarchy, statementCode) {
  let elements = statementCode.split(".");
  let level3Name = getLevel3Name(elements);
  let level2Name = elements[elements.length - 2].toLowerCase();
  let level1Name = elements[elements.length - 3].toLowerCase();
  if (level1Name !== "math") {
    hierarchy[level1Name] = getUpdatedLevel2(hierarchy[level1Name], level2Name, level3Name);
  }
}

function getUpdatedLevel2(oldLevel1, level2Name, level3Name) {
  return _.assignWith({}, oldLevel1, {[level2Name]: [level3Name]}, customizer(level3Name));
}

function customizer(level3Name) {
  return (objVal, srcVal, key, object, src) => {
    if (_.isUndefined(objVal)) {
      return src[key];
    }
    if (!Number.isInteger(level3Name)) {
      return object[key];
    }
    return [...objVal, ...srcVal];
  };
}

function getLevel3Name(elements) {
  let name = elements[elements.length - 1];
  return /^\d+$/.test(name) ? parseInt(name) : name;
}
