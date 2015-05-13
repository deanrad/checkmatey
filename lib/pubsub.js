if (Meteor.isServer) {
  Meteor.publish("moves", function () {
    return MovesCollection.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("moves");
}
