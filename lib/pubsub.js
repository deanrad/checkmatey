import { Moves } from './collections'

if (Meteor.isServer) {
  Meteor.publish('moves', () => {
    return Moves.find()
  })

  Meteor.methods({
    makeMove: ({ from, to, position }) => {
        Moves.insert({
            from,
            to,
            position
        })
    }
  })
}

if (Meteor.isClient) {
  Meteor.subscribe('moves')
}
