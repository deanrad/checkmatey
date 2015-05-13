// Reactive dependency upon MovesCollection.find()
// - any time the set of moves changes, render the
//   board of the last one
Tracker.autorun(function () {
  var moves = MovesCollection.find().fetch();
  if (moves.length > 0) {
    Board.render(_.last(moves).board);
  }
});

Template.board.helpers({
  moves: function () {
    return MovesCollection.find({from: {$ne: null}});
  }
});
