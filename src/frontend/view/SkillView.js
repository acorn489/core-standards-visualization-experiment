/*globals Backbone:false, $:false*/

import skillTemplate from "../template/skillTemplate.handlebars";
import unwrapView from "./unwrapView";

let SkillView = Backbone.Marionette.ItemView.extend({
  template: skillTemplate,
  onRender: unwrapView,
  events: {click: "collect"},
  modelEvents: {"change:collected": "animateSkillCollection"},
  animateSkillCollection,
  collect: function() {
    this.model.set("collected", true);
  }
});

function animateSkillCollection() {
  let self = this;
  var image = this.$el.children("img");
  this.$el.slideUp(() => self.render());
  image.css({position: "absolute", top: image.position().top, left: image.position().left});
  image.animate({
    top: $(getCollectorId(this.model)).position().top,
    left: $(getCollectorId(this.model)).position().left
  });
}

function getCollectorId(model) {
  return "#collector_grade-" + model.get("grade");
}

export default SkillView;
