/* global: window.ChessBoard */
import { Meteor } from 'meteor/meteor'
import React from 'react'
import { dispatch, Actions } from '/lib/dispatch'

const chessboardId = 'chessboard-js'

let rebindChessBoard = (game, dispatch) => {
  let { position } = game

  new window.ChessBoard(chessboardId, {
    draggable: true,
    position: position,
    onDrop: (from, to) => {
      if (from === to) { return }
      dispatch(Actions.Game.makeMove({ from, to }))
    }
  })
}

export default class ChessBoard extends React.Component {
  render() {
    return (
      <div>
      <h1>How about a nice game of Chess?</h1>
      <div id={ chessboardId } style={ {width: 600} }></div>
      </div>
    )
  }

  // Lifecycle hooks to initialize the 3rd party chess lib the first, and later times
  componentDidMount() {
    rebindChessBoard(this.props.game, this.props.dispatch)
  }

  componentDidUpdate() {
    rebindChessBoard(this.props.game, this.props.dispatch)
  }
}
