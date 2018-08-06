import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Category from './models/Category'
import Note from './models/Note'

window.Category = Category
window.Note = Note

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
