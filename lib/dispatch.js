import { DispatchWith } from 'meteor/deanius:dispatch'
import { Games } from './collections'

export const Actions = {
    Game: {
        makeMove: ({ from, to }) => ({
            type: 'Game.makeMove',
            payload: { from, to },
            meta: {
                store: {
                    collection: 'Games'
                }
            }
        })
    }
}

const PayloadSchema = {}
const Consequences = {}
const Reducers = {
    Game: {
        'Game.makeMove': (game, { from, to }) => {
            return game
                .updateIn(['position', to], square => game.getIn(['position', from]))
                .updateIn(['position', from], square => undefined)
        }
    }
}
const Collections = {
    Games
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
