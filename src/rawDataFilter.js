import _ from "lodash";

export function filterGrade(data, gradeName) {
  return data.LearningStandards.LearningStandardItem
    .filter(i => _.some(i.GradeLevels, {GradeLevel: [gradeName.toUpperCase && gradeName.toUpperCase()]}));
}

export function filterSkill(grade, level1Code, level2Code, level3Code) {
  let regex = new RegExp(`.${level1Code.toUpperCase()}.${level2Code.toUpperCase()}.${level3Code}\$`);
  return grade.filter(i => i.StatementCodes[0].StatementCode[0].match(regex))[0] || null;
}
