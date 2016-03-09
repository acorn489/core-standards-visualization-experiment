/*globals Backbone:false*/

let GradeCollection = Backbone.Collection.extend({
  initialize: function(options) {
    this.domainsModel = options.domainsModel;
    this.domainsModel.on("sync", updateGrades(this));
    this.domainsModel.on("change", updateGrades(this));
  }
});

function updateGrades(collection) {
  return () => {
    let grades = [];
    let domains = collection.domainsModel.get("domains");
    domains && domains.forEach(function(domain) {
      domain.skills.forEach(function(skill) {
        grades[skill.get("grade")] = grades[skill.get("grade")] || {name: skill.get("grade")};
        grades[skill.get("grade")].overall =
          typeof grades[skill.get("grade")].overall !== "undefined" ? grades[skill.get("grade")].overall : 0;
        grades[skill.get("grade")].overall++;
        grades[skill.get("grade")].completed =
          typeof grades[skill.get("grade")].completed !== "undefined" ? grades[skill.get("grade")].completed : 0;
        if (skill.get("collected")) {
          grades[skill.get("grade")].completed++;
        }
      });
    });
    collection.reset(grades);
  };
}

export default GradeCollection;
