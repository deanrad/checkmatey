/* global: window.ChessBoard */
import { Meteor } from 'meteor/meteor'
import React from 'react'

const chessboardId = 'chessboard-js'

let rebindChessBoard = (move) => {
  let { position } = move

  new window.ChessBoard(chessboardId, {
    draggable: true,
    position: position,
    onDrop: (from, to) => {
      console.log('TODO make move, actually')
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
    rebindChessBoard(this.props.move)
  }

  componentDidUpdate() {
    console.log('R> ComponentDidUpdate')
    rebindChessBoard(this.props.move)
  }
}
