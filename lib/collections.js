export const Moves = new Mongo.Collection('moves')
if (Meteor.isClient) {
    window.Moves = Moves
}
