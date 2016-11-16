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

export const DispatchWith = ({ Actions, PayloadSchema, Consequences, Reducers, Collections }) => {

    // UniMethod: returns Promise from the client, runs sync on server
    let universalMethod = getDispatch({ Actions, PayloadSchema, Consequences, Reducers, Collections })


    let consequence$ = action$
        .map(action => consequencesOf(action, action$, Consequences).startWith(action))
        .mergeAll()

    consequence$.subscribe(consequence => {console.log('DAC>', consequence.toJS()) })

    consequence$
        .filter(a => ! a.getIn(['meta', 'mayBeFulfilledLocally']))
        .map(a => a.toJS())
        .subscribe(universalMethod)

    return {
        // dispatch puts an immutable action onto the stream, which subscribers will react to accordingly
        dispatch: (action) => {
            let iAction = stampFields(fromJS(action))
            actions.next(iAction)
        }
    }
}
