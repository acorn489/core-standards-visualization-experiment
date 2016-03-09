/*globals Backbone:false*/

import unwrapView from "./unwrapView";
import SkillView from "./SkillView";
import DomainModel from "../model/DomainModel";
import SkillCollection from "../model/SkillCollection";
import domainTemplate from "../template/domainTemplate.handlebars";

let DomainCompositeView = Backbone.Marionette.CompositeView.extend({
  template: domainTemplate,
  childView: SkillView,
  childViewContainer: ".column",
  onRender: unwrapView,
  initialize: function() {
    let collection = new SkillCollection(this.model.get("skills"));
    let model = new DomainModel({domainName: this.model.get("domainName")});
    Object.assign(this, {model, collection});
  }
});

export default DomainCompositeView;
