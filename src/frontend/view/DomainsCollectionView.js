/*globals Backbone:false*/
import domainsTemplate from "../template/domainsTemplate.handlebars";
import DomainCompositeView from "./DomainCompositeView";

let DomainsCollectionView = Backbone.Marionette.CollectionView.extend({
  el: ".standardsTable",
  template: domainsTemplate,
  childView: DomainCompositeView,
  collection: new Backbone.Collection(),
  modelEvents: {sync: "updateCollection"},
  updateCollection: function() {
    this.collection.reset(this.model.get("domains"));
    this.render();
  }
});

export default DomainsCollectionView;
