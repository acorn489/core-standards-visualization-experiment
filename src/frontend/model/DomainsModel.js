/*globals Backbone:false*/
import SkillCollection from "./SkillCollection";
let DomainsModel = Backbone.Model.extend({
  url: "./data.json",
  parse: function(data) {
    return {domains: createDomains(this, data)};
  }
});

function createDomains(model, data) {
  return data.domains.map(domain => {
    let skills = new SkillCollection(domain);
    skills.on("change", () => model.trigger("change"));
    return {domainName: domain[0].domain, skills};
  });
}

export default DomainsModel;
