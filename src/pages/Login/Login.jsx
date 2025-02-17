import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setErrorMessage('Enter a valid email address');
            return;
        }
        else if (password==="") {
            setErrorMessage("Enter the password");
        }
        else {
            setErrorMessage(null);
            try {
                const response = await axiosInstance.post("/login", { 
                    email: email, 
                    password: password 
                });

                if (response.data && response.data.accessToken) {
                    localStorage.setItem("token", response.data.accessToken);
                    navigate("/dashboard");
                }

            } catch(error) {
                if (error.response && error.response.data && error.response.data.message)
                    setErrorMessage(error.response.data.message);
                else
                    setErrorMessage("An unexpected error has occured");
            }
        }
    }

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
            <form onSubmit={() => {}}>
                <h4 className='text-2xl mb-7'>Login</h4>
                <input type='email' placeholder='Email' className='input-box' value={email} onChange={(e) => {setEmail(e.target.value)}} />
                <PasswordInput value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
                
                {
                    (errorMessage === null) ? "" :
                        <p className='text-red-500 text-xs pb-1'>{errorMessage}</p>
                }

                <button type='submit' className='btn-primary' onClick={handleLogin}>Login</button>
                <p className='text-sm text-center mt-4'>
                    Not registered yet?{" "}
                    <Link to="/signup" className='font-medium text-primary underline'>Create an account</Link>
                </p>
            </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
