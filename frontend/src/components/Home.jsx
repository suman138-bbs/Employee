import React, { useState,useEffect } from 'react'
import axios from 'axios';
const Home = () => {
    const [adminCount,setAdminCount] = useState(0)
    const [employeeCount,setEmployeeCount] = useState(0)
   const [salary, setSalary] = useState(0)
  useEffect(() => {
    const getAdminCount = async() => {
			const res = await axios.get('http://localhost:8080/adminCount')
			setAdminCount(res.data.result[0].admin)
    }
    const getEmployeeCount= async() => {
			const res = await axios.get('http://localhost:8080/employeeCount')
			setEmployeeCount(res.data.result[0].employee)
    }

    const getSalayCount =  async() => {
			const res = await axios.get('http://localhost:8080/totalSalary')
			setSalary(res.data.result[0].salary)
    }
    getAdminCount()
    getEmployeeCount()
    getSalayCount()
   },[])
  return(<div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {employeeCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {salary}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home