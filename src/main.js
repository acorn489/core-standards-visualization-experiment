/*globals $:true*/
window.$ = window.jQuery = require("jquery");
window.Tether = require("tether");
require("bootstrap");

$(function() {
  $("[data-toggle='tooltip']").tooltip({html: true, delay: 500});
  $("[data-toggle='tooltip']").tooltip("disable");
  $(".kidDeveloperButtons label").click(function() {
    var _this = this;
    setTimeout(function() {
      var value = $(_this).parent().find("input").filter(":checked").attr("value");
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
});
