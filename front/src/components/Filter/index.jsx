import React from 'react'
import './style.css'
import useFilter from '../../hooks/useFilter'
import { color } from '../../helpres/colorStyle'
import { metchCalc } from '../../helpres/metchCalc'


const dinamikWidht = (number,color) =>{
  const dinamic = document.querySelectorAll(`.item-chart-content-item-${number} li`)
  dinamic.forEach((item, index) => {
    const bar = item.querySelector(`.item-chart-content-item-list-item-1-progress-bar`)
    const count = item.querySelector('.item-chart-content-item-lis-top span').textContent || '1%'
    bar.style.width = count
    bar.style.backgroundColor = color
  })
}

const index = () => {
  const { minimum, average, completed } = useFilter()
  

  React.useEffect(() => {
    dinamikWidht(1,color.green)
    dinamikWidht(2,color.yellow)
    dinamikWidht(3,color.red)
  }, [minimum, average, completed])

  return (
    <div className='filter home-content'>
      <h4 className='filter--title'>Графики</h4>
      <div className='filter-content'>
        <div className='item-chart-content-item item-chart-content-item-1'>
          <p className='--top-title'>Выполнение требований:<span>{completed.length}</span></p>
          <ul className='item-chart-content-item-list'>
            {completed.map((item, index) => (
              <li key={index}>
                <div className='item-chart-content-item-lis-top'>
                  <p>{item.schoolName}</p>
                  <span>{metchCalc(item.students, item.passedCount)}%</span>
                </div>
                <div className='item-chart-content-item-list-item-1-progress'>
                  <div className='item-chart-content-item-list-item-1-progress-bar'></div>
                 </div>
              </li> 
            ))}
          </ul>
        </div>
        <div className='item-chart-content-item item-chart-content-item-2'>
          <p className='--top-title'>Выполнение требований:<span>{average.length}</span></p>
          <ul className='item-chart-content-item-list'>
           {average.map((item, index) => (
            <li key={index}>
              <div className='item-chart-content-item-lis-top'>
              <p>{item.schoolName}</p>
              <span>{metchCalc(item.students, item.passedCount)}%</span>
              </div>
              <div className='item-chart-content-item-list-item-1-progress'>
                <div className={`item-chart-content-item-list-item-1-progress-bar`}></div>
              </div>
            </li>
          ))}
          </ul>
        </div>
        <div className='item-chart-content-item item-chart-content-item-3'>
          <p className='--top-title'>Выполнение требований:<span>{minimum.length}</span></p>
          <ul className='item-chart-content-item-list'>
            {minimum.map((item, index) => (
              <li key={index}>
                <div className='item-chart-content-item-lis-top'>
                <p>{item.schoolName}</p>
                <span>{metchCalc(item.students, item.passedCount)}%</span>
              </div>
              <div className='item-chart-content-item-list-item-1-progress'>
                <div className='item-chart-content-item-list-item-1-progress-bar'></div>
              </div>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


export default index
