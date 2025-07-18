import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import axios from '../axios'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

const useLogin = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setIsAuth } = useAuthStore()
    const navigate = useNavigate()

    const loginFetch = async (email, password) => {
        setLoading(true)
        try {
            const response = await axios.post('auth/login', { email, password })
            console.log(response.data);
            localStorage.setItem('token', response.data.message)
            setIsAuth(true)
            navigate('/')
            toast.success('Вы успешно вошли в систему')
           
        } catch (error) {
            setError(error.response.data.message)
            toast.error('Неправильный логин или пароль')
        } finally {
            setLoading(false)
        }
    }
    return { loginFetch, error, loading }
}

export default useLogin
