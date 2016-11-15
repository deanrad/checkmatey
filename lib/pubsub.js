import { Games } from './collections'

if (Meteor.isServer) {
  Meteor.publish('games', () => {
    return Games.find()
  })
}

if (Meteor.isClient) {
  Meteor.subscribe('games')
}
