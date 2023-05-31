import React, {useState} from 'react'
import Navbar, { Modal } from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Events from './pages/Events/Events.jsx'
import MyEvents from './pages/MyEvents/MyEvents.jsx'
import Users from './pages/Users/Users.jsx'
import SinglePage from './pages/SinglePage/SinglePage'
import Register from './pages/Register/Register'


function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes> 
            <Route index element={<Events />} />
            <Route path="/my_events" element={<MyEvents />} />
            <Route path="/users" element={<Users />} />
            <Route path='/conference/:id' element={<SinglePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Modal />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App