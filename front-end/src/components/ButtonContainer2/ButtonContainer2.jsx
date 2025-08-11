import React, {useState} from 'react'
import ButtonMainPage from '../ButtonMainPage/ButtonMainPage'
import './ButtonContainer2.css'

const ButtonContainer2 = ({ name_1, name_2 }) => {
    const [isButton1Clicked, setIsButton1Clicked] = useState(true);
    const [isButton2Clicked, setIsButton2Clicked] = useState(false);

    const handleButton1Click = () => {
        setIsButton1Clicked(true);
        setIsButton2Clicked(false);
    }

    const handleButton2Click = () => {
        setIsButton1Clicked(false);
        setIsButton2Clicked(true);
    }

    return (
    <div className='button_container_2'>
        <button
            className={`button_2${isButton1Clicked ? ' activated' : ''}`}
            onClick={handleButton1Click}
        >
            {name_1}
        </button>
        <button
            className={`button_2${isButton2Clicked ? ' activated' : ''}`}
            onClick={handleButton2Click}
        >
            {name_2}
        </button>
    </div>
  )
}

export default ButtonContainer2
