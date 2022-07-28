import React from 'react'
import ReactDOM from 'react-dom/client'
import TreeView from './TreeView'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TreeView />
  </React.StrictMode>
)
