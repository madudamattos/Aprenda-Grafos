import React from 'react'
import './GraphNode.css'

const GraphNode = ({ id, x, y, onClick, onDoubleClick, isSelected = false }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick(id);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (onDoubleClick) onDoubleClick(id);
  };

  return (
    <div 
      className={`graph-node ${isSelected ? 'selected' : ''}`}
      style={{
        left: `${x}px`,
        top: `${y}px`
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <span className="node-number">{id}</span>
    </div>
  )
}

export default GraphNode
