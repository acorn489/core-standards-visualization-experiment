import {getDomainsFromData} from "./dataService";
import flattenData from "./flattenData";
import _ from "lodash";

export default function(data) {
  let domains = getDomainsFromData(data);
  return {
    domains,
    rows: createAggregatedRows(data, domains)
  };
}

function createAggregatedRows(data, domains) {
  let groups = _(flattenData(data).skills)
    .groupBy("domain")
    .values()
    .value();
  return _.zipWith(...groups, (...args) => fillBlanks(args, domains));
}

function fillBlanks(args, domains) {
  args.forEach((arg, i) => {
    if (!arg) {
      args[i] = {domain: domains[i]};
    }
  });
  return args;
}
