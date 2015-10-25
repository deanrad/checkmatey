
Template.board.helpers({
  moves: function () {
    return MovesCollection.find({from: {$ne: null}});
  }
});
