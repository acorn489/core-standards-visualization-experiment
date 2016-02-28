var Mustache = require("mustache");

module.exports = function(data) {
  delete require.cache[require.resolve("./data.js")];
  delete require.cache[require.resolve("require-text")];
  var data = require("./data.js");
  var requireText = require("require-text");
  var template = requireText("./template.mustache", require);
  return Mustache.render(template, data);
};
