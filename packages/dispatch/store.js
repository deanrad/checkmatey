import { createStore } from 'redux'
import { fromJS } from 'immutable'

let storeCache = {}

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
        .then(iDocument => iDocument.delete('_id'))
}

const createReducer = (mapActionsToReducers, initialValue) => {
    return (state, action) => {
        if (!state) return initialValue
        let actionReducer = mapActionsToReducers[action.type] || (s => s)
        return actionReducer(state, action.payload)
    }
}

const promisedStore = (action, Collections, Reducers) => {
    let [ entity ] = action.type.split('.')

    return getInitialValue(action, Collections)
        .then(initialValue => {
            let entityReducer = createReducer(Reducers[entity], initialValue)
            return createStore(entityReducer, initialValue)
        })
}

export const getStore = (action, Collections, Reducers) => {
    let { collection, id } = action.meta.store

    let storeId = `${collection}:${id}`
    let cached = storeCache[storeId]

    console.log(`DS> Getting ${cached ? '(cached)' : ''} store for ${storeId}:`)

    if (cached) {
        return Promise.resolve(cached)
    } else {
        // a promise for the store, once cached
        return promisedStore(action, Collections, Reducers)
            .then(store => {
                // console.log('DS> Created, caching store: ', store.getState())
                storeCache[storeId] = store
                return store
            })

    }
}
