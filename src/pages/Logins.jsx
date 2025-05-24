import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../assets/context/AuthProvider'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {login} =useAuth()



    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://mern-stack-oaf0.onrender.com/api/auth/login',
                { email, password }
            );

            if (response.data.success) {
                login(response.data.user)
                alert(response.data.message); 
                localStorage.setItem("token", response.data.token);
                navigate('/');
            }


        } catch (error) {
            alert(error.response?.data?.message || "Login failed");

            console.log(error);


        }

    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">

            <div className="border shadow p-6 w-80 bg-white ">
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                <form onSubmit={handlesubmit}>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Email</label>
                        <input type="email"
                            className='w-full px-3 py-2 border'
                            onChange={(e) => setEmail(e.target.value)}

                            placeholder='Enter Your Email'
                            required />
                    </div>

                    <div className="mb-4">
                        <label className='w-full text-gray-700 py-2'>Password</label>
                        <input type="password"
                            placeholder='******'
                            onChange={(e) => setPassword(e.target.value)}

                            className='w-full px-3 py-2 border'
                            required />
                    </div>
                    <div className="mb-4">
                        <button
                            type='submit'
                            className='w-full bg-teal-600 text-white py-2 cursor-pointer'
                        >
                            Login
                        </button>
                        <p className='text-center mt-5'>
                            Don't have Account? <Link className='text-amber-600' to="/signup">SignUp</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login