import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {CaretLeft, CaretRight}  from 'phosphor-react'
import  chart1 from './imgs/chartTest.png'
import  chartNone from './imgs/chartTestNone.png'
import capMap from './imgs/capMap.png'
import alpMap from './imgs/alpMap.png'
import chartGlobalNone from './imgs/chartGlobalNone.png'
import chartGlobal from './imgs/chartGlobal.png'
import {PriceCard} from './components/PriceCard'
import {GradeCard} from './components/GradeCard'
import './styles/Page.css'
import FirstChart from './components/FirstChart'
import Aos from 'aos'
import 'aos/dist/aos.css'


import data from './data.json'
import { SecondChart } from './components/SecondChart'


export default function Page({titlePage}) { 
    
    
    useEffect(() =>{
        Aos.init({duration: 1000})
    }, [])
    
    const render = data.boolRender
    

    const capChart = [data.capital.min_price, 300, 350, 370, 412, data.capital.prices_avg, 450, 300, 512, 412, 450,data.capital.max_price ]
    const capChart2 = [20, 40, 35, 37, 41, 45, 60,35, 37, 41, 45, 60 ]
    const alpChart = [data.alphaville.min_price, 500, 450, 300, 512,data.alphaville.prices_avg,  450, 300, 512, 370, 412, 450, data.alphaville.max_price  ]
    const alpChart2 = [28, 50, 45, 30, 51, 65, 55, 35, 37, 41, 45, 60 ]

  return (
      <>
     
    <div className='pageSection'>
        <section className='titleSection'>

        <div>
            <Link to='/'>
                <CaretLeft size={32} weight="fill" color='black'/>
            </Link>
            <h1>{titlePage}</h1>
            <Link to='/alphaville'>
                <CaretRight size={32} weight="fill" color='black'/>
            </Link>
        </div>

        </section>

        <section className='priceSection'>
            <div className="firstChartSection">
                
                   
                <FirstChart datas={titlePage == 'capital' ? capChart : alpChart} render= {render}/>
            </div>
            <div className='priceCardSection'>
                <PriceCard color= '#37B64B' text='Preço médio' price={data[titlePage].prices_avg} day={titlePage == 'capital' ? 'Terça-feira' : 'Quinta-feira'} render={render}/>                
                <PriceCard color='#379FB6' text='Preço máximo' price={data[titlePage].max_price} day={titlePage == 'capital' ? 'Sábado' : 'Sexta-feira'} render={render}/>
                <PriceCard color='#F95C5C' text='Preço mínimo' price={data[titlePage].min_price} day={titlePage == 'capital' ? 'Terça-feira' : 'Domingo'} render={render}/>
                
            </div>

        </section>

        <section className='gradeSection'>
            <GradeCard grade={data[titlePage].grade_avg} text='Nota média' color='#2ED8B6' render = {render}/>
            <GradeCard grade={data[titlePage].max_grades} text='Nota máxima' color='#4099FF' render = {render}/>
            <GradeCard grade={data[titlePage].min_grade} text='Nota mínima' color='#FF5370' render = {render}/>
            
        </section>

        <div className='lastSection'>


        
            <div className="lastChart" data-aos="fade-up">
                <SecondChart datas={titlePage == 'capital' ? capChart2 : alpChart2} render = {render}/>
                <SecondChart datas={titlePage == 'capital' ? capChart2 : alpChart2} render = {render}/>
            </div>
            
        
            <img data-aos="fade-up" src={titlePage == 'capital' ? capMap : alpMap} alt=""  className='cityMap' />

        </div>
    </div>
    
    </>
  )
}
