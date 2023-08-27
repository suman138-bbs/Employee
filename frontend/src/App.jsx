import React from 'react'
import Login from './Login'
import './style.css'
import { Route, Routes } from 'react-router-dom'
import Dashbord from './Dashbord'
import Employee from './Employee'
import Profile from './Profile'
import Home from './Home'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import Start from './Start'
import EmployeeLogin from './EmployeeLogin'
import EmployeeDetail from './EmployeeDetail'
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