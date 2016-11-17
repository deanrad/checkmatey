import { fromJS } from 'immutable'
import Rx from 'rxjs/Rx'
import { getStore } from './store'
import { getDispatch } from './methods'
import { stampFields, consequencesOf } from './consequences'

const { Observable, Subject } = Rx

// Set it up so that each dispatch becomes an event on the action$ Observable
const actions = new Rx.Subject()
const action$ = actions.asObservable()

// How to get a dispatch reference
//
//     export const { dispatch } = DispatchWith(...)
//
// It will likely export `dispatch` to containers, that will share it via props.
export const DispatchWith = ({ Actions, PayloadSchema, Epics, Reducers, Collections }) => {
    return getDispatch({ Actions, PayloadSchema, Epics, Reducers, Collections })
}
