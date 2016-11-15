import { UniMethod } from 'meteor/deanius:uni-method'

export const DispatchWith = ({ Actions, PayloadSchema, Consequences, Reducers, Collections }) => {

    console.log({ Actions, PayloadSchema, Consequences, Reducers, Collections })

    return {
        // has UniMethod behavior - returns Promise from the client, runs sync on server
        dispatch: UniMethod.define('deanius:dispatch#dispatch', action => {
            console.log('TODO Dispatch:', action)
        })
    }
}
