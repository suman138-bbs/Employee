import '../index.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Employee = () => {
  const [data, setData] = useState([]);
  const [message,setMessage] = useState('')
        useEffect(() => {
            try {
                const getData = async() => {
                const res = await axios.get('http://localhost:8080/getEmployees');
               
                setData(res.data.Result)
                
            }
          getData()
            } catch (error) {
                console.log(error)
            }
        }, [message])
    const handleDelete = async(id) => {
      try {
        const res = await axios.delete('http://localhost:8080/deleteEmployee/'+ id)
        console.log("From Backend", res)
        setMessage(res)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='px-5 py-3 '>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3 '>
        <table className='table '>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className=''>
            {data.map(({email,address,salary, name, id,image,department }) => {
              return <tr key={id}>
                  <td>{name}</td>
                  <td>{
                    <img src={`http://localhost:8080/images/`+image} alt="" className='employee_image'/>
                    }</td>
                  <td>{email}</td>
                  <td>{address}</td>
                  <td>{salary}</td>
                  <td>{department}</td>
                  <td>
                    <Link to={`/employeeEdit/`+id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee