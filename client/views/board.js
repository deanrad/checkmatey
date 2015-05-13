MovesCollection.find().observeChanges({
  added: function (id, move) {
    //for debugging
    //console.info("new board")
    //window.currentBoard = move.board;
    Board.render(move.board);
  },
  removed: function () {
    Board.render(Board.initialBoard);
  }
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
