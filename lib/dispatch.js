import { Tracker } from 'meteor/tracker'
import { ReactiveVar } from 'meteor/reactive-var'
import { DispatchWith } from 'meteor/deanius:dispatch'
import { fromJS } from 'immutable'
import Rx from 'rxjs/Rx'
import { Games } from './collections'

const { Observable } = Rx

export const Actions = {
    Game: {
        requestMove: ({ from, to, mover, promotionOption }) => ({
            type: 'Game.requestMove',
            payload: { from, to, mover, promotionOption },
            meta: {
                mayBeFulfilledLocally: true,
                store: {
                    collection: 'Games'
                }
            }
        }),
        showPromotionOption: ({ from, to, mover, color }) => ({
            type: 'Game.showPromotionOption',
            payload: {
                from,
                to,
                mover,
                color
            },
            meta: {
                mayBeFulfilledLocally: true,
                store: {
                    collection: 'Games'
                }
            }
        }),
        hidePromotionOption: () => ({
            type: 'Game.hidePromotionOption',
            payload: null,
            meta: {
                mayBeFulfilledLocally: true,
                store: {
                    collection: 'Games'
                }
            }
        }),
        makeMove: ({ from, to, promotionOption }) => ({
            type: 'Game.makeMove',
            payload: { from, to, promotionOption },
            meta: {
                store: {
                    collection: 'Games'
                }
            }
        })
    }
}

// first argument is the immutable being changed, 2nd is a plain JS action
const Reducers = {
    Game: {
        'Game.makeMove': (game, { from, to, promotionOption }) => {
            let endingPiece = game.getIn(['position', from])
            if (promotionOption) {
                endingPiece = endingPiece.substring(0,1) + promotionOption
            }
            return game
                .update('moves', moves => moves.push({ from, to, promotionOption }))
                .updateIn(['position', to], square => endingPiece)
                .updateIn(['position', from], square => undefined)
        },
        'Game.showPromotionOption': (game, payload) => {
            return game.setIn(['ui', 'promotionOption'], payload)
        },
        'Game.hidePromotionOption': (game, payload) => {
            return game.setIn(['ui', 'promotionOption'], null)
        },
    }
}

const Collections = {
    Games
}

const PayloadSchema = {}

const Epics = {
    'Game.requestMove': (action$, store) => {
        return action$
            .ofType('Game.requestMove')
            // TODO figure out if they need a promotion
            .map(action => {
                let { mover, to, from, promotionOption } = action.payload
                let [ color, pieceType ] = mover

                let reachedOpposingHome = (color==='b' && to[1]==='1') || (color==='w' && to[1]==='8')

                if (pieceType === 'P' && reachedOpposingHome && !promotionOption) {
                    return Actions.Game.showPromotionOption({ from, to, mover, color })
                }

                return Actions.Game.makeMove(action.payload)
            })
    },
    'Game.hidePromotionOption': (action$) => {
        return action$
            .ofType('Game.showPromotionOption')
            .switchMap(action =>
                action$
                .take(1)
                .map(() => Actions.Game.hidePromotionOption())
            )
    },
    'Test.interval': (action$, store) => {
        return action$
            .ofType('Test.interval')
            .mergeMap(({ payload }) => {
                return Rx.Observable.interval(1000)
                    .map(i => ({
                        type: 'Test.intervalResponse',
                        payload: (payload - i - 1),
                        meta: {mayBeFulfilledLocally: true}
                    }))
                    .take(payload)
            })
    }
}

export const { dispatch, allStores } = DispatchWith({
    Actions,
    PayloadSchema,
    Epics,
    Reducers,
    Collections
})

// extend debugging vars/methods to the top level scope
const root = Meteor.isClient ? window : global
Object.assign(root, {
    dispatch,
    allStores,
    Actions,
    Observable
})
