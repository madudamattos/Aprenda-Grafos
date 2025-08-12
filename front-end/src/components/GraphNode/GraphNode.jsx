import React from 'react'
import './GraphNode.css'

const GraphNode = ({ id, x, y, weight, onClick, onDoubleClick, onMouseDown, onContextMenu, isSelected = false, isEditing = false, onCommitWeight, onCancelEdit }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick(id);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (onDoubleClick) onDoubleClick(id);
  };

  const handleMouseDown = (e) => {
    if (isEditing) return; // não pode arrastar enquanto edita 
    if (onMouseDown) onMouseDown(id, e);
  };

  const handleContextMenu = (e) => {
    if (onContextMenu) onContextMenu(id, e);
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
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
    >
      {isEditing ? (
        <input
          className="node-weight-input"
          autoFocus
          defaultValue={weight ?? ''}
          onBlur={(ev) => onCommitWeight && onCommitWeight(id, ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter' && onCommitWeight) onCommitWeight(id, ev.currentTarget.value);
            if (ev.key === 'Escape' && onCancelEdit) onCancelEdit();
          }}
        />
      ) : (
        weight != null && (
          <span className="node-weight-label" onDoubleClick={handleDoubleClick}>{weight}</span>
        )
      )}
      <span className="node-number">{id}</span>
    </div>
  )
}

export default GraphNode
