import React from 'react';
import './ContextMenu.css';

const ContextMenu = ({
  visible,
  x,
  y,
  type,
  onDeleteNode,
  onDeleteEdge,
  onToggleEdgeDirected,
  onMouseLeave
}) => {
  if (!visible) return null;

  return (
    <div className='context-menu' style={{ left: x, top: y }} onMouseLeave={onMouseLeave}>
      {type === 'node' && (
        <button onClick={onDeleteNode}>Deletar nó</button>
      )}
      {type === 'edge' && (
        <>
          <button onClick={onDeleteEdge}>Deletar aresta</button>
          <button onClick={onToggleEdgeDirected}>Alternar direcionamento (direcionada/não)</button>
        </>
      )}
    </div>
  );
};

export default ContextMenu;