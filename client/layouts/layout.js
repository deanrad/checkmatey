Template.newGame.events({
  'click #reset': function () {
    MovesCollection.find().fetch().forEach(function (move) {
      // not first move
      if(!move.from && !move.to) {
        console.warn("deleting move");
        MovesCollection.remove(move._id);
      }
    });
  }
});
