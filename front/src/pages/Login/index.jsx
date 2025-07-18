import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const index = () => {
  const [show, setShow] = React.useState(false)

  const { loginFetch, error, loading } = useLogin()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    loginFetch(email, password)
  }
  return (
    <LoginContent>
       <LoginBody>
        <LoginForm>
            <h3>Вход</h3>
            <Form onSubmit={handleLogin}>
                <FormItem className='form-item'>
                    <label htmlFor="email">Логин</label>
                    <input 
                        type="text"
                        id='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />   
                </FormItem>
                <FormItem className='form-item input-password'>
                    <label htmlFor="password">Пароль</label>
                    <input 
                        type={show ? 'text' : 'password'}
                        id='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                    <div className="input-item-config">
                        { 
                          show ? (
                            <button type='button' className='eye' onClick={() => setShow(!show)}>
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                </svg>
                            </div>
                        </button>
                          ):(
                            <button type='button' onClick={() => setShow(!show)}>
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                                </svg>
                            </div>
                        </button>
                          )
                        }
                    </div>
                </FormItem>
                <Checkbox>
                    <input type="checkbox" id='remember' />
                    <label htmlFor="remember">Запомнить меня</label>
                </Checkbox>
                <Button type='submit'>Войти</Button>
                <Link to='/'>Войти</Link>
            </Form>
        </LoginForm>
       </LoginBody>
    </LoginContent>
  )
}

const LoginContent = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const LoginBody = styled.div`
    width: 40%;
    height: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color: #1E2235;

    @media screen and (max-width: 768px) {
      width: 90%;
    }

    
`
const LoginForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    h3{
        text-align: center;
        color: #fff;
        margin-bottom: 20px;
        font-size: 24px;
    }
`
const Form = styled.form`
    width: 100%;
    height: 100%;
    .form-item{
        overflow: hidden;
        position: relative;
        margin-bottom: 10px;
        width: 100%;
        height: 78px;
        border-radius: 10px;
        background-color: #2D2F36;
    }
    .input-password{
        position: relative;
        z-index: 10;
    }
    .input-item-config{
        position: absolute;
        top: 30px;
        right: 10px;
    }
`
const FormItem = styled.div`
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
        background-color: transparent;
        color: #fff;
        margin-left: 10px;
    }
    input::placeholder{
        color: #fff;
    }
    
`
const Checkbox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const Button = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background-color: #2563EB;
    color: #fff;
    border: none;
    outline: none;
    margin-top: 20px;
    cursor: pointer;
    font-size: 16px;
`

export default index
