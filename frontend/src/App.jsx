import React from 'react'
import Login from './Login'
import './style.css'
import { Route, Routes } from 'react-router-dom'
import Dashbord from './Dashbord'
const App = () => {
  return (
    <div className='main-container'>
      <Routes>
        <Route path='/' element={<Dashbord/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      
    </div>
  )
}

export default App