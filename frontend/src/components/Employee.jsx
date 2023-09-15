import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/getEmployees');
        setData(res.data.Result);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [message]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete('http://localhost:8080/deleteEmployee/' + id);
      console.log("From Backend", res);
      setMessage(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter employees based on the search query
  const filteredData = data.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='px-5 py-3 '>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Employee List</h3>
      </div>
      
      <div style={{ display: 'flex', gap:'41em'}}>
        <Link to='/create' className='btn btn-success'>Add Employee</Link>
        <input
          style={{borderRadius:"0.5em", backgroundColor:"#082a6e" ,border:'none',padding:'0.5em'}}
          type='text'
          placeholder='Search by name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state when input changes
        />
      </div>
      <div className='mt-3 bg-white employee-list-container'>
        
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
            {filteredData.map(({ email, address, salary, name, id, image, department }) => {
              return (
                <tr key={id}>
                  <Link to={`/profile/${id}`}>
                    <td>{name}</td>
                  </Link>
                  <td>
                    {
                      <img src={`http://localhost:8080/images/` + image} alt="" className='employee_image' />
                    }
                  </td>
                  <td>{email}</td>
                  <td>{address}</td>
                  <td>{salary}</td>
                  <td>{department}</td>
                  <td>
                    <Link to={`/employeeEdit/` + id} className='btn btn-primary btn-sm me-2'>
                      edit
                    </Link>
                    <button onClick={() => handleDelete(id)} className='btn btn-sm btn-danger'>
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
