import {expect} from "chai";
import {getDomainsFromData, getClustersFromData} from "../src/dataService";

describe("dataService", () => {
  describe("getDomainsFromData", () => {
    it("returns domains array", () => {
      let data = {
        grades: [{
          domains: [{name: "bb"}, {name: "cc"}]
        }, {
          domains: [{name: "bb"}, {name: "dd"}]
        }]
      };

      let domains = getDomainsFromData(data);

      expect(domains).to.deep.equal(["bb", "cc", "dd"]);
    });
  });
});
