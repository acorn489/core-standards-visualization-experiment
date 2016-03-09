/*globals Backbone:false*/

let DomainCollection = Backbone.Collection.extend({
  url: "./data.json",
  parse: (data) => data.domains.map(domain => ({domainName: domain[0].domain, skills: domain}))
});

export default DomainCollection;
