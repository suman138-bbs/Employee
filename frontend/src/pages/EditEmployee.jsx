import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

const EditEmployee = () => {
	const { id } = useParams();
	const navigate = useNavigate();
    const [data, setData] = useState({
        name:'',
        email:'',
        salary:'',
		address: '',
		department:'',
	})
	useEffect(() => {
		const getEmployeeDetail = async() => {
			const res = await axios.get('http://localhost:8080/get/' + id)
			console.log(res.data.Result[0])
			setData({ ...data, ...res.data.Result[0] })
		}
		getEmployeeDetail()
	},[])
	

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        
        try {
            const res = await axios.put('http://localhost:8080/editEmployee/'+id, data);
            if(res.data.Status=="Success") navigate('/employee')

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
					<label for="inputAddress" class="form-label">Department</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="Software Engineer" autoComplete='off'
					onChange={e => setData({...data, department: e.target.value})} value={data.department}/>
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Update</button>
				</div>
			</form>
		</div>
  )
}

export default EditEmployee