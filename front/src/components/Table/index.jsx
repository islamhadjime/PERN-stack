import React, { useRef } from 'react'
import './style.css'
import  schools  from '../../helpres/listSchool'
import { currentScroll } from '../../helpres/currentScroll'
import { color } from '../../helpres/colorStyle'
import { useStaticStore } from '../../store/staticStore'
import { metchCalc } from '../../helpres/metchCalc'

const dinamikWidht = () =>{
  const dinamic = document.querySelectorAll('tr')
  dinamic.forEach((item, index) => {
    const count = item.querySelector('.table-content-bottom-item')
    if (count){
      if(count.textContent.split('%')[0] <= 70){
        item.style.backgroundColor = color.red
      }
      if(count.textContent.split('%')[0] >= 90){
        item.style.backgroundColor = color.green
      }
      if(count.textContent.split('%')[0] > 70 && count.textContent.split('%')[0] < 90){
        item.style.backgroundColor = color.yellow
      }
    }

  })
}


const index = () => {
  const { staticList } = useStaticStore()
  const allBottomItem = useRef(null)

  React.useEffect(() => {
    currentScroll(allBottomItem)
    if(staticList.length > 0){
      dinamikWidht()
    }
  }, [staticList])


  return (
    <div className='table-home home-content'>
    <div className='table-content-title'>
      <h3>Top 5</h3>
    </div>
    <div className='table-content'>
        <table className="table">
        <thead>
          <tr>
            <th className='table-content-top-number'>
              <p>№</p>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                </svg>
              </div>
            </th>
            <th className='table-content-top-name'>
              <p>Наименование</p>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                </svg>
              </div>
            </th>
            <th>
              <p>Количество учеников</p>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                </svg>
              </div>

            </th>
            <th>
              <p>Количество пройденных занятий</p>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                </svg>
              </div>
            </th>
            <th>
              <p>Итог</p>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody ref={allBottomItem}>
          {staticList.map((school, index) => (
          <tr key={school.id}>
            <td>{index + 1}</td>
            <td>{school.schoolName}</td>
            <td>{school.students}</td>
            <td>{school.passedCount}</td>
            <td className='table-content-bottom-item'>{metchCalc(school.students, school.passedCount)}%</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default index
