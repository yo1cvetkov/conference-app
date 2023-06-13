import React, {useContext, useEffect, useState} from 'react'
import Navbar, { Modal } from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Events from './pages/Events/Events.jsx'
import MyEvents from './pages/MyEvents/MyEvents.jsx'
import Users from './pages/Users/Users.jsx'
import SinglePage from './pages/SinglePage/SinglePage'
import Register from './pages/Register/Register'
import { DataContext } from './DataContext'

function App() {
  const { fetchConferences, fetchUsers, update} = useContext(DataContext);
  const [render, setRender] = useState(false);

  useEffect(() => {
    fetchConferences();
    fetchUsers();
    setRender(old => !old);
  }, [update]);


  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes> 
            <Route index element={<Events />} />
            <Route path="/my_events" element={<MyEvents />} />
            <Route path="/users" element={<Users />} />
            <Route path='/conference/:name' element={<SinglePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Modal />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App