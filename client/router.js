import ChessBoard from './components/ChessBoardContainer'
import { mount } from 'react-mounter'

FlowRouter.route('/', {
    action() {
        mount(ChessBoard)
    }
})
