import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

import './styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes >
          <Route path="/" element={ <Navigate to="/home" replace /> } />
          <Route path="/home" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  );
}
