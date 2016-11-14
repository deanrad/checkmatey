import ChessBoardWithData from '/imports/components/chess/ChessBoardWithData'
import { mount } from 'react-mounter'

FlowRouter.route('/', {
  action() { mount(ChessBoardWithData) }
})
