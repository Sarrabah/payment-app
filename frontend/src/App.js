import React from 'react';
import Home from './pages/Home';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import CheckoutPanier from './pages/CheckoutPanier';
import './App.css';

function App() {
  return (
   <Router>
    <Routes>
    
      <Route path='/' element={<Home />} />
      <Route path='/checkout' element={<CheckoutPanier />} />
  
    </Routes>
  </Router>
  );
}

export default App;
