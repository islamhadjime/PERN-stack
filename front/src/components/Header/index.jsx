import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import useLogout from '../../hooks/useLogout'
import { useLocation } from 'react-router-dom'
const index = () => {
  const { isAuth, loading, infog } = useAuthStore()
  const { pathname } = useLocation()
  const { logout } = useLogout()

  const [isOpen, setIsOpen] = useState(false)
  const isMouse = useRef(false)
  

  const [name, setName] = useState('a')
  const [email, setEmail] = useState('a')

  React.useEffect(() => {
    if(!loading){
      setName(infog.user.name || '')
      setEmail(infog.user.email || '')
    }
  }, [infog])


  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }


  useEffect(() => {
    isMouse.current.addEventListener('mouseenter', () => {
      setIsOpen(true)
    })
    isMouse.current.addEventListener('mouseleave', () => {
      setIsOpen(false)
    })
  }, [])
  return (
    <Header>
        <Left>
            <Link to='/'>
            <h3>Мониторинг Урок Цифры
                <div className="icon" ref={isMouse}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question" viewBox="0 0 16 16">
                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                    </svg>
                </div>
            </h3>     
            </Link>
            <p>Данный сайт является мониторингом <br />для урока цифры
            </p>
            {
                isOpen && (
                    <div className='info-project'>
                        <h5>Урок Цифры</h5>
                <p>
                    Урок Цифры - это проект, который помогает учителям и ученикам лучше понять и усвоить материал.
                        </p>
                    </div>
                )
            }
        </Left>
        <Right>
            {
                isAuth ?(
                    <Profile>
                        <Image>
                            <img src="https://resizer.mail.ru/p/1b644c88-7f2c-5776-973e-dd5586fa84b3/AQAKa7YA4DK9_FCnOwnV-juTfO4ah_eMN9T6cl5CnjG0Gn9_ywACJi5lFpRJonCpIncMIwbP4koek-7E0_4IvdhthbM.png" alt="" />
                        </Image>
                        <Content>
                            <span>{name}</span>
                            <span>{email}</span>
                        </Content>
                        <div className='logout' onClick={handleLogout}>
                                <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                                    <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                                </svg>
                                </div>
                            <span>Выйти</span>   
                        </div>
                    </Profile>
                ):(
                    <LargestContentfulPaint>
                        <Link to='/login' className='login'>
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                                    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                </svg>
                            </div>
                            <span>Войти</span>   
                        </Link>
                    </LargestContentfulPaint>
                )
            }
        </Right>
    </Header>
  )
}
const Header = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    :before{
        content: '';
        width: 100%;
        height: 0.1px;
        background-color: rgba(156, 163, 175, 0.1);
        position: absolute;
        bottom: -10px;
        left: 0;
    }

`
const Left = styled.div`
    position: relative;
    width: 100%;


    @media screen and (max-width: 768px) {

        h3{
            font-size: 14px;
        }
        .info-project{
            left: 0px;
        }
    }
    .info-project{
        position: absolute;
        top: 0;
        left: 350px;
        z-index: 100;
        width: 250px;
        height: auto;
        border-radius: 10px;
        background-color: #1E2235;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        h5{
            font-size: 18px;
            font-weight: bold;
            color: #fff;
        }
        p{
            font-size: 14px;
            color: #9CA3AF;
        }
    }
    .info-project::before{
        border:none !important;
        top: -10px;
        left: 10px;
    }
    h3{
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        display: flex;
        align-items: center;
        gap: 10px;
        .icon{
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #1E2235;
            padding: 5px;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            svg{
                width: 25px;
                height: 25px;
            }
        }
        .icon:hover{
            background-color: #2E3348;
            transition: all 0.3s ease;
            transform: scale(1.15);
        }
    }
    p{
        color: #9CA3AF;
    }
`
const Right = styled.div`
    width: 100%;
`
const Profile = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 25px;
    .icon{
        width: 20px;
        height: 20px;
    }
    .logout{
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        color: #fff;
        font-size: 14px;
        border: 1px solid #9CA3AF;
        padding: 10px 20px;
        border-radius: 10px;
        font-weight: bold;
    }

`

const Image = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
`
const Content = styled.div`
    display: flex;
    flex-direction: column;

    span:nth-child(1){
        font-size: 16px;
        font-weight: bold;
    }
    span:nth-child(2){
        font-size: 14px;
        color: #9CA3AF;
    }

`
const LargestContentfulPaint = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .login{
        border: 1px solid #9CA3AF;
        padding: 10px 20px;
        border-radius: 10px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        color: #fff;
        .icon{
            width: 20px;
            height: 20px;
        }
    }
    .login:hover{
        background-color: #1E2235;
        color: #fff;
    }
`

export default index
