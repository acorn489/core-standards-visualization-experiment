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

    $(".standardsTable").on('click', '.cell', function() {
      var grade = $(this).attr('class').split(' ');
      var collector = '#collector_' + grade[1];
      $(this).slideUp();

      var image = $(this).children('img');

      var startTop = image.position().top;
      var startLeft = image.position().left;

      image.css('position', 'absolute');

      image.css('top', startTop);
      image.css('left', startLeft);

      image.animate({
          top: $(collector).position().top,
          left: $(collector).position().left,
        },
        {
          complete: function() { 
          //   $('#collectedStars').animate({
          //     width: '120px',
          //     height: '120px'
          //   }, 100,
          // {
          //   complete: function () {
          //     $('#collectedStars').animate({
          //       width: '100px',
          //       height: '100px'
          //     }, 100);
          //   }
          // });
          }
        });
    });
});

function renderViews(data) {
  let Skill = Backbone.Model.extend({
    defaults: {completed: false},
    markAsCompleted: function() {
      this.set("completed", true);
    }
  });

  let SkillCollection = Backbone.Collection.extend({model: Skill});

  let SkillView = Backbone.Marionette.ItemView.extend({
    template: skillTemplate,
    onRender: unwrapView,
    events: {
      click: "setCompleted"
    },
    modelEvents: {
      "change:completed": "animateCollapse"
    },
    animateCollapse: function() {
      let self = this;
      this.$el.slideUp(() => self.render());
    },
    setCompleted: function() {
      this.model.set("completed", true);
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
