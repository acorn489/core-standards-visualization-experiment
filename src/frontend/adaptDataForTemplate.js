import flattenData from "./flattenData";
import _ from "lodash";

export default function(data) {
  return {cols: createAggregatedCols(data)};
}

function createAggregatedCols(data) {
  return _(flattenData(data).skills)
    .groupBy("domain")
    .values()
    .value();
}
