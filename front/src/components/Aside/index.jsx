import React from 'react'
import styled from 'styled-components'
import { Link,useLocation } from 'react-router-dom'
import Modal from '../Modal'

import FormPdf from '../FormModal/FormPdf'
import FormSchool from '../FormModal/FormSchool'
import FormUser from '../FormModal/FormUser'

import { useAuthStore } from '../../store/authStore'


const index = () => {
  const {pathname} = useLocation()

  const idURL = pathname.split('/')[2]
  
  const [modalPdf, setModalPdf] = React.useState(false)
  
  const [school, setSchool] = React.useState(false)
  const [users, setUsers] = React.useState(false)


  const { infog,loading,isAdmin } = useAuthStore()
  const [layout, setLayout] = React.useState({})

  React.useEffect(() => {
    if(!loading){
      setLayout(infog.schoolName)
    }
  }, [loading,infog])

  
  
  return (
    <Aside>
        <Top>
            <Link to='/' className='logo'>
                <div className="image">
                    <img src="https://static23.tgcnt.ru/posts/_0/e3/e37f48f933b824079c97dedcdafc4a26.jpg" alt="logo" />
                </div>
                <p>МУ "Отдел Образования Шалинского Муниципального района"
                </p>
            </Link>
            {
                isAdmin ? (
                    <div className='admin-school' style={{margin: '20px 0'}}>
                    <button className='admin-school--button' type='button' onClick={() => setSchool(true)}>
                        <span>Школу</span>
                    </button>
                    <button className='admin-school--button' type='button' onClick={() => setUsers(true)}>
                        <span>Пользователей</span>
                    </button>
                </div>
                ):(
                    <Button onClick={() => setModalPdf(true)}>
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"/>
                            </svg>
                        </div>
                        <span>Добавить файлы</span>
                    </Button>
                )
            
              
            }
          
            {
                modalPdf && (
                    <Modal open={modalPdf} onClose={() => setModalPdf(false)}>
                        <FormPdf />
                    </Modal>
                )
            }
            {
                school && (
                    <Modal open={school} onClose={() => setSchool(false)}>
                        <FormSchool onClose={setSchool}/>
                    </Modal>
                )
            }

            {
                users && (
                    <Modal open={users} onClose={() => setUsers(false)}>
                        <FormUser onClose={setUsers}/>
                    </Modal>
                )
            }
            <List>
                <li className={pathname === '/' ? 'active-link' : ''}>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-1x2" viewBox="0 0 16 16">
                            <path d="M6 1H1v14h5zm9 0h-5v5h5zm0 9v5h-5v-5zM0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm1 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z"/>
                        </svg>
                    </div>
                    <Link to='/'>Статистика</Link>
                </li>
                {
                        isAdmin ?  (
                            <ul>
                                {
                                    infog.schoolName.map((item,i)=>(
                                        <li className={idURL == item.id ? 'active-link' : ''} key={i}>
                                            <div className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"/>
                                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                                                </svg>
                                            </div>
                                            <Link to={`/school/${item.id}`}>{item.schoolName}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        ):(
                            <li className={pathname !== '/' ? 'active-link' : ''}>
                            <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"/>
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                            </svg>
                        </div>
                            <Link to={`/school/${layout.id}`}>{layout.schoolName}</Link>
                        </li>
                            
                        )
                    }

            </List>
        </Top>
        <Bottom>
            <ThemeToggle>
                <ThemeItem className='theme-active'>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
                        </svg>
                    </div>
                    <span>Dark</span>
                </ThemeItem>

                <ThemeItem>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-low" viewBox="0 0 16 16">
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8m.5-9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707M3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707"/>
                        </svg>
                    </div>
                    <span>Light</span>
                </ThemeItem>
            </ThemeToggle>
        </Bottom>
    </Aside>
  )
}

const Aside = styled.aside`
    overflow-y: scroll;
    width: 300px;
    height: 100vh;
    background-color: #1E2235;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #2E3248;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;

    .logo{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        p{
            font-size: 13px;
            color: #9CA3AF;
            text-align: center;
            font-weight: 700;
        }
        .image{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
        }
    }

    .icon{
        width: 21px;
        height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        svg{
            width: 100%;
            height: 100%;
        }
    }
    @media (max-width: 1024px) {
        width: 200px;
    }
    @media (max-width: 968px) {
        width: 150px;
    }
`
const Top = styled.div`
    .admin-school{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
        button{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 10px;
            border-radius: 5px;
            background-color: #595959;
        }
    }

`
const Button = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #2563EB;
    margin: 40px 0;

`
const List = styled.ul`
    li{
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        height: 45px;
        width: 100%;
        color: #908b8b;
        font-weight: 500;
        border-radius: 5px;
        a{
            color: #908b8b;
            font-weight: 700;
        }
    }
    .active-link{
        background-color: #252A41;
        border-bottom: 1px solid #2E3248;
        color: #fff;
        a{
            color: #fff;
        }
    }
    .logout{
        color: #ffffff;
        a{
            color: #ffffff;
        }
    }
`

const Bottom = styled.div`

  ul{
    margin-bottom: 20px;
  }

`
const ThemeToggle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: 2px solid #2E3248;
    color: #908b8b;
    font-weight: 500;
    .theme-active{
        background-color: #252A41;
        border-radius: 10px;
        color: #fff;
    }


`
const ThemeItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    cursor: pointer;
    gap: 10px;
`

export default index
