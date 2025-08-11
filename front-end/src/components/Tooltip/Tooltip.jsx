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
        <div className ={`tooltip ${showTooltip ? "open" : ""}`}>
            <p className = "tooltip-titulo"><strong>INSTRUÇÕES:</strong></p>
            <br/>
            <ul>
                <li>Duplo clique no canvas: Criar nó</li>
                <li>Clique em um nó: Selecionar</li>
                <li>Clique em outro nó: Conectar nós</li>
                <li>Clique e segure em um nó: Mover o nó pelo canva</li>
                <li>Duplo clique em um nó: Remover nó</li>
            </ul>
        </div>
    </div>
  )
}

export default Tooltip