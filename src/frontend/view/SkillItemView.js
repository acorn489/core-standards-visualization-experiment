/*globals Backbone:false, $:false*/

import skillTemplate from "../template/skillTemplate.handlebars";
import unwrapView from "./unwrapView";

let SkillItemView = Backbone.Marionette.ItemView.extend({
  template: skillTemplate,
  onRender: unwrapView,
  events: {click: "updateModel"},
  modelEvents: {
    "change:collected": "animateSkillCollection",
    "change:completed": "animateSkillCompletion"
  },
  animateSkillCollection,
  animateSkillCompletion,
  updateModel: function () {
    if(!this.model.get('completed')){
      this.model.set("completed", true);
    }else {
      this.model.set("collected", true);
    }
  }
});

function animateSkillCompletion() {
  var image = this.$el.children("img");
  image.ClassyWiggle();
}

function animateSkillCollection() {
  let self = this;
  var image = this.$el.children("img");
  this.$el.slideUp(() => self.render());
  this.$el.tooltip("hide");
  if (image && image.position()) {
    image.css({position: "absolute", top: image.position().top, left: image.position().left});
    image.animate({
      top: $(getGradeId(this.model)).position().top,
      left: $(getGradeId(this.model)).position().left
    });
  }
}

function getGradeId(model) {
  return "#grade-" + model.get("grade");
}

export default SkillItemView;
