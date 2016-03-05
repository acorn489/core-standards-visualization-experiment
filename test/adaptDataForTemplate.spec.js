import adapt from "../src/adaptDataForTemplate";
import {expect} from "chai";

describe("adaptDataForTemplate", () => {
  it("adapts data for Handlebars table generation", () => {
    let data = {
      grades: [{
        name: "0",
        domains: [{
          name: "bb",
          clusters: [
            {name: "a", skills: [{name: "1", text: "foo1"}, {name: "2", text: "foo2"}]},
            {name: "b", skills: [{name: "1", text: "foo3"}]}
          ]}, {
          name: "cc",
          clusters: [{name: "b", "skills": [{name: "1", text: "foo4"}]}]
        }]
      }, {
        name: "1",
        domains: [{name: "cc", clusters: [{name: "a", skills: [{name: "1", text: "foo5"}]}]}]
      }]
    };

    let adapted = adapt(data);

    expect(adapted).to.deep.equal({
      domains: ["bb", "cc"],
      rows: [
        [
          {name: "1", text: "foo1", cluster: "a", domain: "bb", grade: "0"},
          {name: "1", text: "foo4", cluster: "b", domain: "cc", grade: "0"}
        ],
        [
          {name: "2", text: "foo2", cluster: "a", domain: "bb", grade: "0"},
          {name: "1", text: "foo5", cluster: "a", domain: "cc", grade: "1"}
        ],
        [
          {name: "1", text: "foo3", cluster: "b", domain: "bb", grade: "0"},
          {domain: "cc"}
        ]
      ]
    });
  });
});
