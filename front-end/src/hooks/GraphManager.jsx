import { useState, useRef } from 'react';
import Graph from '../utils/Graph';

export const useGraphManager = () => {
  console.log('useGraphManager hook initializing...'); // Debug log
  
  const [graph] = useState(() => new Graph());
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const canvasRef = useRef(null);

  console.log('useGraphManager hook initialized:', { graph, nodes, selectedNode }); // Debug log

  // Atualiza o estado dos nós quando o grafo muda
  const updateNodesState = () => {
    setNodes(graph.getAllNodes());
  };

  // Manipula o duplo clique no canvas
  const handleCanvasDoubleClick = (e) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Adiciona o novo nó
    const newNode = graph.addNode(x, y);
    updateNodesState();
    
    console.log(`Nó ${newNode.id} criado na posição (${x}, ${y})`);
  };

  // Manipula clique em um nó
  const handleNodeClick = (nodeId) => {
    if (selectedNode === null) {
      // Primeiro nó selecionado
      setSelectedNode(nodeId);
      console.log(`Nó ${nodeId} selecionado`);
    } else if (selectedNode === nodeId) {
      // Clica no mesmo nó - deseleciona
      setSelectedNode(null);
      console.log(`Nó ${nodeId} deselecionado`);
    } else {
      // Segundo nó selecionado - conecta os nós
      if (graph.connectNodes(selectedNode, nodeId)) {
        console.log(`Nós ${selectedNode} e ${nodeId} conectados`);
        updateNodesState();
      } else {
        console.log(`Falha ao conectar nós ${selectedNode} e ${nodeId}`);
      }
      setSelectedNode(null);
    }
  };

  // Manipula duplo clique em um nó (remove o nó)
  const handleNodeDoubleClick = (nodeId) => {
    if (graph.removeNode(nodeId)) {
      console.log(`Nó ${nodeId} removido`);
      updateNodesState();
      if (selectedNode === nodeId) {
        setSelectedNode(null);
      }
    }
  };

  // Limpa o grafo
  const handleClearGraph = () => {
    graph.clear();
    setNodes([]);
    setSelectedNode(null);
    console.log('Grafo limpo');
  };

  // Salva o grafo
  const handleSaveGraph = () => {
    const graphData = graph.exportToJSON();
    const dataStr = JSON.stringify(graphData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'grafo.json';
    link.click();
    
    console.log('Grafo salvo');
  };

  // Carrega o grafo
  const handleLoadGraph = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const graphData = JSON.parse(event.target.result);
            graph.importFromJSON(graphData);
            updateNodesState();
            setSelectedNode(null);
            console.log('Grafo carregado');
          } catch (error) {
            console.error('Erro ao carregar grafo:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Renderiza as arestas entre os nós
  const renderEdges = () => {
    const edges = [];
    const adjacencyList = graph.getAdjacencyList();
    
    for (const [nodeId, connections] of adjacencyList.entries()) {
      const node = graph.getNode(nodeId);
      if (!node) continue;
      
      for (const connectedId of connections) {
        const connectedNode = graph.getNode(connectedId);
        if (!connectedNode || nodeId > connectedId) continue; // Evita duplicatas
        
        // Calcula a posição da linha
        const x1 = node.x;
        const y1 = node.y;
        const x2 = connectedNode.x;
        const y2 = connectedNode.y;
        
        // Calcula o comprimento e ângulo da linha
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        edges.push(
          <div
            key={`edge-${nodeId}-${connectedId}`}
            className="graph-edge"
            style={{
              left: `${x1}px`,
              top: `${y1}px`,
              width: `${length}px`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: '0 50%'
            }}
          />
        );
      }
    }
    
    return edges;
  };

  return {
    // Estados
    nodes,
    selectedNode,
    canvasRef,
    
    // Funções
    updateNodesState,
    handleCanvasDoubleClick,
    handleNodeClick,
    handleNodeDoubleClick,
    handleClearGraph,
    handleSaveGraph,
    handleLoadGraph,
    renderEdges,
    
    // Métodos do grafo (para informações)
    getNodeCount: () => graph.getNodeCount(),
    getEdgeCount: () => graph.getEdgeCount()
  };
};
