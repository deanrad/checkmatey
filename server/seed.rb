if (Boards.find().count() === 0) {
  Boards.insert(Board.initialBoard);
}
