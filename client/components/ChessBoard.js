/* global: window.ChessBoard */
import { Meteor } from 'meteor/meteor'
import React from 'react'
import { makeMove, makeNewPositionWithMovePlayed } from '/lib/methods'

const chessboardId = 'chessboard-js'

let rebindChessBoard = (game) => {
  let { position } = game

  new window.ChessBoard(chessboardId, {
    draggable: true,
    position: position,
    onDrop: (from, to) => {
      let newPos = makeNewPositionWithMovePlayed(position, { from, to })
      makeMove.call({
        from,
        to,
        position: newPos
      })
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

  // Lifecycle hooks to reinitialize the 3rd party chess lib
  componentDidMount() {
    console.log('R> ComponentDidMount')
    rebindChessBoard(this.props.game)
  }

  componentDidUpdate() {
    console.log('R> ComponentDidUpdate')
    rebindChessBoard(this.props.game)
  }
}
