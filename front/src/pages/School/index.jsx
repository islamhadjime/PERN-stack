import React from 'react'
import styled from 'styled-components'
import useIdSchool from '../../hooks/useIdSchool'
import { useAuthStore } from '../../store/authStore'
import { useParams } from 'react-router-dom'
import useDelete from '../../hooks/useDelete'
import { useNavigate } from 'react-router-dom'

const passedList = (passed) => {
  const passedArray = passed.split(",");


  const obj = []
  for(let i = 0; i < passedArray.length; i++){
    obj.push({id: i, passed: passedArray[i]})
  }
  return obj
}

const index = () => {
  const { getSchool, school, loading } = useIdSchool()
  const [list, setList] = React.useState([])
  const {id } = useParams()
  const { fetchDelete } = useDelete()
  const navigate = useNavigate()

  const { isAdmin } = useAuthStore()
  




  const handleDelete = () => {
    fetchDelete(id)
    navigate('/')
    window.location.reload()
  }


  React.useEffect(() => {
    getSchool(id)
  }, [id])

  React.useEffect(() => {
    if(school){
      setList(passedList(school.passed))
    }
  },[school])

  

  if(loading) return <div>Loading...</div>
  if(!school) return <div>No data</div>
  return (
    <SchoolContainer>
      {
        isAdmin &&(
          <p className='delete' onClick={handleDelete}>
            Удалить
          </p>
        )
      }

      <Top>
        <Item>
          <p>Названия Школы</p>
          <h3>{school.schoolName}</h3>
        </Item>
        <Item>
          <p>Количество учеников</p>
          <h3>{school.students}</h3>
        </Item>
        <Item>
          <p>Количество пройденных тестов</p>
          <h3>{school.passedCount}</h3>
        </Item>
      </Top>

      <table className='table'>
        <thead>
          <tr>
            <th>№</th>
            <th>id</th>
          </tr>
        </thead>
        <tbody>
          {
           list.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.passed}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </SchoolContainer>
  )
}

const SchoolContainer = styled.div`

  position: relative;
  width: 100%;
  height: 100vh;
  padding: 20px;

  .table{
    width: 100%;
    color: #fff;
  }
  .delete{
    background: red;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    max-width: 100px;
    text-align: center;
    margin-bottom: 20px;
  }
`

const Top = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1A1D2D;
`
const Item = styled.div`
  width: 33%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #1E2235;
  margin-bottom: 20px;
  h3{
    font-size: 24px;
    font-weight: 500;
  
  }

`
export default index
