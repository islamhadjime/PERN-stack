import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import useRegister from '../../hooks/useRegister'



const FormUser = ({onClose}) => {

  const { fetchRegister } = useRegister()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    if( !email || !password || !name){
      toast.error('Заполните все поля')
      return
    }
    fetchRegister(name,email, password)
    onClose(false)
  }

  return (
    <Container>
      <h1>Добавление пользователя</h1>
      <Form>
          <Group>
            <Label>имя</Label>
            <Input type="text" placeholder="Имя"  value={name} onChange={(e) => setName(e.target.value)}/>
          </Group>
          <Group>
            <Label>email</Label>
            <Input type="text" placeholder="Имя"  value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Group>
          <Group>
            <Label>пароль</Label>
            <Input type="text" placeholder="Имя" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Group>
          <button type='submit' onClick={handleSubmit}>Добавить</button>
      </Form>
    </Container>
  )
}

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


export default FormUser
