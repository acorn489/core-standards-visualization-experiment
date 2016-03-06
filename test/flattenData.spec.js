import {expect} from "chai";
import flattenData from "../src/frontend/flattenData";

describe("dataFlattener", () => {
  it("flattens data", () => {
    let data = {
      grades: [{
        name: "0",
        domains: [{
          name: "cc",
          clusters: [{name: "b", "skills": [{name: "1", text: "foo4"}]}]
        }, {
          name: "bb",
          clusters: [
            {name: "a", skills: [{name: "1", text: "foo1"}, {name: "2", text: "foo2"}]},
            {name: "b", skills: [{name: "1", text: "foo3"}]}
          ]
        }]
      }]
    };

    let flattenedData = flattenData(data);

    expect(flattenedData).to.deep.equal({
      skills: [
        {name: "1", text: "foo1", cluster: "a", domain: "bb", grade: "0"},
        {name: "2", text: "foo2", cluster: "a", domain: "bb", grade: "0"},
        {name: "1", text: "foo3", cluster: "b", domain: "bb", grade: "0"},
        {name: "1", text: "foo4", cluster: "b", domain: "cc", grade: "0"}
    ]});
  });
});
