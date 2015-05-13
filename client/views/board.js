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
