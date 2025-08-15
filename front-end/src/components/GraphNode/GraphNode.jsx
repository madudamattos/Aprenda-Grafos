import React from 'react'
import './GraphNode.css'
import { NodeState } from '../../utils/Graph';

const GraphNode = ({ id, x, y, weight, state = NodeState.DEFAULT, onClick, onDoubleClick, onMouseDown, onContextMenu, isEditing = false, onCommitWeight, onCancelEdit }) => {
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

  // Define a classe do nó de acordo com o estado
  const stateClass = Object.values(NodeState).includes(state) && state !== NodeState.DEFAULT ? state : '';
  const className = `graph-node${stateClass ? ' ' + stateClass : ''}`;

  return (
    <div 
      className={className}
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
