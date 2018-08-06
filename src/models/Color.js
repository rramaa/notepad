import PropTypes from 'prop-types'
import Base from './Base'
import {colorIdGenerator} from '../utils/idGenerator'
import {COLOR} from '../constants/types'

class Color extends Base {
  static propTypes = {
    id: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  constructor (hash, name) {
    super(COLOR)
    const id = colorIdGenerator.next().value
    this.setProps({id, hash, name})
  }
}

export default Color
