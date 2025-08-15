import React, { useState } from 'react';
import './AnimationControl.css';

const AnimationControl = ({ onPlay}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
    if (!isPlaying && onPlay) onPlay();
  };

  return (
    <div className='animation_control_container'>
      <button
        className={`animation_control_button${isPlaying ? '-clicked' : ''}`}
        onClick={handlePlayPause}
      >
        <img
          className='animation_control_icon'
          src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
          alt={isPlaying ? 'pause' : 'play'}
        />
      </button>
      <button className='animation_control_button'>
        <img className='animation_control_icon' src="/icons/next.svg" alt='next'/>
      </button>
      <button className='animation_control_button'>
        <img className='animation_control_icon' src="/icons/restart.svg" alt='restart'/>
      </button>
    </div>
  );
};

export default AnimationControl;