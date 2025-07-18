import axios from '../axios'
import React from 'react'
import { useAuthStore } from '../store/authStore'



const useLogout = () => {
    const { setIsAuth } = useAuthStore()

    const logout = ()=>{
        window.localStorage.removeItem('token')
        setIsAuth(false)
    }

    return { logout }
}

export default useLogout