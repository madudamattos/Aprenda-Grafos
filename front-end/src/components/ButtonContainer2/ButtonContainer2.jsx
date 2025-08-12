import React, {useState} from 'react'
import ButtonMainPage from '../ButtonMainPage/ButtonMainPage'
import './ButtonContainer2.css'

const ButtonContainer2 = ({onTabChange, activeTab}) => {
    return (
        <div className='button_container_2'>
            <button
                className={`button_2${activeTab === 'pseudocode' ? ' activated' : ''}`}
                onClick={() => onTabChange('pseudocode')}
            >
                Pseudocódigo
            </button>
            <button
                className={`button_2${activeTab === 'explanation' ? ' activated' : ''}`}
                onClick={() => onTabChange('explanation')}
            >
                Explicação
            </button>
        </div>
  )
}

export default ButtonContainer2
