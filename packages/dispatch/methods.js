import { UniMethod } from 'meteor/deanius:uni-method'
import { _ } from 'meteor/underscore'
import { getStore } from './store'
import { diff } from 'mongodb-diff'

export const getDispatch = ({ Actions, PayloadSchema, Consequences, Reducers, Collections }) => {
    return UniMethod.define('deanius:dispatch', {
        mayBeFulfilledLocally: true,

        validate: () => {
            // TODO Validate the PayloadSchema based on actionType
        },

        clientMethod: (action) => {
            // TODO Implement optimistic UI
        },

        serverMethod: (action) => {
            console.log('DM> ', action);

            if (action.meta && action.meta.store) {
                let promisedStore = getStore(action, Collections, Reducers)

                // this little trick here uses Fibers to access the promise result 'synchronously'
                let store = Promise.await(promisedStore)

                let oldState = store.getState()
                store.dispatch(action)
                let newState = store.getState()

                let diffObj = diff(oldState.toJS(), newState.toJS())
                if (! _.isEmpty(diffObj) ) {
                    store.updateDB(diffObj)
                }
            }
            console.log('DM> *')
        }
    })
}
