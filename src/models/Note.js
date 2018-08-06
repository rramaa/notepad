import PropTypes from 'prop-types'
import Base from './Base'
import {noteIdGenerator} from '../utils/idGenerator'
import {isArray} from '../utils/typeChecks'
import {NOTE} from '../constants/types'

function createAssocication (existingAssociations = [], ids) {
  if (!isArray(ids)) {
    ids = [ids]
  }
  let associations = [
    ...existingAssociations,
    ...ids
  ]
  return associations
    .filter((v, k) => k === associations.indexOf(v))
    .sort((a, b) => a - b)
}

class Note extends Base {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    associations: PropTypes.shape({
      category: PropTypes.arrayOf(PropTypes.number),
      color: PropTypes.arrayOf(PropTypes.number)
    })
  }

  constructor (title, content) {
    super(NOTE)
    const id = noteIdGenerator.next().value
    this.setProps({id, title, content})
  }

  setOrUpdateAssociation (type, ids) {
    const {associations = {}} = this
    associations[type] = createAssocication(associations[type], ids)
    return this.setProps({associations: associations})
  }

  deleteAssociation (type, ids) {
    if (!isArray(ids)) {
      ids = [ids]
    }
    let {associations = {}} = this
    let association = associations[type]
    if (!association) {
      return null
    }
    association = association.filter(v => !ids.includes(v))
    associations = {
      ...associations,
      [type]: association
    }
    return this.setProps({associations})
  }
}

export default Note
