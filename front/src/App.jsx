import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import School from './pages/School'
import Layout from './components/Layout'
import Login from './pages/Login'
import { useAuthStore } from './store/authStore'
import useStatic from './hooks/useStatic'
import useInfo from './hooks/useInfo'
import { ToastContainer } from 'react-toastify';

function App() {
  const path = useLocation()
  const { getStatic } = useStatic()
  const { fetchInfog } = useInfo()
  const userIsAuth = window.localStorage.getItem('token')

  React.useEffect(() => {
    getStatic()
    if(userIsAuth){
      fetchInfog()
    }  
  }, [path])


  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/school/:id' element={<School />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
