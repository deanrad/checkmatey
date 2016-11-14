import { composeWithTracker } from 'react-komposer'
import ChessBoard from './ChessBoard'
import { Moves } from '/lib/collections'

const noError = null
const composer = (params, notify) => {
    console.log('composing React props')

    let count = Moves.find().count();
    let mostRecentMove = Moves.find().fetch()[count - 1];

    if (mostRecentMove) {
        notify(noError, { move: mostRecentMove })
    }
}

export default composeWithTracker(composer)(ChessBoard)
