if (Meteor.isServer) {
  Meteor.publish("boards", function () {
    return Boards.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("boards");
}
