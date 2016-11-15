import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const Games = new Mongo.Collection('Games')
if (Meteor.isClient) {
    window.Games = Games
}
