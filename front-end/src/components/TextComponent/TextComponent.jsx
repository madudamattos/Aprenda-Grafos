import React from 'react'
import './TextComponent.css'
import PseudocodeComponent from './PseudocodeComponent/PseudocodeComponent'

const TextComponent = ({routeName}) => {
  return (
    <div className='code_body_container'>
        <div className='code_body_border'>
            <PseudocodeComponent routeName={routeName}/>
        </div>
    </div>
  )
}

export default TextComponent
