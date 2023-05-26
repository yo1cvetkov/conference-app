import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Events from './pages/Events/Events.jsx'
import MyEvents from './pages/MyEvents/MyEvents.jsx'
import Users from './pages/Users/Users.jsx'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes> 
            <Route index element={<Events />} />
            <Route path="/my_events" element={<MyEvents />} />
            <Route path="/users" element={<Users />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App