import React from 'react'
import Login from './pages/Login'
import './style.css'
import { Route, Routes } from 'react-router-dom'
import Dashbord from './pages/Dashbord'
import Employee from './components/Employee'
import Profile from './pages/Profile'
import Home from './components/Home'
import AddEmployee from './pages/AddEmployee'
import EditEmployee from './pages/EditEmployee'
import Start from './pages/Start'
import EmployeeLogin from './pages/EmployeeLogin'
import EmployeeDetail from './components/EmployeeDetail'
const App = () => {
  return (
    <div className='main-container'>
      <Routes>
        <Route path='/' element={<Dashbord />}>
          <Route index element = {<Home/>}/>
          <Route path='employee' element = {<Employee/>}/>
          <Route path='profile' element={<Profile />} />
          <Route path='create' element = {<AddEmployee/>}/>
          <Route path='/employeeEdit/:id' element = {<EditEmployee/>}/>
      </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/start' element={<Start/>}/>
        <Route path='/employeeLogin' element={<EmployeeLogin/>}/>
        <Route path='/employeeDetail' element={<EmployeeDetail/>}/>
      </Routes>
      
    </div>
  )
}

export default App