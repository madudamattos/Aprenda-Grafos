class Graph {
  constructor() {
    console.log('Graph constructor called'); // Debug log
    this.nodes = new Map(); // id -> { id, x, y, weight }
    this.edges = new Map(); // id -> { id, from, to, weight, directed }
    this.nextNodeId = 1;
    this.nextEdgeId = 1;
    this.maxNodeCount = 8;
    this.nodeCount = this.nodes.size;
    // console.log('Graph initialized:', { nodes: this.nodes, edges: this.edges }); // Debug log
  }

  // Adiciona um novo nó na posição especificada
  addNode(x, y) {
    // se atingiu o numero máximo de nós, retorna null;
    if (this.nodes.size >= this.maxNodeCount) return null;

    const nodeId = this.nextNodeId;
    const node = { id: nodeId, x, y, weight: null };

    this.nodes.set(nodeId, node);
    this.nextNodeId++;

    // console.log(`Node ${nodeId} added at (${x}, ${y})`); // Debug log
    return node;
  }

  // Remove um nó e todas as arestas incidentes
  removeNode(nodeId) {
    if (!this.nodes.has(nodeId)) return false;
    this.nodes.delete(nodeId);
    // Remove arestas que saem ou chegam no nó
    for (const [edgeId, edge] of Array.from(this.edges.entries())) {
      if (edge.from === nodeId || edge.to === nodeId) {
        this.edges.delete(edgeId);
      }
    }
    return true;
  }

  // Adiciona uma aresta
  addEdge(from, to, { weight = null, directed = true } = {}) {
    if (from === to) return null; // não permite autolaço
    if (!this.nodes.has(from) || !this.nodes.has(to)) return null;
    // Regras de unicidade:
    // - Se for direcionada: não pode existir outra aresta do mesmo sentido; e não pode existir uma aresta não-direcionada entre o par
    // - Se for não-direcionada: não pode existir nenhuma aresta entre o par (qualquer direção ou não-direcionada)
    if (directed) {
      if (this.hasEdgeFromTo(from, to)) return null;
      if (this.hasUndirectedEdgeBetween(from, to)) return null;
    } else {
      if (this.hasAnyEdgeBetween(from, to)) return null;
    }

    const edgeId = this.nextEdgeId++;
    const edge = { id: edgeId, from, to, weight, directed };
    this.edges.set(edgeId, edge);
    return edge;
  }

  // Remove uma aresta por id
  removeEdge(edgeId) {
    if (!this.edges.has(edgeId)) return false;
    this.edges.delete(edgeId);
    return true;
  }

  // Atualiza posição do nó
  updateNodePosition(nodeId, x, y) {
    const node = this.nodes.get(nodeId);
    if (!node) return false;
    node.x = x;
    node.y = y;
    return true;
  }

  // Define peso do nó
  setNodeWeight(nodeId, weight) {
    const node = this.nodes.get(nodeId);
    if (!node) return false;
    node.weight = weight;
    return true;
  }

  // Define peso da aresta
  setEdgeWeight(edgeId, weight) {
    const edge = this.edges.get(edgeId);
    if (!edge) return false;
    edge.weight = weight;
    return true;
  }

  // Define direção da aresta (true = direcionada, false = não direcionada)
  setEdgeDirected(edgeId, directed) {
    const edge = this.edges.get(edgeId);
    if (!edge) return false;
    // Se alternar para não-direcionada, remova qualquer outra aresta entre o par
    if (!directed) {
      for (const [otherId, otherEdge] of this.edges.entries()) {
        if (
          otherId !== edgeId &&
          (
            (otherEdge.from === edge.from && otherEdge.to === edge.to) ||
            (otherEdge.from === edge.to && otherEdge.to === edge.from)
          )
        ) {
          this.edges.delete(otherId);
        }
      }
      edge.directed = false;
    } else {
      // Se alternar para direcionada, apenas marca como direcionada
      edge.directed = true;
    }
    return true;
  }

  // Obtém todos os nós
  getAllNodes() {
    return Array.from(this.nodes.values());
  }

  // Obtém todas as arestas
  getAllEdges() {
    return Array.from(this.edges.values());
  }

  // Obtém um nó específico
  getNode(nodeId) {
    return this.nodes.get(nodeId);
  }

  // Obtém aresta por id
  getEdge(edgeId) {
    return this.edges.get(edgeId);
  }

  // Obtém os vizinhos de um nó (saídas), considerando direção
  getNeighbors(nodeId) {
    const neighbors = [];
    for (const edge of this.edges.values()) {
      if (edge.directed) {
        if (edge.from === nodeId) neighbors.push(edge.to);
      } else {
        if (edge.from === nodeId) neighbors.push(edge.to);
        if (edge.to === nodeId) neighbors.push(edge.from);
      }
    }
    return neighbors;
  }

  // Verifica se dois nós estão conectados (há alguma aresta entre eles)
  areConnected(nodeId1, nodeId2) {
    for (const edge of this.edges.values()) {
      if (edge.directed) {
        if (edge.from === nodeId1 && edge.to === nodeId2) return true;
      } else {
        if (
          (edge.from === nodeId1 && edge.to === nodeId2) ||
          (edge.from === nodeId2 && edge.to === nodeId1)
        ) return true;
      }
    }
    return false;
  }

  // Existe alguma aresta entre os nós (qualquer direção ou não-direcionada)
  hasAnyEdgeBetween(nodeId1, nodeId2) {
    for (const edge of this.edges.values()) {
      if (
        (edge.from === nodeId1 && edge.to === nodeId2) ||
        (edge.from === nodeId2 && edge.to === nodeId1) ||
        (!edge.directed && (
          (edge.from === nodeId1 && edge.to === nodeId2) ||
          (edge.from === nodeId2 && edge.to === nodeId1)
        ))
      ) {
        return true;
      }
    }
    return false;
  }

  // Existe aresta exatamente do nó A para o nó B
  hasEdgeFromTo(from, to) {
    for (const edge of this.edges.values()) {
      if (edge.from === from && edge.to === to) return true;
    }
    return false;
  }

  // Existe aresta não-direcionada entre A e B
  hasUndirectedEdgeBetween(a, b) {
    for (const edge of this.edges.values()) {
      if (!edge.directed && (
        (edge.from === a && edge.to === b) ||
        (edge.from === b && edge.to === a)
      )) return true;
    }
    return false;
  }

  // Limpa todo o grafo
  clear() {
    this.nodes.clear();
    this.edges.clear();
    this.nextNodeId = 1;
    this.nextEdgeId = 1;
  }

  // Obtém o número de nós
  getNodeCount() {
    return this.nodes.size;
  }

  // Obtém o número de arestas
  getEdgeCount() {
    return this.edges.size;
  }

  // Exporta o grafo como JSON
  exportToJSON() { 
    const nodes = Array.from(this.nodes.values()).map(node => ({
      id: node.id,
      x: node.x,
      y: node.y,
      weight: node.weight,
    }));

    const edges = Array.from(this.edges.values()).map(edge => ({
      id: edge.id,
      from: edge.from,
      to: edge.to,
      weight: edge.weight,
      directed: edge.directed,
    }));

    return {
      nodes,
      edges,
      nextNodeId: this.nextNodeId,
      nextEdgeId: this.nextEdgeId,
    };
  }

  // Importa grafo de JSON
  importFromJSON(data) {
    this.clear();

    // Adiciona nós
    (data.nodes || []).forEach(nodeData => {
      const node = {
        id: nodeData.id,
        x: nodeData.x,
        y: nodeData.y,
        weight: nodeData.weight ?? null,
      };
      this.nodes.set(nodeData.id, node);
    });

    // Adiciona arestas (compatível com formato antigo [[a,b], ...] e novo [{from,to,...}, ...])
    (data.edges || []).forEach(edgeData => {
      if (Array.isArray(edgeData)) {
        const [from, to] = edgeData;
        const edge = { id: this.nextEdgeId++, from, to, weight: null, directed: false };
        this.edges.set(edge.id, edge);
      } else if (edgeData && typeof edgeData === 'object') {
        const edge = {
          id: edgeData.id ?? this.nextEdgeId++,
          from: edgeData.from,
          to: edgeData.to,
          weight: edgeData.weight ?? null,
          directed: edgeData.directed !== false,
        };
        this.edges.set(edge.id, edge);
      }
    });

    this.nextNodeId = data.nextNodeId || (this.nodes.size + 1);
    this.nextEdgeId = data.nextEdgeId || (this.edges.size + 1);
  }
}

export default Graph;
