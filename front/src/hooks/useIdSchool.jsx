import axios from '../axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
const useIdSchool = () => {
    const [school, setSchool] = useState(null)
    const [loading, setLoading] = useState(false)

    const getSchool = async (id) => {
        try {
            setLoading(true)
            const res = await axios.get(`/school/${id}`)
            if(!res.data) throw new Error('No data')
            setSchool(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }

    }

    return { getSchool, school, loading }
}

export default useIdSchool