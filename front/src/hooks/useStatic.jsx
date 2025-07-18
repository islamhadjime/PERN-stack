import axios from '../axios'
import { useStaticStore } from '../store/staticStore'
import React from 'react'
const useStatic = () => {
    const { setStatic, setLoading } = useStaticStore()
        
    const getStatic = async () => {
        try {
            const res = await axios.get('/school')
            if(!res.data) throw new Error('No data')
            setStatic(res.data.schools)
            setLoading(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }
    


    return { getStatic }
}

export default useStatic
