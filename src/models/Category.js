import PropTypes from 'prop-types'
import Base from './Base'
import {categoryIdGenerator} from '../utils/idGenerator'
import {CATEGORY} from '../constants/types'

class Category extends Base {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }

  constructor (name) {
    super(CATEGORY)
    const id = categoryIdGenerator.next().value
    this.setProps({id, name})
  }
}

export default Category
