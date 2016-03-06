import _ from "lodash";

export function buildDomains(rawData, supportedGrades) {
  let domains = buildSkills(rawData.LearningStandards.LearningStandardItem);
  return _(domains)
    .filter(skill => supportedGrades.indexOf(skill.grade) > -1)
    .filter(skill => skill.domain !== "math") // math practice
    .groupBy("domain")
    .values()
    .orderBy(["domain", "grade", "cluster", "name"])
    .value();
}

export function buildSkills(rawGrade) {
  return rawGrade.map(rawSkill => {
    let statementCodeParts = rawSkill.StatementCodes[0].StatementCode[0].split(".");
    return {
      text: rawSkill.Statements[0].Statement[0],
      grade: getGradeNumber(rawSkill),
      domain: statementCodeParts[statementCodeParts.length - 3].toLowerCase(),
      cluster: statementCodeParts[statementCodeParts.length - 2].toLowerCase(),
      name: getSkillNumber(statementCodeParts)
    };
  });
}

function getSkillNumber(statementCodeParts) {
  let name = statementCodeParts[statementCodeParts.length - 1];
  return /^\d+$/.test(name) ? parseInt(name) : name;
}

function getGradeNumber(rawSkill) {
  let grade = rawSkill.GradeLevels[0].GradeLevel[0].toLowerCase();
  return grade === "k" ? 0 : parseInt(grade);
}
