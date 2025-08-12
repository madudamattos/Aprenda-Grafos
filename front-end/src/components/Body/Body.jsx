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
    canvasRef,
    handleCanvasDoubleClick,
    handleNodeClick,
    handleNodeDoubleClick,
    handleClearGraph,
    handleSaveGraph,
    handleLoadGraph,
    renderEdges,
    getNodeCount,
    getEdgeCount
  } = useGraphManager();

  const routeName = location.pathname.replace('/', '');
  
  const [activeTab, setActiveTab] = React.useState('pseudocode'); // 'pseudocode' ou 'explanation'
  
  return (
    <section className='container_body'>
      <div className='main_div_body'>
        <div className='left_side'>
            <ButtonContainer1 f1={handleLoadGraph} f2={handleSaveGraph} f3={handleClearGraph}/>
            <div className='canvas_body'>
                <div className='canva' ref={canvasRef} onDoubleClick={handleCanvasDoubleClick}>
                  {renderEdges()}
                  {nodes.map(node => ( 
                    <GraphNode
                      key={node.id}
                      id={node.id}
                      x={node.x}
                      y={node.y}
                      onClick={handleNodeClick}
                      onDoubleClick={handleNodeDoubleClick}
                      isSelected={selectedNode === node.id}
                    />
                  ))}
                </div>
                <Tooltip infoText="ola eu sou um infotext">
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
    </section>
  )
}

export default Body
