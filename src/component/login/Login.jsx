import React,{useContext, useState} from 'react'
import '../signup/signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { productContext } from '../contextAPI/Context'
import API_BASE_URL from '../../api';

const Login = () => {
    const navigate = useNavigate()
    const { token,setToken } = useContext(productContext)
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
  
    const url = `${API_BASE_URL}/login`
 
    const changeMailHandler = (e) => {
        setMail(e.target.value)
    }
    const changePasswordHandler = (e) => {
        setPassword(e.target.value)
    }
  
    const submitHandler = () => {
    axios.post(url, { email, password })
        .then(res => {
            console.log("Login response:", res.data);

            if (res.status === 200 || res.status === 201) {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
                navigate('/home');
            }
        })
        .catch(err => {
            console.log("Login error:", err);
            console.log("Server response:", err.response?.data);
            alert(err.response?.data?.message || "Login failed. Check the browser console.");
        });
};
  
  
    return (
      <div className='signup'>
        <input type="text" placeholder='email' onChange={(e) => { changeMailHandler(e) }}/>
        <input type="password" placeholder='password'  onChange={(e) => { changePasswordHandler(e) }} />
        <button onClick={() => { submitHandler() }}>Login</button>
      </div>
    )
  }

export default Login