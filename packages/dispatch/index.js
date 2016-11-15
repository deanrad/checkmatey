import { UniMethod } from 'meteor/deanius:uni-method'

const universalDispatch = UniMethod.define('deanius:dispatch', action => {
    // LEFTOFF
    //let store = Promise.await(getStore(action))
    // console.log(store)


    Meteor.isClient && console.log('TODO Dispatch (client)', action)
    Meteor.isServer && console.log('TODO Dispatch (server)', action)
})

export const DispatchWith = ({ Actions, PayloadSchema, Consequences, Reducers, Collections }) => {

    console.log({ Actions, PayloadSchema, Consequences, Reducers, Collections })

    return {
        // has UniMethod behavior - returns Promise from the client, runs sync on server
        dispatch: universalDispatch
    }
}
