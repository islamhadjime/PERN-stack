import React, { useState, useEffect } from 'react'
import schools from '../helpres/listSchool'
import { useStaticStore } from '../store/staticStore'
import { metchCalc } from '../helpres/metchCalc'

const useFilter = () => {
  const { staticList } = useStaticStore()
  
  const [minimum, setMinimum] = useState([])
  const [average, setAverage] = useState([])
  const [completed, setCompleted] = useState([])




  useEffect(() => {
    const minimum = staticList.filter(school => metchCalc(school.students, school.passedCount) < 70)
    const average = staticList.filter(school => metchCalc(school.students, school.passedCount) >= 70 && metchCalc(school.students, school.passedCount) < 90)
    const completed = staticList.filter(school => metchCalc(school.students, school.passedCount) >= 90)
    setMinimum(minimum)
    setAverage(average)
    setCompleted(completed)
  }, [staticList])



  return { minimum, average, completed }
}

export default useFilter
