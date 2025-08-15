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
import ContextMenu from '../ContextMenu/ContextMenu'

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
    loadGraphFromPath,
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
  
  function playAnimation() {
    intervalId = setInterval(async () => {
      const response = await fetch('http://localhost:5000/algoritmo/estado');
      const data = await response.json();
      loadGraphFromPath(data.graph);
      if (data.finished) {
        clearInterval(intervalId);
      }
    }, 1000);
  }

  return (
    <section className='container_body'>
      <div className='main_div_body'>
        <div className='left_side'>
            <ButtonContainer1 activeTab={activeTab} f1={loadGraphFromPath} f2={handleLoadGraph} f3={handleSaveGraph} f4={handleClearGraph}/>
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
                <AnimationControl onPlay={playAnimation} className='animation_control'/>
            </div>
        </div>
        <div className='right_side'>
          <ButtonContainer2 onTabChange={setActiveTab} activeTab={activeTab}/>
          <TextComponent routeName={routeName} activeTab={activeTab}/>
        </div>
      </div>
      <ContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        type={contextMenu.type}
        onDeleteNode={deleteNode}
        onDeleteEdge={deleteEdge}
        onToggleEdgeDirected={toggleEdgeDirected}
        onMouseLeave={hideContextMenu}
      />
    </section>
  )
}

export default Body
