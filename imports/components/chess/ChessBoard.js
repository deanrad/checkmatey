/* global: window.ChessBoard */
import { Meteor } from 'meteor/meteor'
import React from 'react'

const chessboardId = 'chessboard-js'

let makeMove = (move, { from, to }) => {
  let mover, newPieces
  newPieces = Object.assign({}, move.position)
  mover = newPieces[from]
  delete newPieces[from]
  newPieces[to] = mover
  return {
    from,
    to,
    position: newPieces
  }
}

// TODO destructure
let rebindBoard = (move) => {
  let { position } = move

  new window.ChessBoard(chessboardId, {
    draggable: true,
    position: position,
    onDrop: (from, to) => {
      Meteor.call('makeMove', makeMove(move, { from, to }))
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

  componentDidMount() {
    console.log('R> ComponentDidMount')
    rebindBoard(this.props.move)
  }

  // The most common uses of componentDidUpdate() is managing 3rd party UI elements
  componentDidUpdate() {
    console.log('R> ComponentDidUpdate')
    rebindBoard(this.props.move)
  }
}
