import React from 'react'
import axios from '../axios'
import { toast } from 'react-toastify'

const useSchoolAdd = () => {


  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/school/users')
      if(!response.data) throw new Error('No data')
      setUsers(response.data.users)
    } catch (error) {
        toast.error('Ошибка при получении пользователей')
      console.error(error)
    }
  }

  React.useEffect(() => {
    fetchUsers()
  }, [])


  const fetchaddSchool = async ({schoolName, students,idUser}) => {
    try {
      const response = await axios.post('/school/create-school', {schoolName, students,idUser})
      if(response.status !== 200) {
        throw new Error('Error')
      }
      toast.success('Школа успешно создана')
      window.location.reload()
    } catch (error) {
      toast.error('Ошибка при создании школы')
      console.error(error)
    }
    }


  return {
    users,
    loading,
    fetchaddSchool
  }
}

export default useSchoolAdd