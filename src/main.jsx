import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import DataProvider from './DataContext.jsx'
import LoggedProvider from './AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <DataProvider>
      <LoggedProvider>
        <App />
      </LoggedProvider>
    </DataProvider>
  </>,
)
