import {expect} from "chai";
import {buildSkills} from "../src/dataBuilder";

describe("dataBuilder", () => {
  describe("buildSkills", () => {
    it("maps raw skills", () => {
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
        },
        {
          GradeLevels: [{GradeLevel: ["1"]}],
          StatementCodes: [{StatementCode: ["CCSS.Math.Content.1.DD.A.1"]}],
          Statements: [{Statement: ["foo5"]}]
        }
      ];

      let domains = buildSkills(grade);

      expect(domains).to.deep.equal([
        {name: 1, text: "foo1", cluster: "a", domain: "bb", grade: 0},
        {name: 2, text: "foo2", cluster: "a", domain: "bb", grade: 0},
        {name: 1, text: "foo3", cluster: "b", domain: "bb", grade: 0},
        {name: 1, text: "foo4", cluster: "b", domain: "cc", grade: 0},
        {name: 1, text: "foo5", cluster: "a", domain: "dd", grade: 1}
      ]);
    });
  });
});
