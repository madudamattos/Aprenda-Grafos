import React from 'react'

const ButtonMainPage = ({ children, id = '' , img = ''}) => {
  return (
    <div>
        <button className='button_main_page' id={id}>{img}{children}</button>
    </div>
  )
}

export default ButtonMainPage