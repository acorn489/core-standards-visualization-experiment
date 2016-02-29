import {expect} from "chai";
import extractHierarchy from "../src/extractHierarchy";

describe("extractHierarchy", () => {
  it("extracts hierarchy from grade", () => {
    let grade = [
      {StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.BB.A.1"]}]},
      {StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.CC.D.1"]}]},
      {StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.BB.A.2"]}]},
      {StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.CC.B.1"]}]},
      {StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.CC.B.2"]}]},
      {StatementCodes: [{StatementCode: ["CCSS.Math.Content.K.CC.B.2b"]}]}
    ];

    let collection = extractHierarchy(grade);

    expect(collection).to.deep.equal({
      bb: {a: ["1", "2"]},
      cc: {b: ["1", "2"], d: ["1"]}
    });
  });
});
