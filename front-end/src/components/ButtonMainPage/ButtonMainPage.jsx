import React from 'react'

const ButtonMainPage = ({ children, id = '', img = '', onClick }) => {
  return (
    <div>
        <button className='button_main_page' id={id} onClick={onClick}>{img}{children}</button>
    </div>
  )
}

export default ButtonMainPage