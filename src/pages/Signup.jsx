import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()



    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://mern-stack-oaf0.onrender.com/api/auth/signup',
                {name,email, password }
            );
            if (response.data.success) {
                alert(response.data.message);  
                navigate('/login');           
            }
            
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed");

            console.log(error);

        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">

            <div className="border shadow p-6 w-80 bg-white ">
                <h2 className='text-2xl font-bold mb-4'>Signup</h2>
                <form onSubmit={handlesubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 '>Name</label>
                        <input type="text"
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter Username'
                            className='w-full px-3 py-2 border'
                            required />
                    </div>


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
                            Signup
                        </button>
                        <p className='text-center mt-5'>
                           Already Have Account? <Link className=' text-amber-500' to="/login">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup