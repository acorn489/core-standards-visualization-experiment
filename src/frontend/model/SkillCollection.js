/*globals Backbone:false*/
import SkillModel from "./SkillModel";

let SkillCollection = Backbone.Collection.extend({model: SkillModel});
export default SkillCollection;
