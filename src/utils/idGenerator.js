import {NOTE, COLOR, CATEGORY} from '../constants/types'
import {readLocalStorage} from './localStorage'
const idGenerator = function * (startId) {
  while (true) {
    yield startId++
  }
}
const categories = readLocalStorage(CATEGORY) || []
const colors = readLocalStorage(COLOR) || []
const notes = readLocalStorage(NOTE) || []

export const categoryIdGenerator = idGenerator(categories.length)

export const noteIdGenerator = idGenerator(notes.length)

export const colorIdGenerator = idGenerator(colors.length)
