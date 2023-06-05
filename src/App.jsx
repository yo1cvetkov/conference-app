import React, {useState, createContext, useContext, useEffect} from 'react'
import Navbar, { Modal } from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Events from './pages/Events/Events.jsx'
import MyEvents from './pages/MyEvents/MyEvents.jsx'
import Users from './pages/Users/Users.jsx'
import SinglePage from './pages/SinglePage/SinglePage'
import Register from './pages/Register/Register'
import LoggedProvider from './AuthContext'
import axios from 'axios'

export const ConferenceState = createContext();

function App() {
  const fetchURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/conferences';
  const [conferences, setConferences] = useState(null);

  const requestConfig = {
    headers: {
      'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo',
    }
  }

  useEffect(()=>{
    axios.get(fetchURL, requestConfig).then(response => {
      setConferences(response.data.conferences)
    }).catch((error)=>{
      if(error.response.status === 401 || error.response.status === 403) {
        console.log('failed');
      } else {
        console.log('failed');
      }
    })
  },[]);

  return (
    <div>
      <ConferenceState.Provider value={conferences}>
      <LoggedProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes> 
            <Route index element={<Events />} />
            <Route path="/conference" element={<Events />} />
            <Route path="/my_events" element={<MyEvents />} />
            <Route path="/users" element={<Users />} />
            <Route path='/conference/:id' element={<SinglePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Modal />}/>
      </Routes>
      </BrowserRouter>
      </LoggedProvider>
      </ConferenceState.Provider>
    </div>
  )
}

export default App