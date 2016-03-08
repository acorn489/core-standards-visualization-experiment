/*globals $:true, Backbone:true, _:true*/
let handlebars = require("handlebars/runtime").default;
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
  let Skill = Backbone.Model.extend({defaults: {collected: false}});

  let SkillCollection = Backbone.Collection.extend({model: Skill});

  let SkillView = Backbone.Marionette.ItemView.extend({
    template: skillTemplate,
    onRender: unwrapView,
    events: {click: "collect"},
    modelEvents: {"change:collected": "animateSkillCollection"},
    animateSkillCollection,
    collect: function() {
      this.model.set("collected", true);
    }
  });

  let DomainCompositeView = Backbone.Marionette.CompositeView.extend({
    template: domainTemplate,
    childView: SkillView,
    childViewContainer: ".column",
    onRender: unwrapView
  });

  _.each(data.domains, function(domain) {
    let compView = new DomainCompositeView({
      model: new Backbone.Model({domainName: domain[0].domain}),
      collection: new SkillCollection(domain)
    });
    $(".standardsTable").append(compView.render().el);
  });
}

function animateSkillCollection() {
  let self = this;
  var image = this.$el.children("img");
  this.$el.slideUp(() => self.render());
  image.css({position: "absolute", top: image.position().top, left: image.position().left});
  image.animate({
    top: $(getCollectorId(this.model)).position().top,
    left: $(getCollectorId(this.model)).position().left
  });
}

function getCollectorId(model) {
  return "#collector_grade-" + model.get("grade");
}

function unwrapView() {
  this.$el = this.$el.children();
  this.$el.unwrap();
  this.setElement(this.$el);
}

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
