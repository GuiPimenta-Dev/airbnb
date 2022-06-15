import React from 'react'
import '../styles/PriceCard.css'
import {CurrencyCircleDollar} from 'phosphor-react'


export function PriceCard({render, color, text, price, day}) {
  return (
    <div className='priceCard'>
        <label>{text}</label>
        <div className='cardSection'>
            <span className='priceSign'>R$</span>

            
              <div className='priceDaySection'>
                <span className='price' style= {{color: `${color}`}}>{render ? price : '0.00'}</span>
                <span className='priceDay'>{render ? day : '---'}</span>
              </div>
        </div>
        <div>
            <p> <CurrencyCircleDollar size={70} weight="fill" color={color} /> </p>
        </div>
        </div>
  )
}
