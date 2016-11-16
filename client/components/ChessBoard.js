/* global: window.ChessBoard */
import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import React from 'react'
import { dispatch, Actions } from '/lib/dispatch'

const chessboardId = 'chessboard-js'

let rebindChessBoard = (game, dispatch) => {
    let { position } = game

    new window.ChessBoard(chessboardId, {
        draggable: true,
        position: position,
        onDrop: (from, to) => {
            if (from === to || (to === 'offboard')) { return }

            let mover = position[from]
            dispatch(Actions.Game.requestMove({ from, to, mover }))
        }
    })
}

const PromotionOption = ({ promoOption, dispatch }) => {
    if (_.isEmpty(promoOption) ) return null

    let { from, to, mover, color } = promoOption
    return (
        <div>
            Choose a promotion option:
            <ol>
                <li onClick={() => {
                    dispatch(Actions.Game.requestMove({ from, to, mover, promotionOption: 'Q' }))
                }}>Queen</li>
                <li onClick={() => {
                    dispatch(Actions.Game.requestMove({ from, to, mover, promotionOption: 'N' }))
                }}>Knight</li>
            </ol>
        </div>
    )
}

export default class ChessBoard extends React.Component {
    render() {
        return (
              <div>
                  <h1>How about a nice game of Chess?</h1>

                  <PromotionOption { ...this.props } />

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
