import { fromJS } from 'immutable'
import { getStore } from './store'
import { getDispatch } from './methods'

// The consuming app will invoke DispatchWith thusly
//
//     export const { dispatch } = DispatchWith(...)
//
// It will likely export `dispatch` to containers, that will share it via props.
export const DispatchWith = ({ Actions, PayloadSchema, Consequences, Reducers, Collections }) => {
    return {
        // has UniMethod behavior - returns Promise from the client, runs sync on server
        dispatch: getDispatch({ Actions, PayloadSchema, Consequences, Reducers, Collections })
    }
}
