import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const authContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const login = (user) => {

        setUser(user)
    }
    const logout =  ()=>{
        localStorage.removeItem('token')
        setUser(null)
    }

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.get('https://mern-stack-oaf0.onrender.com/api/auth/verify', {
                    headers: {
                        confirmation: `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                if (res.data.success) {
                    setUser(res.data.user)
                } else[
                    setUser(null)
                ]
            } catch (error) {
                console.log(error);
            }
        }
        verifyUser()
    }, [])


    return (
        <authContext.Provider value={{ user, login, logout }}>
            {children}

        </authContext.Provider>



    )
}
export const useAuth = () => useContext(authContext)


export default AuthProvider