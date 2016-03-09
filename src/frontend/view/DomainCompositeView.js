/*globals Backbone:false*/

import unwrapView from "./unwrapView";
import SkillItemView from "./SkillItemView";
import domainTemplate from "../template/domainTemplate.handlebars";

let DomainCompositeView = Backbone.Marionette.CompositeView.extend({
  template: domainTemplate,
  childView: SkillItemView,
  childViewContainer: ".column",
  onRender: unwrapView,
  initialize: function() {
    this.collection = this.model.get("skills");
  }
});

export default DomainCompositeView;
