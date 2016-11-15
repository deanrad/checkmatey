import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { fromJS } from 'immutable'
import { Games } from './collections'

// Look at the signature-  a Reducer! Use immutable for its nice API
export const makeNewPositionWithMovePlayed = (position, { from, to }) => {
    let iPos = fromJS(position)
    return iPos
        .update(to, () => iPos.get(from))
        .delete(from)
        .toJS()
}

export const makeMove = new ValidatedMethod({
    name: 'makeMove',
    validate: () => {/* TODO */},
    run({ from, to, position }) {
        let id = Games.findOne()._id
        Games.update(id, {$set: {position: position}, $push:{ 'moves': { from, to }}})
    }
})
