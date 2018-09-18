import PropTypes from 'prop-types'
import Base from './Base'
import {categoryIdGenerator} from '../utils/idGenerator'
import {CATEGORY} from '../constants/types'

class Category extends Base {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }

  static getCategory = function (id) {
    return new this({}, id)
  }

  constructor ({name}, id) {
    super(CATEGORY)
    if (id || id === 0) {
      ({id, name} = this.getEntityFromStorage(id))
    } else {
      id = categoryIdGenerator.next().value
    }
    this.setProps({id, name})
  }
}

export default Category
