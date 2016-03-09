/*globals Backbone:false*/
import gradesTemplate from "../template/gradesTemplate.handlebars";
import GradeItemView from "./GradeItemView";

let GradesCollectionView = Backbone.Marionette.CollectionView.extend({
  el: ".grades",
  template: gradesTemplate,
  childView: GradeItemView,
  collectionEvents: {reset: "render"}
});

export default GradesCollectionView;
