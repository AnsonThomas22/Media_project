import { useState, useEffect } from 'react'
import './App.css'
import './bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages1/Home'
import Landing from './pages1/Landing'
import History from './pages1/History'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages1/Login'
import Register from './pages1/Register'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home data={data} />} />
        <Route path='/his' element={<History />} />
        <Route path='/log' element={<Login />} />
        <Route path='/reg' element={<Register />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App;
