import { composeWithTracker } from 'react-komposer'
import ChessBoard from './ChessBoard'
import { Games } from '/lib/collections'
import { dispatch } from '/lib/dispatch'

// A 'reactive' function, managed by Tracker.autorun, which will be re-run
// as its reactive dependencies change
const composer = (params, renderWith) => {
    let count = Games.find().count()
    let game = (count > 0) && Games.find().fetch()[count - 1]

    let eventHandlers = { dispatch }
    let dataFields = { game }

    // TODO implement showPromotionOption in ChessBoard
    let displayFields = {}

    const noError = null
    if (game) {
        renderWith(noError, {...dataFields, ...displayFields, ...eventHandlers})
    }
}

// What we export renders just like ChessBoard, but receives new props when the
// composer function calls `notify`. It does this on Reactive dependency changes.
export default composeWithTracker(composer)(ChessBoard)
