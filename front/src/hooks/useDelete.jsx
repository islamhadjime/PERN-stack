import React from 'react'
import axios from '../axios'
import { toast } from 'react-toastify'


const useDelete = () => {


    const fetchDelete = async (id) => {
        try {
            const res = await axios.delete(`/school/${id}`)
            if(res.data.success){
                toast.success('Успешно удалено')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

  return {
      fetchDelete,
  }
}

export default useDelete