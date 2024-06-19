import React from "react";
import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./view/home/home";
import Login from "./view/login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path= "/home" element={<Home />} />

        {/* <Route exact path= "/facialRecognition" element={} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
