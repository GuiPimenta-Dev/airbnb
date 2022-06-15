import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Page from './Page'
import FirstChart from './components/FirstChart'
import './App.css'

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ='/' element={<Page titlePage='capital'/>}/>
          <Route path ='/alphaville' element={<Page  titlePage='alphaville'/>}/>
          <Route path ='/test' element={<FirstChart/>}/>
          
        </Routes>
      </Router>
    </div>
  )
}

export default App
