import React from 'react';
import './AnimationControl.css';

const AnimationControl = ({ 
  onPlay, 
  onNext, 
  onRestart, 
  isPlaying 
}) => {
  return (
    <div className='animation_control_container'>
      <button
        className={`animation_control_button${isPlaying ? '-clicked' : ''}`}
        onClick={onPlay}
      >
        <img
          className='animation_control_icon'
          src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
          alt={isPlaying ? 'pause' : 'play'}
        />
      </button>
      <button 
        className='animation_control_button'
        onClick={onNext}
      >
        <img className='animation_control_icon' src="/icons/next.svg" alt='next'/>
      </button>
      <button 
        className='animation_control_button'
        onClick={onRestart}
      >
        <img className='animation_control_icon' src="/icons/restart.svg" alt='restart'/>
      </button>
    </div>
  );
};

export default AnimationControl;