ChessLayout = React.createClass({
  componentDidMount(){
    // Reactive dependency upon MovesCollection.find()
    // - any time the set of moves changes, render the
    //   board of the last one
    Tracker.autorun(function () {
      var moves = MovesCollection.find().fetch();
      if (moves.length > 0) {
        Board.render(_.last(moves).board);
      }
    });

  },
  render(){
    return(
      <div>
        <h1>Yo React, baby!</h1>
        <div id="chessboard-js-board"/>
      </div>
    )
  }
})
