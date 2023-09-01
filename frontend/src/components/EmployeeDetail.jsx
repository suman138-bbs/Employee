import React, { useState } from 'react'

const EmployeeDetail = () => {
  const handleLogout = () => {
    
  }
  const [employee,setEmployee]=useState()
  return (
      <div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            {/* <img src={`http://localhost:8080/images/`+employee.image} alt="" className='empImg'/>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Salary: {employee.salary}</h3>
            </div> */
        }
        <h1>HEllo</h1>
            <div>
                <button className='btn btn-primary me-2'>Edit</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail