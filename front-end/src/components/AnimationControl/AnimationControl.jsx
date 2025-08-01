import React from 'react'
import './AnimationControl.css'

const AnimationControl = () => {
  return (
    <>
    <div className='animation_control_container'>
      <button className='animation_control_button'><img className='animation_control_icon' src="/src/assets/icons/pause.svg" alt='pause'/></button>
      <button className='animation_control_button'><img className='animation_control_icon' src="/src/assets/icons/play.svg" alt='play'/></button>
      <button className='animation_control_button'><img className='animation_control_icon' src="/src/assets/icons/restart.svg" alt='restart'/></button>
    </div>
    </>
    
  )
}

export default AnimationControl