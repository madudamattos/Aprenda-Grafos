import React from 'react'
import { useState } from 'react';
import './Tooltip.css'

const Tooltip = ({children}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
    <div className = "tooltip-container"
        onMouseEnter = {() => setShowTooltip(true)}
        onMouseLeave = {() => setShowTooltip(false)}
    >
        {children}
        <div className ={`tooltip${showTooltip ? "-open" : ""}`}>
            <p><strong>INSTRUÇÕES:</strong></p>
            <br/>
            <ul>
                <li>Duplo clique no canvas: criar nó</li>
                <li>Clique em um nó: selecionar</li>
                <li>Clique em outro nó: conectar nós</li>
                <li>Clique e segure em um nó: mover o nó pelo canva</li>
                <li>Duplo clique em um nó ou aresta: editar peso</li>
                <li>Clique com botão direito do mouse sobre nó ou aresta: abrir menu de opções (para remover ou editar nó/aresta)</li>
            </ul>
        </div>
    </div>
  )
}

export default Tooltip