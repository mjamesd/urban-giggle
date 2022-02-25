// Dependencies
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Styling

// Components
import Header from './components/Header';
import Login from './pages/Login'
import Footer from './components/Footer';

function App() {
  return (
    <Router >
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App