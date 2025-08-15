import React from 'react'
import './TextComponent.css'
import PseudocodeComponent from './PseudocodeComponent/PseudocodeComponent'
import ExplanationComponent from './ExplanationComponent/ExplanationComponent'

const TextComponent = ({ routeName, activeTab, step}) => {
  return (
    <div className={`code_body_container${activeTab === 'pseudocode' ? '' : '-explicacao'}`}>
      <div className='code_body_border'>
        {activeTab === 'pseudocode' && <PseudocodeComponent routeName={routeName} step={step}/>}
        {activeTab === 'explanation' && <ExplanationComponent routeName={routeName} />}
      </div>
    </div>
  )
}

export default TextComponent
