import entries from "object.entries";
import extractHierarchy from "./extractHierarchy";
import {filterSkill, filterGrade} from "./rawDataFilter";

entries.shim();

export function buildGrade(rawGrade) {
  let grade = {};
  let hierarchy = extractHierarchy(rawGrade);
  grade.name = rawGrade[0] && rawGrade[0].GradeLevels[0].GradeLevel[0].toLowerCase();
  grade.domains = [];
  for (let [level1Name, hierarchyLevel2] of Object.entries(hierarchy)) {
    let clusters = createClusters(level1Name, hierarchyLevel2);
    grade.domains.push({name: level1Name, clusters});
  }
  return grade;

  function createClusters(level1Name, hierarchyLevel2) {
    let clusters = [];
    for (let [level2Name, hierarchyLevel3] of Object.entries(hierarchyLevel2)) {
      clusters.push({name: level2Name, skills: createSkills(level1Name, level2Name, hierarchyLevel3)});
    }
    return clusters;
  }

  function createSkills(level1Name, level2Name, hierarchyLevel3) {
    let skills = [];
    hierarchyLevel3.forEach(i => {
      let skill = filterSkill(rawGrade, level1Name, level2Name, i);
      skills.push({name: i, text: getSkillName(skill)});
    });
    return skills;
  }
}

export function buildGrades(rawData, supportedGrades) {
  var grades = [];
  supportedGrades.forEach(function(gradeName) {
    let rawGrade = filterGrade(rawData, gradeName);
    let grade = buildGrade(rawGrade);
    grades.push(grade);
  });
  return grades;
}

function getSkillName(skill) {
  if (!skill) return "";
  return skill.Statements[0].Statement[0];
}
