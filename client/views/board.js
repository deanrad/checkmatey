// Reactive dependency upon MovesCollection.find()
// - any time the set of moves changes, render the
//   board of the last one
Tracker.autorun(function () {
  var moves = MovesCollection.find().fetch();
  Board.render(_.last(moves).board);
});

Template.board.helpers({
  moves: function () {
    return MovesCollection.find({from: {$ne: null}});
  }
});

var myShakeEvent = new Shake({
    threshold: 5, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
});
myShakeEvent.start();
window.addEventListener('shake', function () {
  if(currentBoard) currentBoard.flip();
});
