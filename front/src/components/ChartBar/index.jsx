import React, { useRef } from 'react'
import './style.css'

import { currentScroll } from '../../helpres/currentScroll'
import { color } from '../../helpres/colorStyle'
import { useStaticStore } from '../../store/staticStore'
import { metchCalc } from '../../helpres/metchCalc'

const dinamikWidhtBar = () =>{
  const dinamic = document.querySelectorAll('.bar-chart-content-bottom-item')
  dinamic.forEach((item, index) => {
    const line = item.querySelector('.bar-chart-content-bottom-item-bar-line')
    const count = item.querySelector('span').textContent
    line.style.height = count 
    if(count.split('%')[0] <= 70){
      line.style.backgroundColor = color.red
    }
    if(count.split('%')[0] >= 90){
      line.style.backgroundColor = color.green
    }
    if(count.split('%')[0] > 70 && count.split('%')[0] < 90){
      line.style.backgroundColor = color.yellow
    }
  })
}




const index = () => {
  const { loading, staticList } = useStaticStore()
  
  const allBottomItem = useRef(null)

  React.useEffect(() => {
    dinamikWidhtBar()
    currentScroll(allBottomItem)
  }, [staticList])


  if(loading) return <div>Loading...</div>
  
  return (
    <div className='bar-chat home-content'>
      <h3 className='bar-chat--title'>Выполнение требований</h3>
      <div className='bar-chat-content'>
       <div className="bar-chart-content-bottom" ref={allBottomItem}>
          {staticList.map((school) => (
            <div className="bar-chart-content-bottom-item" key={school.id}>
              <div className="bar-chart-content-bottom-item-bar">
                <span>{metchCalc(school.students, school.passedCount)}%</span>
                <div className="bar-chart-content-bottom-item-bar-line "></div>
              </div>
              <p>{school.schoolName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default index
