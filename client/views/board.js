MovesCollection.find().observeChanges({
  added: function (id, move) {
    //for debugging
    //console.info("new board")
    //window.currentBoard = move.board;
    Board.render(move.board);
  }
});
