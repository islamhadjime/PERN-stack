import React, { useState } from 'react'
import axios from '../axios'
import { useAuthStore } from '../store/authStore'

const useInfo = () => {
    const { setInfog, setLoading } = useAuthStore()
     
    
    const fetchInfog = async () => {
        const response = await axios.get('school/endpoint')
        if(!response){
            throw new Error('Ошибка при получении информации')
        }
        setInfog(response.data.message)
        setLoading(false)
    }
    
    return { fetchInfog }
}

export default useInfo
