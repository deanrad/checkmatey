Template.newGame.events({
  'click #reset': function () {
    MovesCollection.find().fetch().forEach(function (move) {
      // not first move
      if(move.from) {
        console.warn("deleting move", move.from, move.to);
        MovesCollection.remove(move._id);
      }
    });
  }
});
