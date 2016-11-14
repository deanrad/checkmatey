import { Moves } from './collections'

if (Meteor.isServer) {
  Meteor.publish('moves', () => {
    return Moves.find()
  })
}

if (Meteor.isClient) {
  Meteor.subscribe('moves')
}
