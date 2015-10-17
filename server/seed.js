Meteor.startup(function () {
  if (MovesCollection.find().count() === 0) {
    MovesCollection.insert({
      from: null,
      to: null,
      board: Board.initialBoard
    });
  }
})
