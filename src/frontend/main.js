/*globals $:true*/
let handlebars = require("handlebars/runtime").default;
handlebars.registerHelper("inc", value => parseInt(value) + 1);
handlebars.registerHelper("toUpperCase", value => value.toUpperCase());
import DomainsCollectionView from "./view/DomainsCollectionView";

$(() => {
  new DomainsCollectionView()
    .on("render", () => {
      $("[data-toggle='tooltip']").tooltip({html: true, delay: 500});
      $("[data-toggle='tooltip']").tooltip("disable");
    });
  registerRadioClickHandler();
});

function registerRadioClickHandler() {
  $(".kidDeveloperButtons label").click(function() {
    let _this = this;
    setTimeout(function() {
      let value = $(_this).parent().find("input").filter(":checked").attr("value");
      if (value === "developer") {
        $("[data-toggle='tooltip']").tooltip("enable");
        $(".headerCell").show();
        $(".cell").html(function() {return $(this).attr("devData");});
      } else {
        $("[data-toggle='tooltip']").tooltip("disable");
        $(".headerCell").hide();
        $(".cell").html(function() {return $(this).attr("studentData");});
      }
    });
  });
}
