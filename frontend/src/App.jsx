// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Form from "./components/Form/Form";
import Directory from "./components/ClientDirectoty/Directory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/users" element={<Directory></Directory>} />
    </Routes>
  );
}

export default App;
