import { composeWithTracker } from 'react-komposer'
import ChessBoard from './ChessBoard'
import { Moves } from '/lib/collections'

const composer = (params, notify) => {
    console.log('composing React props')

    const noError = null
    let count = Moves.find().count();
    let mostRecentMove = Moves.find().fetch()[count - 1];

    if (mostRecentMove) {
        notify(noError, { move: mostRecentMove })
    }
}

// What we export renders just like ChessBoard, but receives new props when the
// composer function calls `notify`. It does this on Reactive dependency changes.
export default composeWithTracker(composer)(ChessBoard)
