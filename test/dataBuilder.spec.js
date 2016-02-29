import {expect} from "chai";
import {buildGrade} from "../src/dataBuilder";

describe("dataBuilder", () => {
  describe("buildGrade", () => {
    it("builds grade", () => {
      let grade = [
        {
          GradeLevels: [{GradeLevel: ["K"]}],
          StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.BB.A.1"]}],
          Statements: [{Statement: ["foo1"]}]
        },
        {
          GradeLevels: [{GradeLevel: ["K"]}],
          StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.BB.A.2"]}],
          Statements: [{Statement: ["foo2"]}]
        },
        {
          GradeLevels: [{GradeLevel: ["K"]}],
          StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.BB.B.1"]}],
          Statements: [{Statement: ["foo3"]}]
        },
        {
          GradeLevels: [{GradeLevel: ["K"]}],
          StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.CC.B.1"]}],
          Statements: [{Statement: ["foo4"]}]
        }
      ];

      let builtGrade = buildGrade(grade);

      expect(builtGrade).to.deep.equal({
        name: "k",
        domains: [{
          name: "bb",
          clusters: [
            {name: "a", "skills": [{name: "1", text: "foo1"}, {name: "2", text: "foo2"}]},
            {name: "b", "skills": [{name: "1", text: "foo3"}]}
          ]
        }, {
          name: "cc",
          clusters: [
            {name: "b", "skills": [{name: "1", text: "foo4"}]}
          ]
        }]
      });
    });
  });
});
