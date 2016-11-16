import { DispatchWith } from 'meteor/deanius:dispatch'
import { fromJS } from 'immutable'
import Rx from 'rxjs/Rx'
import { Games } from './collections'

const { Observable } = Rx

export const Actions = {
    Game: {
        requestMove: ({ from, to, mover }) => ({
            type: 'Game.requestMove',
            payload: { from, to, mover },
            meta: {
                mayBeFulfilledLocally: true,
                store: {
                    collection: 'Games'
                }
            }
        }),
        choosePromotion: ({ color }) => ({
            type: 'Game.choosePromotion',
            payload: {
                showPromotionOption: true,
                promotingColor: color
            },
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

const Reducers = {
    Game: {
        'Game.makeMove': (game, { from, to, promotionOption }) => {
            // TODO Game.makeMove reducer: switch piece out with the promotionOption
            return game
                .update('moves', moves => moves.push({ from, to }))
                .updateIn(['position', to], square => game.getIn(['position', from]))
                .updateIn(['position', from], square => undefined)
        }
    }
}

const Collections = {
    Games
}

const PayloadSchema = {}

// The action objects are immutable - use o.get('foo') not o['foo'] or o.foo,
// and make sure to return Observables of immutables
 const Consequences = {
    'Game.requestMove': (action, action$) => {
        let mover = action.getIn(['payload', 'mover'])
        let to = action.getIn(['payload', 'to'])

        let color = mover[0]
        let pieceType = mover[1]
        let reachedOpposingHome = (color === 'b' && to[1] === '1') || (color === 'w' && to[1] === '8')

        if (pieceType === 'P' && reachedOpposingHome) {
            return Observable.of(fromJS(Actions.Game.choosePromotion({ color })))
        }

        let makeMoveAction = Actions.Game.makeMove(action.get('payload').toJS())
        return Observable.of(fromJS(makeMoveAction))
    },
    'Test.interval': (action, action$) => {
        return Rx.Observable.interval(1000)
            // TODO Perfect example of why you want immutability guarantees
            .map(i => action.update('payload', p => (p - i - 1)))
            .take(action.get('payload'))
    }
}

export const { dispatch } = DispatchWith({
    Actions,
    PayloadSchema,
    Consequences,
    Reducers,
    Collections
})

// extend debugging vars/methods to the top level scope
const root = Meteor.isClient ? window : global
Object.assign(root, {
    dispatch,
    Actions
})
