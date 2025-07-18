import React from 'react'
import axios from '../axios'
import { toast } from 'react-toastify'


const useFetchFile = () => {
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(null)

    const fetchFile = async (files) => {
        try{
            setLoading(true)
            const res = await axios.post('school/static-file', files)
            console.log(res.status);
            
            if(res.status === 200){
                setLoading(false)
                setSuccess(true)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
            else if(res.status === 400){
                setLoading(false)
                setSuccess(false)
                toast.error('Ошибка при загрузке файла вазможно ID уже существует')
            }
            

        }catch(err){
            setError(err)
            toast.error('Ошибка при загрузке файла вазможно ID файла уже существует')
            setSuccess(false)
        }finally{
            setLoading(false)
        }
    }

    return { fetchFile, loading, error, success }
}

export default useFetchFile
