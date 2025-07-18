import React, { useState } from 'react'
import styled from 'styled-components'

import ChartBar from '../../components/ChartBar'
import Filter from '../../components/Filter'
import Table from '../../components/Table'

import { color } from '../../helpres/colorStyle'

import { useStaticStore } from '../../store/staticStore'

const clacSum = (list) => {
  const sum = list.reduce((acc, item) => acc + item, 0)
  return sum
}


const Home = () => {
  const { staticList } = useStaticStore()
  const [stent, setStent] = useState([])
  const [pass, setPass] = useState([])
  React.useEffect(() => {
    setStent(clacSum(staticList.map(item => item.students)))
    setPass(clacSum(staticList.map(item => item.passedCount)))
  }, [staticList])
  

  return (
    <HomeContainer>
      <Top>
        <Item>
          <p>Названия ОО</p>
          <h4 style={{textAlign: 'center'}}>
          МЕЖДУНАРОДНЫЙ ТЕСТ
          </h4>
        </Item>
        <Item>
          <p>Количество учеников</p>
          <h3>{stent}</h3>
        </Item>
        <Item style={{backgroundColor: pass <= 24000 ? color.red : pass >= 25000 ? color.green : color.yellow}}>
          <p>Количество пройденных тестов</p>
          <h3>{pass}</h3>
        </Item>
      </Top>
      <ChartBar />
      <Filter />
      <Table />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1A1D2D;


  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
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
    text-align: center;
    font-size: 21px;
    font-weight: 500;
  
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }

`

export default Home
