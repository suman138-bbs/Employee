import { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: 'suman',
        password:''
    })
    const [error,setError] = useState(null)
    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            const res = await axios.post('http://localhost:8080/login', values)
            if (res.data.Status==='Success') {
                navigate('/')
            } else {
                setError(res.data.Message);
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
     <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' value={values.email}
                          onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                          onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
                    <p>You are agree to our terms and policies</p>
                  
                </form>
            </div>
        </div>
  )
}

export default Login