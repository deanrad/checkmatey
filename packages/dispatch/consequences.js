import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import Rx from 'rxjs/Rx'
const { Observable, Subject } = Rx

const env = Meteor.isClient ? 'client' : 'server'

export const newId = (action) => {
    return action.mergeIn(['meta', env], {
        id: Random.id()
    })
}
export const stampFields = (action) => {
    return newId(action).mergeIn(['meta', env], {
        createdAt: new Date()
    })
}

export const markParent = parent => (consequence) => {
  const parentId = parent.getIn(['meta', env, 'id'])
  return consequence.setIn(['meta', env, 'parentId'], parentId)
}

// this expresses all consequences of an action - or an empty observable
export const consequencesOf = (action, action$, Consequences) => {
    let epic = Consequences[action.get('type')]

    if (!epic) return Observable.empty()
    let consequence$ = epic(action, action$) || Observable.empty()
    return consequence$
        .map(newId)
        .map(markParent(action))
}
