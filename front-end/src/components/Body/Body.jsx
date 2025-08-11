import React from 'react'
import './Body.css'
import '../ButtonMainPage/ButtonMainPage.css'
import ButtonMainPage from '../ButtonMainPage/ButtonMainPage'
import AnimationControl from '../AnimationControl/AnimationControl'
import ButtonHelp from '../ButtonHelp/ButtonHelp'
import GraphNode from '../GraphNode/GraphNode'
import { useGraphManager } from '../../hooks/GraphManager'
import Tooltip from '../Tooltip/Tooltip'

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

  return (
    <section className='container_body'>
      <div className='main_div_body'>
        <div className='left_side'>
            <div className='button_container_1'>
              <ButtonMainPage>
                <img className='button_icon' src="/src/assets/icons/list.svg" alt="Lista"/>
                Grafo
              </ButtonMainPage>
              <ButtonMainPage onClick={handleLoadGraph}>
                <img className='button_icon' src="/src/assets/icons/upload.svg" alt="Subir"/>
                Carregar
              </ButtonMainPage>
              <ButtonMainPage onClick={handleSaveGraph}>
                <img className='button_icon' src="/src/assets/icons/save.svg" alt="Salvar"/>
                Salvar
              </ButtonMainPage>
              <ButtonMainPage onClick={handleClearGraph}>
                <img className='button_icon' src="/src/assets/icons/clear2.svg" alt="Limpar"/>
                Limpar
              </ButtonMainPage>
            </div>
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
          <div className='button_container_2'>
            <div className='button_mini_container_1'>
              <ButtonMainPage>Pseudocódigo</ButtonMainPage>
            </div>
            <div className='button_mini_container_2'>
              <ButtonMainPage id='right_button_2'>Explicação</ButtonMainPage>
            </div>
          </div>
          <div className='code_body_container'>
            <div className='code_body_border'>
              <h2 className='code_body_title'>Informações do Grafo</h2>
              <br/>
              <div className='code_body_text'>
                <p><strong>Nós:</strong> {getNodeCount()}</p>
                <p><strong>Arestas:</strong> {getEdgeCount()}</p>
                <p><strong>Nó selecionado:</strong> {selectedNode || 'Nenhum'}</p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Body
