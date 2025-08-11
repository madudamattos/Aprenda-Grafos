class Graph {
  constructor() {
    console.log('Graph constructor called'); // Debug log
    this.nodes = new Map(); // Map para armazenar nós: id -> {id, x, y, connections}
    this.nextNodeId = 1;
    this.maxNodeId = 11;
    this.adjacencyList = new Map(); // Lista de adjacência: id -> Set de ids conectados
    console.log('Graph initialized:', { nodes: this.nodes, adjacencyList: this.adjacencyList }); // Debug log
  }

  // Adiciona um novo nó na posição especificada
  addNode(x, y) {
    // se atingiu o numero máximo de nós, retorna null;
    if(this.nextNodeId === this.maxNodeId) return null;

    const nodeId = this.nextNodeId;
    const node = {
      id: nodeId,
      x: x,
      y: y,
      connections: new Set()
    };

    this.nodes.set(nodeId, node);
    this.adjacencyList.set(nodeId, new Set());
    this.nextNodeId++;

    console.log(`Node ${nodeId} added at (${x}, ${y})`); // Debug log
    return node;
  }

  // Remove um nó e todas suas conexões
  removeNode(nodeId) {
    if (!this.nodes.has(nodeId)) return false;

    // Remove todas as conexões com este nó
    const node = this.nodes.get(nodeId);
    node.connections.forEach(connectedId => {
      const connectedNode = this.nodes.get(connectedId);
      if (connectedNode) {
        connectedNode.connections.delete(nodeId);
        this.adjacencyList.get(connectedId).delete(nodeId);
      }
    });

    // Remove o nó
    this.nodes.delete(nodeId);
    this.adjacencyList.delete(nodeId);

    return true;
  }

  // Conecta dois nós (adiciona uma aresta)
  connectNodes(nodeId1, nodeId2) {
    if (nodeId1 === nodeId2) return false; // Não permite auto-conexão
    if (!this.nodes.has(nodeId1) || !this.nodes.has(nodeId2)) return false;
    
    const node1 = this.nodes.get(nodeId1);
    const node2 = this.nodes.get(nodeId2);

    node1.connections.add(nodeId2);
    node2.connections.add(nodeId1);

    this.adjacencyList.get(nodeId1).add(nodeId2);
    this.adjacencyList.get(nodeId2).add(nodeId1);

    return true;
  }

  // Desconecta dois nós (remove uma aresta)
  disconnectNodes(nodeId1, nodeId2) {
    if (!this.nodes.has(nodeId1) || !this.nodes.has(nodeId2)) return false;

    const node1 = this.nodes.get(nodeId1);
    const node2 = this.nodes.get(nodeId2);

    node1.connections.delete(nodeId2);
    node2.connections.delete(nodeId1);

    this.adjacencyList.get(nodeId1).delete(nodeId2);
    this.adjacencyList.get(nodeId2).delete(nodeId1);

    return true;
  }

  // Obtém todos os nós
  getAllNodes() {
    return Array.from(this.nodes.values());
  }

  // Obtém um nó específico
  getNode(nodeId) {
    return this.nodes.get(nodeId);
  }

  // Obtém a lista de adjacência completa
  getAdjacencyList() {
    return this.adjacencyList;
  }

  // Obtém os vizinhos de um nó
  getNeighbors(nodeId) {
    return Array.from(this.adjacencyList.get(nodeId) || []);
  }

  // Verifica se dois nós estão conectados
  areConnected(nodeId1, nodeId2) {
    return this.adjacencyList.get(nodeId1)?.has(nodeId2) || false;
  }

  // Limpa todo o grafo
  clear() {
    this.nodes.clear();
    this.adjacencyList.clear();
    this.nextNodeId = 1;
  }

  // Obtém o número de nós
  getNodeCount() {
    return this.nodes.size;
  }

  // Obtém o número de arestas
  getEdgeCount() {
    let count = 0;
    for (const connections of this.adjacencyList.values()) {
      count += connections.size;
    }
    return count / 2; 
  }

  // Exporta o grafo como JSON
  exportToJSON() {
    const nodes = Array.from(this.nodes.values()).map(node => ({
      id: node.id,
      x: node.x,
      y: node.y
    }));

    const edges = [];
    for (const [nodeId, connections] of this.adjacencyList.entries()) {
      for (const connectedId of connections) {
        if (nodeId < connectedId) { // Evita duplicatas
          edges.push([nodeId, connectedId]);
        }
      }
    }

    return {
      nodes,
      edges,
      nextNodeId: this.nextNodeId
    };
  }

  // Importa grafo de JSON
  importFromJSON(data) {
    this.clear();
    
    // Adiciona nós
    data.nodes.forEach(nodeData => {
      const node = {
        id: nodeData.id,
        x: nodeData.x,
        y: nodeData.y,
        connections: new Set()
      };
      this.nodes.set(nodeData.id, node);
      this.adjacencyList.set(nodeData.id, new Set());
    });

    // Adiciona arestas
    data.edges.forEach(([nodeId1, nodeId2]) => {
      this.connectNodes(nodeId1, nodeId2);
    });

    this.nextNodeId = data.nextNodeId || this.nodes.size + 1;
  }
}

export default Graph;
