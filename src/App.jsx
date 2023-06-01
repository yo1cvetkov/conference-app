import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/Events/Events.jsx";
import MyEvents from "./pages/MyEvents/MyEvents.jsx";
import Users from "./pages/Users/Users.jsx";
import SinglePage from "./pages/SinglePage/SinglePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Events />} />
          <Route path="/my_events" element={<MyEvents />} />
          <Route path="/users" element={<Users />} />
          <Route path="/conference/:id" element={<SinglePage />} />
          <Route path="/sign-in" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
