import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const EditEmployee = () => {
    const [data, setData] = useState({
        name:'',
        email:'',
        salary:'',
        address:''
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        
        try {
            const res = await axios.post('http://localhost:8080/editEmployee', formdata);
            // navigate('/employee')
            // console.log(res)

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>Update Employee</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})} value={data.name}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})} value={data.email}/>
				</div>
				<div class="col-12">
					<label for="inputSalary" class="form-label">Salary</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
					onChange={e => setData({...data, salary: e.target.value})} value={data.salary}/>
				</div>
				<div class="col-12">
					<label for="inputAddress" class="form-label">Address</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setData({...data, address: e.target.value})} value={data.address}/>
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Update</button>
				</div>
			</form>
		</div>
  )
}

export default EditEmployee