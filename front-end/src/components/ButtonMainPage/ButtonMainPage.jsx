import React from 'react'

const ButtonMainPage = ({ children, id = '' }) => {
  return (
    <div>
        <button className='button_main_page' id={id}>{children}</button>
    </div>
  )
}

export default ButtonMainPage