/*globals $:true, Backbone:true, _:true*/
var handlebars = require("handlebars/runtime").default;
handlebars.registerHelper("inc", value => parseInt(value) + 1);
handlebars.registerHelper("toUpperCase", value => value.toUpperCase());
let domainTemplate = require("./template/domainTemplate.handlebars");
let skillTemplate = require("./template/skillTemplate.handlebars");

$(() => {
  fetch("./data.json")
    .then(data => data.json())
    .then(data => {
      renderViews(data);
      $("[data-toggle='tooltip']").tooltip({html: true, delay: 500});
      $("[data-toggle='tooltip']").tooltip("disable");
      registerRadioClickHandler();
    })
    .catch(e => console.log(e, e.stack));
});

function renderViews(data) {
  var SkillView = Backbone.Marionette.ItemView.extend({
    template: skillTemplate
  });

  var DomainCompositeView = Backbone.Marionette.CompositeView.extend({
    template: domainTemplate,
    childView: SkillView,
    childViewContainer: ".column",
    onRender: function() {
      this.$el = this.$el.children();
      this.$el.unwrap();
      this.setElement(this.$el);
    }
  });

  _.each(data.domains, function(domain) {
    let compView = new DomainCompositeView({
      model: new Backbone.Model({domainName: domain[0].domain}),
      collection: new Backbone.Collection(domain)
    });
    $(".standardsTable").append(compView.render().el);
  });
}

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
