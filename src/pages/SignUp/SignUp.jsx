import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
      e.preventDefault();
      if (username.trim()==="") {
        setErrorMessage('Enter a valid username');
        return;
      }
      else if (!validateEmail(email)) {
          setErrorMessage('Enter a valid email address');
          return;
      }
      else if (password==="") {
          setErrorMessage("Enter the password");
      }
      else if (!(password===confirmPassword)){
        setErrorMessage("Passords do not match");
      } else {
            try {
                const response = await axiosInstance.post("/create-account", { 
                    username: username,
                    email: email, 
                    password: password 
                });

                if (response.data && response.data.error) {
                    setErrorMessage(response.data.message);
                    return;
                }

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
              <h4 className='text-2xl mb-7'>Sign Up</h4>
              <input type='text' placeholder='Username' className='input-box' value={username} onChange={(e) => {setUsername(e.target.value)}} />
              <input type='email' placeholder='Email' className='input-box' value={email} onChange={(e) => {setEmail(e.target.value)}} />
              <PasswordInput value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
              <PasswordInput value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder="Confirm Password" />
              
              {
                  (errorMessage === null) ? "" :
                      <p className='text-red-500 text-xs pb-1'>{errorMessage}</p>
              }

              <button type='submit' className='btn-primary' onClick={handleSignup}>Create Account</button>
              <p className='text-sm text-center mt-4'>
                  Already have an account?{" "}
                  <Link to="/login" className='font-medium text-primary underline'>Login now</Link>
              </p>
          </form>
      </div>
    </div>
  </>
)
}

export default SignUpPage
