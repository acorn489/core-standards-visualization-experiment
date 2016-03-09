/*globals Backbone:false*/
import domainsTemplate from "../template/domainsTemplate.handlebars";
import DomainCompositeView from "./DomainCompositeView";
import DomainCollection from "../model/DomainCollection";

let domainCollection = new DomainCollection();

let DomainsCollectionView = Backbone.Marionette.CollectionView.extend({
  el: ".standardsTable",
  template: domainsTemplate,
  childView: DomainCompositeView,
  collection: domainCollection,
  collectionEvents: {sync: "render"},
  initialize: () => domainCollection.fetch()
});

export default DomainsCollectionView;
