
Boards.find().observeChanges({
  added: function (id, board) {
    window.currentBoard = board;
    Board.render(board);
  }
});
