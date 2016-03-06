/*globals $:true*/
window.$ = window.jQuery = require("jquery");
window.Tether = require("tether");

var handlebars = require("handlebars/runtime").default;
handlebars.registerHelper("inc", value => parseInt(value) + 1);
handlebars.registerHelper("toUpperCase", value => value.toUpperCase());
require("bootstrap");
let template = require("./template/domainTemplate.handlebars");

import "whatwg-fetch";

$(() => {
  fetch("./data.json")
    .then(data => data.json())
    .then(data => {
      let html = template(data);
      $(".standardsTable").html(html);
      $("[data-toggle='tooltip']").tooltip({html: true, delay: 500});
      $("[data-toggle='tooltip']").tooltip("disable");
      registerRadioClickHandler();
    })
    .catch(e => console.log(e, e.stack));
});

function registerRadioClickHandler() {
  $(".kidDeveloperButtons label").click(function() {
    let _this = this;
    setTimeout(function() {
      let value = $(_this).parent().find("input").filter(":checked").attr("value");
      if (value === "developer") {
        $("[data-toggle='tooltip']").tooltip("enable");
        $(".headerCell").show();
        $(".cell").html(function() {return $(this).attr("data");});
      } else {
        $("[data-toggle='tooltip']").tooltip("disable");
        $(".headerCell").hide();
        $(".cell").html("o");
      }
    });
  });
}
