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
        showPromotionOption: ({ from, to, color }) => ({
            type: 'Game.showPromotionOption',
            payload: {
                from,
                to,
                color
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
        let { mover, to, from, promotionOption } = action.get('payload').toJS()
        let [ color, pieceType ] = mover

        let reachedOpposingHome = (color==='b' && to[1]==='1') || (color==='w' && to[1]==='8')

        if (pieceType === 'P' && reachedOpposingHome && !promotionOption) {
            // TODO emit an observable that completes when a matching makeMove is found
            let showPromotionOption = fromJS(Actions.Game.showPromotionOption({ from, to, color }))
            return Observable.of(showPromotionOption)
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

export const { dispatch, consequence$ } = DispatchWith({
    Actions,
    PayloadSchema,
    Consequences,
    Reducers,
    Collections
})


export const promoOption = new ReactiveVar({})

if (Meteor.isClient) {
    Object.assign(window, {
        promoOption
    })
}

// XXX cheap way of propgating these events into komposer, without a store
let promoOption$ = consequence$
    .filter(c => c.get('type') === 'Game.showPromotionOption')

promoOption$.subscribe(promo => {
    promoOption.set(promo.get('payload').toJS())
})

// LEFTOFF choose the promotion piece
// let promoConclusion$ = promoOption$
//     .zip(consequence$.filter(c => c.get('type') === 'Game.makeMove'))

//promoConclusion$.subscribe(() => promoOption.set({}))

// Tracker.autorun(() => {
//     console.log('DS> promoOption: ', promoOption.get())
// })

// extend debugging vars/methods to the top level scope
const root = Meteor.isClient ? window : global
Object.assign(root, {
    dispatch,
    Actions
})
