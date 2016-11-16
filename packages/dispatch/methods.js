import { UniMethod } from 'meteor/deanius:uni-method'
import { getStore } from './store'
import { diff } from 'mongodb-diff'

export const getDispatch = ({ Actions, PayloadSchema, Consequences, Reducers, Collections }) => {
    return UniMethod.define('deanius:dispatch', {
        clientMethod: (action) => {
            console.log('TODO Dispatch (client)', action)
        },
        serverMethod: (action) => {
            console.log('M> ', action);
            let promisedStore = getStore(action, Collections, Reducers)
            let store = Promise.await(promisedStore)

            let oldState = store.getState()
            store.dispatch(action)
            let newState = store.getState()

            let diffObj = diff(oldState.toJS(), newState.toJS())
            console.log('D>', diffObj)
            console.log('M> *')
            // LEFTOFF
            //promisedStore.then(store => console.log('Store:', store.getState()))

        }
    })
}
