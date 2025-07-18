import React from 'react'
import axios from '../axios'
import { toast } from 'react-toastify'


const useRegister = () => {

    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(null)
    

    const fetchRegister = async (name,email, password) => {
        setLoading(true)
        try {
            const response = await axios.post('auth/register', {name, email, password })
            if(response.status !== 200) {
                throw new Error('Error')
            }
            if(response.data.message){
                toast.success('Вы успешно зарегистрировались')
                return
            }

            window.location.reload()
            
        } catch (error) {
            setError(error.response.data.message)
            toast.error('Неправильный логин или пароль')
        } finally {
            setLoading(false)
        }
    }

   

  return {
    fetchRegister
  }
}

export default useRegister