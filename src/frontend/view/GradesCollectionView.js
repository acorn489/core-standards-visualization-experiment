/*globals Backbone:false*/
import gradesTemplate from "../template/gradesTemplate.handlebars";
import GradeItemView from "./GradeItemView";

let gradesVent = Backbone.Wreqr.radio.channel("grades").vent;

let GradesCollectionView = Backbone.Marionette.CollectionView.extend({
  el: ".grades",
  template: gradesTemplate,
  childView: GradeItemView,
  collectionEvents: {reset: "render"},
  render: function() {
    if (!this.collectionAnimationRunning) {
      Backbone.Marionette.CollectionView.prototype.render.call(this);
    } else {
      gradesVent.once("collectionAnimationEnd", function() {
        Backbone.Marionette.CollectionView.prototype.render.call(this);
      }, this);
    }
    gradesVent.trigger("collectionRender");
  },
  initialize: function() {
    this.collectionAnimationRunning = false;
    gradesVent.on("collectionAnimationStart", function() {
      this.collectionAnimationRunning = true;
    }, this);
    gradesVent.on("collectionAnimationEnd", function() {
      this.collectionAnimationRunning = false;
    }, this);
  }
});

export default GradesCollectionView;
