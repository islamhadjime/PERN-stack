import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import useSchoolAdd from '../../hooks/useSchoolAdd'
const FormSchool = ({onClose}) => {

  const [schoolName, setSchoolName] = React.useState('')
  const [students, setStudents] = React.useState('')
  const [idUser, setIdUser] = React.useState('')

  const { fetchaddSchool,users,loading } = useSchoolAdd()


  const handleSubmit = (e) => {
    e.preventDefault()
    if(!schoolName || !students || !idUser){
      toast.error('Заполните все поля')
      return
    }
    fetchaddSchool({schoolName, students,idUser})
    onClose(false)
  }


  return (
    <Container>
      <h1>Добавление Школу</h1>
      <Form>
          <Group>
            <Label>Название Школы</Label>
            <Input type="text" placeholder="Название школы " value={schoolName} onChange={(e) => setSchoolName(e.target.value)}/>
          </Group>
          <Group>
            <Label>Количество учеников</Label>
            <Input type="text" placeholder="Количество учеников школе"  value={students} onChange={(e) => setStudents(e.target.value)}/>
          </Group>
          <Group>
            <Label>Администратор школы</Label>
             <Items>
                {
                  <select
                    value={idUser}
                    onChange={(e) => setIdUser(e.target.value)}
                    placeholder="Выбрать пользователя"
                    style={{
                      width: '100%',
                      height: '40px',
                      border: 'none',
                      outline: 'none',
                      borderRadius: '10px',
                      backgroundColor: '#252A41',
                      color: '#fff',
                      fontSize: '16px',
                      padding: '10px',
                    }}
                  >
                    <option disabled>Выбрать пользователя</option>
                    {
                      users.map(user => (
                        <>
                            <option key={user.id} value={user.id}>{user.name}</option>
                        </>
                      ))
                    }
                  </select>
                }
             </Items>
          </Group>
          <button type='submit' onClick={handleSubmit}>
            Добавить Школу
          </button>

      </Form>
    </Container>
  )
}
const Items = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  label{
    color: #fff;
    font-size: 16px;
    margin-left: 10px;
    margin-top: 10px;
  }
  input{
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 10px;
    background-color: #252A41;
    color: #fff;
    font-size: 16px;
    padding: 10px;
  }
`
const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  label{
    color: #fff;
    font-size: 16px;
    margin-left: 10px;
    margin-top: 10px;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  button{
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 10px;
    background-color: #2563EB;
    color: #fff;
    font-size: 16px;
    padding: 10px;
  }
`
const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  label{
    color: #fff;
    font-size: 16px;
    margin-left: 10px;
    margin-top: 10px;
  }
  input{
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 10px;
    background-color: #252A41;
    color: #fff;
    font-size: 16px;
    padding: 10px;
  }
    select{
        width: 100%;
        height: 40px;
        border: none;
        outline: none;
        border-radius: 10px;
        background-color: #252A41;
        color: #fff;
        font-size: 16px;
        padding: 10px;
    }
`
const Label = styled.label`
  color: #fff;
  font-size: 16px;
  margin-left: 10px;
  margin-top: 10px;
`
const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #252A41;
  color: #fff;
  font-size: 16px;
  padding: 10px;
`


export default FormSchool
