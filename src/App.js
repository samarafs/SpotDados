
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Search from './components/Search';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';

function App() {

  return (
    function App() {
      <h1>Hello</h1>
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Search />} />
            </Route>
          </Routes>
        </Router>
      );
    }
    
  );
}

export default App;




