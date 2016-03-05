import _ from "lodash";

export default function(data) {
  let skills = [];
  data.grades.forEach((grade) => {
    grade.domains.forEach((domain) => {
      domain.clusters.forEach((cluster) => {
        cluster.skills.forEach((skill) => {
          skills.push({
            name: skill.name, text: skill.text, cluster: cluster.name, domain: domain.name, grade: grade.name
          });
        });
      });
    });
  });
  skills = _.orderBy(skills, ["domain", "grade", "cluster", "name"]);
  return {skills};
}
