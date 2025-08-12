import React from 'react'

const ButtonMainPage = ({ children, id = '', img = '', onClick, disabled}) => {
  return (
    <div>
        <button className={`button_main_page${disabled ? '' : '-disabled'}`} id={id} onClick={onClick}>{img}{children}</button>
    </div>
  )
}

export default ButtonMainPage