import { UniMethod } from 'meteor/deanius:uni-method'
import { getStore } from './store'
import { diff } from 'mongodb-diff'

export const getDispatch = ({ Actions, PayloadSchema, Consequences, Reducers, Collections }) => {
    return UniMethod.define('deanius:dispatch', {
        clientMethod: (action) => {
            console.log('TODO Dispatch (client)', action)
        },
        validate: () => {/*  TODO Validate the PayloadSchema based on actionType */},
        serverMethod: (action) => {
            console.log('M> ', action);
            let promisedStore = getStore(action, Collections, Reducers)

            // this little trick here uses Fibers to access the promise result 'synchronously'
            let store = Promise.await(promisedStore)

            let oldState = store.getState()
            store.dispatch(action)
            let newState = store.getState()

            let diffObj = diff(oldState.toJS(), newState.toJS())
            store.updateDB(diffObj)
            console.log('M> *')
        }
    })
}
