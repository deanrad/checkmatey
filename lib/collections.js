import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const Moves = new Mongo.Collection('moves')
if (Meteor.isClient) {
    window.Moves = Moves
}
