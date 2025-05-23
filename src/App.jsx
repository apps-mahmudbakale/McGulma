import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import ContactUs from './pages/Contact'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Appendix from './pages/Appendix'
import Definition from './pages/Definition'
import Login from './pages/Login'

function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])
}

function AppRoutes() {
  usePageTracking()

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/appendix" element={<Appendix />} />
        <Route path="/word/:word" element={<Definition />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
