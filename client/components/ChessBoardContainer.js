import { composeWithTracker } from 'react-komposer'
import ChessBoard from './ChessBoard'
import { Games } from '/lib/collections'

const composer = (params, notify) => {
    console.log('composing React props')

    const noError = null
    let count = Games.find().count()
    let game = (count > 0) && Games.find().fetch()[count - 1]

    if (game) {
        notify(noError, { game })
    }
}

// What we export renders just like ChessBoard, but receives new props when the
// composer function calls `notify`. It does this on Reactive dependency changes.
export default composeWithTracker(composer)(ChessBoard)
