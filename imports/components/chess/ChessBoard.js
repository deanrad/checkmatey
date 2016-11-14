/* global: window.ChessBoard */
import React from 'react'

const chessboardId = 'chessboard-js'

// TODO destructure
let initChess = (board) => {
  let { position } = board

  new window.ChessBoard(chessboardId, {
    draggable: true,
    position: position,
    onDrop: (from, to) => {
      console.log(`LEFTOFF Moving from ${from}, to ${to}`)
    }
  })
}

export default class ChessBoard extends React.Component {
  render() {
    let { position }  = this.props
    return (
      <div>
      <h1 style={ {display: 'none'} }>TODO make a chessboard: { JSON.stringify(position) }</h1>
      <div id={ chessboardId } style={ {width: 600} }></div>
      </div>
    )
  }

  componentDidMount() {
    console.log('R> CDM')
    initChess(this.props)
  }

  // The most common uses of componentDidUpdate() is managing 3rd party UI elements
  componentDidUpdate() {
    console.log('R> CDU')
    initChess(this.props)
  }
}
