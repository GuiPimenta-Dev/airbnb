import React from 'react'
import '../styles/gradeCard.css'

export function GradeCard({text,grade,percentual,color,render}) {
  const percentualProgress = grade/5 * 100
  const myStyle = {
    width : `${render ? percentualProgress : 0}%`,
    backgroundColor : `${color}`
  }
  return (
   
    <div className='gradeCard'>
        <label>{text}</label>
        
        <div className="gradeCardSection">
          <span className='grade'>{render? grade : '0'}/5.0</span>
          <div className='progressBar'>
            <div className='progressBarContent' style={myStyle}></div>
          </div>
        </div>
    </div>
  )
}
