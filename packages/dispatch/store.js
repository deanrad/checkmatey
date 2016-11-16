import { createStore } from 'redux'
import { fromJS } from 'immutable'

let storeCache = new Map()

const getInitialValue = ({ type, meta }, Collections) => {
    return Promise.resolve()
        .then(() => {
            let { collection, id } = meta.store
            if (id) {
                return Collections[collection].findOne(id)
            } else {
                return Collections[collection].findOne()
            }
        })
        .then(doc => fromJS(doc))
}

const createReducer = (mapActionsToReducers, initialValue) => {
    return (state, action) => {
        if (!state) return initialValue
        let actionReducer = mapActionsToReducers[action.type] || (s => s)
        return actionReducer(state, action.payload)
    }
}

// Returns a promise for the store which it makes from the promised initialValue
const constructStore = (action, Collections, Reducers) => {
    let [ entity ] = action.type.split('.')
    let { collection } = action.meta.store

    return getInitialValue(action, Collections)
        .then(initialValue => {
            let entityReducer = createReducer(Reducers[entity], initialValue)
            let store = createStore(entityReducer, initialValue)

            store.updateDB = (diff) => {
                let id = initialValue.get('_id')
                console.log(`DB> Updating ${collection}:${id} with`, diff)

                return Collections[collection].update(id, diff)
            }
            return store
        })
}

// Returns a promise for the store whether cached or constructed+cached
export const getStore = (action, Collections, Reducers) => {
    let { collection, id } = action.meta.store

    let storeId = Symbol.for(`${collection}:${id}`)
    let cached = storeCache.get(storeId)

    console.log(`DS> Getting ${cached ? '(cached)' : ''} store for ${collection}:${id}`)

    if (cached) {
        return Promise.resolve(cached)
    }

    return constructStore(action, Collections, Reducers)
        .then(store => {
            storeCache.set(storeId, store)
            return store
        })
}
