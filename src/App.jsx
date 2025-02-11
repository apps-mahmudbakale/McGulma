import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ContactUs from './pages/Contact'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Appendix from './pages/Appendix'
import Definition from './pages/Definition'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/appendix" element={<Appendix />} />
        <Route path="/word/:word" element={<Definition />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
