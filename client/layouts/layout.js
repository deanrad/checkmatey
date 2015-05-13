Template.newGame.events({
  'click #reset': function () {
    Meteor.call("reset");
  }
});
