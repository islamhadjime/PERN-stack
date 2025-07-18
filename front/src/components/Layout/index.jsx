import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Aside from '../Aside'
import Header from '../Header'
import { useAuthStore } from '../../store/authStore'

const index = () => {
  const { isAuth } = useAuthStore()
  React.useEffect(() => {
    const aside = document.querySelector('aside')
    const main = document.querySelector('main')
    if(!aside){
      main.style.width = '100%'
    }else{
      main.style.width = `calc(100% - ${aside.offsetWidth}px)`
    }
  }, [isAuth]);


  return (
    <>
      {isAuth && <Aside />}
      <Main>
        <Header />
        <div className='content'>
          <Outlet />
        </div>
        <a href="" className='profile'>
            <h3>Автор проекта</h3>
            <div className='profile__name'>
              <h5>Ислам Х.И</h5>
              <p>islam.hadj95@mail.ru</p>
            </div>
        </a>
      </Main>
    </>
  )
}
const Main = styled.main`
  width: calc(100% - 300px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;

  .profile{
    position: absolute;
    right:0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 10px 0 0 10px;
    background-color: rgba(30, 34, 53, 0.5);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 4px;
    h3{
      font-size: 7px;
      font-weight: bold;
      line-height: 10px;
      color: #fff;
    }

  }

  
  .profile__name{

    h5{
      font-size: 8px;
      font-weight: bold;
      color: #fff;
    }
    p{
      font-size: 5px;
      color: #9CA3AF;
    }
  }



`

export default index
