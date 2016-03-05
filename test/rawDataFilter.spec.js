import {expect} from "chai";
import * as filter from "../src/rawDataFilter";

describe("rawDataFilter", () => {
  describe("filterGrade", () => {
    it("filters grade items", () => {
      let data = createStandardItems([
        {GradeLevels: [{GradeLevel: ["K"]}]},
        {GradeLevels: [{GradeLevel: ["K"]}, {GradeLevel: ["1"]}]},
        {GradeLevels: [{GradeLevel: ["2"]}]}
      ]);

      let collection = filter.filterGrade(data, "k");

      expect(collection).to.deep.equal([
        {GradeLevels: [{GradeLevel: ["K"]}]},
        {GradeLevels: [{GradeLevel: ["K"]}, {GradeLevel: ["1"]}]}
      ]);
    });
  });

  describe("filterSkill", () => {
    it("filters skill", () => {
      let grade = [
        {StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.BB.A.1"]}]},
        {StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.CC.A.1"]}]}
      ];

      let collection = filter.filterSkill(grade, "cc", "a", "1");

      expect(collection).to.deep.equal(
        {StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.CC.A.1"]}]}
      );
    });

    it("ignores subskills (level 8)", () => {
      let grade = [
        {StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.CC.A.1b"]}]}
      ];

      let collection = filter.filterSkill(grade, "cc", "a", "1");

      expect(collection).to.deep.equal(null);
    });
  });
});

function createStandardItems(items) {
  return {LearningStandards: {LearningStandardItem: items}};
}
