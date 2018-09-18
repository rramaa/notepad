import PropTypes from 'prop-types'
import {writeLocalStorage, readLocalStorage} from '../utils/localStorage'

const _propTypes = new WeakMap()
const _componentName = new WeakMap()
const _storageKey = new WeakMap()

class Base {
  constructor (storageKey) {
    const componentName = this.constructor.displayName || this.constructor.name
    _propTypes.set(this, this.constructor.propTypes || {})
    _componentName.set(this, componentName)
    _storageKey.set(this, storageKey)
  }

  getEntityFromStorage (id) {
    const storageKey = _storageKey.get(this)
    const entities = readLocalStorage(storageKey, [])
    const entity = entities.filter(v => v.id === id)[0]
    return entity
  }

  getProps (prop) {
    let propTypes = _propTypes.get(this)
    let supportedProps = Object.keys(propTypes)
    if (prop && supportedProps.includes(prop)) {
      return this[prop]
    } else if (!prop) {
      return supportedProps.reduce((map, v) => {
        map[v] = this[v]
        return map
      }, {})
    }
    return null
  }

  setProps (props = {}) {
    let propTypes = _propTypes.get(this)
    let supportedProps = Object.keys(propTypes)
    let componentName = _componentName.get(this)
    let combinedProps = {
      ...this,
      ...props
    }
    PropTypes.checkPropTypes(propTypes, combinedProps, 'property', componentName)
    Object.keys(props).forEach((prop) => {
      let value = props[prop]
      if (supportedProps.includes(prop)) {
        this[prop] = value
      }
    })
    const storageKey = _storageKey.get(this)
    const newProps = this.getProps()
    let list = readLocalStorage(storageKey, [])
    list = list.filter(v => v.id !== this.id)
    list.push(newProps)
    writeLocalStorage(storageKey, list)
    return newProps
  }
}

Base.propTypes = {
  id: PropTypes.number.isRequired
}

export default Base
