import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("password", data.password);
        formdata.append("address", data.address);
        formdata.append("salary", data.salary);
        formdata.append("department", data.department);
        formdata.append("age", data.age); // Include the new field
        formdata.append("gender", data.gender); // Include the new field
        formdata.append("contact", data.contact); // Include the new field
        formdata.append("education", data.education); // Include the new field
        formdata.append("post", data.post); // Include the new field
        formdata.append("training", data.training); // Include the new field
        formdata.append("image", data.image);
        console.log(formdata)
        try {
            const res = await axios.post('http://localhost:8080/create', formdata);
            navigate('/employee');
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
        image: '',
        address: '',
        salary: '',
        department: '',
        age: '', // Include the new field
        gender: '', // Include the new field
        contact: '', // Include the new field
        education: '', // Include the new field
        post: '', // Include the new field
        training: '' // Include the new field
    });

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Employee</h2>
			<form className="row g-3 w-50" onSubmit={handleSubmit}>
				<div class="col-12">
 					<label for="inputName" class="form-label">Name</label>
 					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputPassword4" class="form-label">Password</label>
					<input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, password: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputSalary" class="form-label">Salary</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
					onChange={e => setData({...data, salary: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputAddress" class="form-label">Address</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setData({...data, address: e.target.value})}/>
			  </div>
			  <div class="col-12">
					<label for="inputAddress" class="form-label">Department</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setData({...data, department: e.target.value})}/>
				</div>
				<div class="col-12 mb-3">
					<label class="form-label" for="inputGroupFile01">Select Image</label>
					<input type="file" class="form-control" id="inputGroupFile01"
					onChange={e => setData({...data, image: e.target.files[0]})}/>
				</div>
                
                
                
                <div className="col-12">
                    <label htmlFor="inputAge" className="form-label">Age</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAge"
                        placeholder="Enter Age"
                        autoComplete="off"
                        onChange={(e) => setData({ ...data, age: e.target.value })}
                    />
				</div>
				<div className="col-12">
                    <label htmlFor="inputAge" className="form-label">Gender</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAge"
                        placeholder="Enter Age"
                        autoComplete="off"
                        onChange={(e) => setData({ ...data, gender: e.target.value })}
                    />
				</div>
				<div className="col-12">
                    <label htmlFor="inputAge" className="form-label">Contact</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAge"
                        placeholder="Enter Age"
                        autoComplete="off"
                        onChange={(e) => setData({ ...data, contact: e.target.value })}
                    />
				</div>
				<div className="col-12">
                    <label htmlFor="inputAge" className="form-label">Education</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAge"
                        placeholder="Enter Age"
                        autoComplete="off"
                        onChange={(e) => setData({ ...data, education: e.target.value })}
                    />
				</div>
				<div className="col-12">
                    <label htmlFor="inputAge" className="form-label">Post</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAge"
                        placeholder="Enter Age"
                        autoComplete="off"
                        onChange={(e) => setData({ ...data, post: e.target.value })}
                    />
				</div>
				<div className="col-12">
                    <label htmlFor="inputAge" className="form-label">Training</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAge"
                        placeholder="Enter Age"
                        autoComplete="off"
                        onChange={(e) => setData({ ...data, training: e.target.value })}
                    />
                </div>
                
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
}

export default AddEmployee;
