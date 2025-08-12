import React from 'react'
import './Body.css'
import '../ButtonMainPage/ButtonMainPage.css'
import AnimationControl from '../AnimationControl/AnimationControl'
import ButtonHelp from '../ButtonHelp/ButtonHelp'
import GraphNode from '../GraphNode/GraphNode'
import { useGraphManager } from '../../hooks/GraphManager'
import Tooltip from '../Tooltip/Tooltip'
import ButtonContainer2 from '../ButtonContainer2/ButtonContainer2'
import ButtonContainer1 from '../ButtonContainer1/ButtonContainer1'
import { useLocation } from 'react-router-dom';
import TextComponent from '../TextComponent/TextComponent'

const Body = () => {
  const {
    nodes,
    selectedNode,
    contextMenu,
    editingNodeId,
    editingEdgeId,
    canvasRef,
    handleCanvasDoubleClick,
    handleNodeClick,
    handleNodeDoubleClick,
    handleNodeMouseDown,
    handleNodeContextMenu,
    handleClearGraph,
    handleSaveGraph,
    handleLoadGraph,
    renderEdges,
    hideContextMenu,
    deleteNode,
    deleteEdge,
    toggleEdgeDirected,
    startEditNodeWeight,
    commitNodeWeight,
    cancelEditNodeWeight,
    getNodeCount,
    getEdgeCount
  } = useGraphManager();

  const location = useLocation();
  const routeName = location.pathname.replace('/', '');
  
  const [activeTab, setActiveTab] = React.useState('pseudocode'); // 'pseudocode' ou 'explanation'
  
  return (
    <section className='container_body'>
      <div className='main_div_body'>
        <div className='left_side'>
            <ButtonContainer1 activeTab={activeTab} f1={handleLoadGraph} f2={handleSaveGraph} f3={handleClearGraph}/>
            <div className='canvas_body'>
                <div className='canva' ref={canvasRef} onDoubleClick={handleCanvasDoubleClick} onContextMenu={(e) => { e.preventDefault(); hideContextMenu(); }}>
                  {renderEdges()}
                  {nodes.map(node => ( 
                    <GraphNode
                      key={node.id}
                      id={node.id}
                      x={node.x}
                      y={node.y}
                      weight={node.weight}
                      onClick={handleNodeClick}
                      onDoubleClick={handleNodeDoubleClick}
                      onMouseDown={handleNodeMouseDown}
                      onContextMenu={handleNodeContextMenu}
                      isEditing={editingNodeId === node.id}
                      onCommitWeight={commitNodeWeight}
                      onCancelEdit={cancelEditNodeWeight}
                      isSelected={selectedNode === node.id}
                    />
                  ))}
                </div>
                <Tooltip>
                  <ButtonHelp className='button_help'></ButtonHelp>
                </Tooltip>
                <AnimationControl className='animation_control'/>
            </div>
        </div>
        <div className='right_side'>
          <ButtonContainer2 onTabChange={setActiveTab} activeTab={activeTab}/>
          <TextComponent routeName={routeName} activeTab={activeTab}/>
        </div>
      </div>
      {contextMenu.visible && (
        <div className='context-menu' style={{ left: contextMenu.x, top: contextMenu.y }} onMouseLeave={hideContextMenu}>
          {contextMenu.type === 'node' && (
            <>
              <button onClick={deleteNode}>Deletar nó</button>
              <button onClick={() => startEditNodeWeight(contextMenu.targetId)}>Editar peso do nó</button>
            </>
          )}
          {contextMenu.type === 'edge' && (
            <>
              <button onClick={deleteEdge}>Deletar aresta</button>
              <button onClick={toggleEdgeDirected}>Alternar direção (direcionada/não)</button>
            </>
          )}
        </div>
      )}
    </section>
  )
}

export default Body
