import { DispatchWith } from 'meteor/deanius:dispatch'

const Actions = {
    Game: {
        makeMove: ({ from, to }) => ({
            type: 'Game.makeMove',
            payload: { from, to }
        })
    }
}

const PayloadSchema = {}
const Consequences = {}
const Reducers = {}
const Collections = {}

const { dispatch } = DispatchWith({
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
