import { DispatchWith } from 'meteor/deanius:dispatch'
import { Games } from './collections'

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
const Consequences = {
    'Game.makeMove': (action) => {
        return Observable.of(Actions.Game.makeMove(action))
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
