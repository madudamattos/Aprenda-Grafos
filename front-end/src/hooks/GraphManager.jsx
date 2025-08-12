import { useCallback, useEffect, useRef, useState } from 'react';
import Graph from '../utils/Graph';

export const useGraphManager = () => {
  console.log('useGraphManager hook initializing...'); // Debug log
  
  const [graph] = useState(() => new Graph());
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, type: null, targetId: null });
  const [dragging, setDragging] = useState({ isDragging: false, nodeId: null, offsetX: 0, offsetY: 0 });
  const dragRafRef = useRef(null);
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [editingEdgeId, setEditingEdgeId] = useState(null);
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
    hideContextMenu();
    if (selectedNode === null) {
      setSelectedNode(nodeId);
      console.log(`Nó ${nodeId} selecionado`);
    } else if (selectedNode === nodeId) {
      setSelectedNode(null);
      console.log(`Nó ${nodeId} deselecionado`);
    } else {
      // Conecta criando aresta direcionada selectedNode -> nodeId
      const weightStr = window.prompt('Peso da aresta (opcional):');
      const weight = weightStr === null || weightStr.trim() === '' ? null : Number(weightStr);
      const edge = graph.addEdge(selectedNode, nodeId, { weight, directed: true });
      if (edge) {
        console.log(`Aresta criada: ${edge.from} -> ${edge.to} (peso: ${edge.weight ?? '—'})`);
        updateNodesState();
      } else {
        console.log(`Falha ao conectar nós ${selectedNode} -> ${nodeId} (pode já existir uma aresta)`);
      }
      setSelectedNode(null);
    }
  };

  // Manipula duplo clique em um nó (editar peso do nó)
  const handleNodeDoubleClick = (nodeId) => {
    hideContextMenu();
    setEditingNodeId(nodeId);
  };

  const startEditNodeWeight = (nodeId) => {
    hideContextMenu();
    setEditingNodeId(nodeId);
  };

  const commitNodeWeight = (nodeId, value) => {
    const weight = value.trim() === '' ? null : Number(value);
    graph.setNodeWeight(nodeId, weight);
    setEditingNodeId(null);
    updateNodesState();
  };

  const cancelEditNodeWeight = () => {
    setEditingNodeId(null);
  };

  // Arrastar nó: iniciar
  const handleNodeMouseDown = (nodeId, mouseEvent) => {
    hideContextMenu();
    if (!canvasRef.current) return;
    mouseEvent.stopPropagation();
    const rect = canvasRef.current.getBoundingClientRect();
    const node = graph.getNode(nodeId);
    if (!node) return;
    const mouseX = mouseEvent.clientX - rect.left;
    const mouseY = mouseEvent.clientY - rect.top;
    setDragging({ isDragging: true, nodeId, offsetX: mouseX - node.x, offsetY: mouseY - node.y });
  };

  const onMouseMove = useCallback((e) => {
    if (!dragging.isDragging || dragging.nodeId == null || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragging.offsetX;
    const y = e.clientY - rect.top - dragging.offsetY;
    graph.updateNodePosition(dragging.nodeId, x, y);
    // Volta ao comportamento anterior: re-render imediato, sem rAF
    updateNodesState();
  }, [dragging, graph]);

  const onMouseUp = useCallback(() => {
    if (dragging.isDragging) {
      setDragging({ isDragging: false, nodeId: null, offsetX: 0, offsetY: 0 });
    }
  }, [dragging]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (dragRafRef.current) cancelAnimationFrame(dragRafRef.current);
    };
  }, [onMouseMove, onMouseUp]);

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

  // Double click na aresta: editar peso
  const handleEdgeDoubleClick = (edgeId) => {
    hideContextMenu();
    setEditingEdgeId(edgeId);
  };

  const commitEdgeWeight = (edgeId, value) => {
    const weight = value.trim() === '' ? null : Number(value);
    graph.setEdgeWeight(edgeId, weight);
    setEditingEdgeId(null);
    updateNodesState();
  };

  const cancelEditEdgeWeight = () => {
    setEditingEdgeId(null);
  };

  // Context menu helpers
  const showContextMenu = (x, y, type, targetId) => {
    setContextMenu({ visible: true, x, y, type, targetId });
  };
  const hideContextMenu = () => setContextMenu({ visible: false, x: 0, y: 0, type: null, targetId: null });

  const handleNodeContextMenu = (nodeId, e) => {
    e.preventDefault();
    e.stopPropagation();
    showContextMenu(e.clientX, e.clientY, 'node', nodeId);
  };

  const handleEdgeContextMenu = (edgeId, e) => {
    e.preventDefault();
    e.stopPropagation();
    showContextMenu(e.clientX, e.clientY, 'edge', edgeId);
  };

  // Ações de menu de contexto
  const deleteNode = () => {
    if (contextMenu.type !== 'node' || contextMenu.targetId == null) return;
    const nodeId = contextMenu.targetId;
    graph.removeNode(nodeId);
    if (selectedNode === nodeId) setSelectedNode(null);
    updateNodesState();
    hideContextMenu();
  };

  const deleteEdge = () => {
    if (contextMenu.type !== 'edge' || contextMenu.targetId == null) return;
    graph.removeEdge(contextMenu.targetId);
    updateNodesState();
    hideContextMenu();
  };

  const toggleEdgeDirected = () => {
    if (contextMenu.type !== 'edge' || contextMenu.targetId == null) return;
    const edge = graph.getEdge(contextMenu.targetId);
    if (!edge) return;
    graph.setEdgeDirected(edge.id, !edge.directed);
    updateNodesState();
    hideContextMenu();
  };

  // Renderização de arestas com direção e peso
  const renderEdges = () => {
    const elements = [];
    const edges = graph.getAllEdges();
    for (const edge of edges) {
      const from = graph.getNode(edge.from);
      const to = graph.getNode(edge.to);
      if (!from || !to) continue;

      const x1 = from.x;
      const y1 = from.y;
      const x2 = to.x;
      const y2 = to.y;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angleRad = Math.atan2(dy, dx);
      const angle = angleRad * 180 / Math.PI;

      const nodeRadius = 25; // tamanho visual do nó (metade de 50px)
      const startOffset = nodeRadius;
      const endOffset = nodeRadius; // para direcionadas e não-direcionadas, encurtamos ao chegar no nó
      const usable = Math.max(0, length - startOffset - endOffset);
      const startX = x1 + Math.cos(angleRad) * startOffset;
      const startY = y1 + Math.sin(angleRad) * startOffset;

      elements.push(
        <div
          key={`edge-${edge.id}`}
          className={`graph-edge ${edge.directed ? 'directed' : 'undirected'}`}
          style={{
            left: `${startX}px`,
            top: `${startY}px`,
            width: `${usable}px`,
            transform: `rotate(${angle}deg)`,
            transformOrigin: '0 50%'
          }}
          onDoubleClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); handleEdgeDoubleClick(edge.id); }}
          onContextMenu={(e) => handleEdgeContextMenu(edge.id, e)}
        >
          {editingEdgeId === edge.id ? (
            <input
              className="edge-weight-input"
              autoFocus
              defaultValue={edge.weight ?? ''}
              onBlur={(ev) => commitEdgeWeight(edge.id, ev.target.value)}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') commitEdgeWeight(edge.id, ev.currentTarget.value);
                if (ev.key === 'Escape') cancelEditEdgeWeight();
              }}
              onDoubleClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); }}
              style={{
                left: `${usable / 2}px`,
                top: `-14px`,
                transform: `translate(-50%, -50%) rotate(${-angle}deg)`
              }}
            />
          ) : (
            <div
              className="graph-edge-label"
              style={{
                left: `${usable / 2}px`,
                top: `-14px`,
                transform: `translateX(-50%) rotate(${-angle}deg)`
              }}
              onDoubleClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); handleEdgeDoubleClick(edge.id); }}
            >
              {edge.weight != null ? edge.weight : ' '}
            </div>
          )}
        </div>
      );
    }
    return elements;
  };

  return {
    // Estados
    nodes,
    selectedNode,
    contextMenu,
    editingNodeId,
    editingEdgeId,
    canvasRef,
    
    // Funções
    updateNodesState,
    handleCanvasDoubleClick,
    handleNodeClick,
    handleNodeDoubleClick,
    handleNodeMouseDown,
    handleNodeContextMenu,
    handleEdgeContextMenu,
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
    
    // Métodos do grafo (para informações)
    getNodeCount: () => graph.getNodeCount(),
    getEdgeCount: () => graph.getEdgeCount()
  };
};
