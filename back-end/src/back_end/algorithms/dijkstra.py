import heapq

import networkx as nx

from back_end.algorithms.algorithm import Algorithm


class Dijkstra(Algorithm):
    def __init__(self, graph: nx.DiGraph, source: int, target: int):
        super().__init__(graph)
        self.priority_queue = []
        self.current_node = None
        self.source = source
        self.target = target
        self.shortest_path = []

    def step(self) -> bool:
        if self.phase == 1:
            self.shortest_path = []

            for _u, _v, data in self.current_graph.edges(data=True):
                if data.get('weight', 1) < 0:
                    raise ValueError("Graph contains negative weight edge, which is not allowed in Dijkstra's algorithm.")

            for node in self.current_graph.nodes:
                self.current_graph.nodes[node]['distance'] = float('inf')
                self.current_graph.nodes[node]['parent'] = None
                self.current_graph.nodes[node]['state'] = 'unvisited'

            heapq.heappush(self.priority_queue, (0, self.source))
            self.current_graph.nodes[self.source]['distance'] = 0
            self.current_graph.nodes[self.source]['state'] = 'visiting'
            self.phase += 1
            return True

        if self.phase == 2:
            if not self.priority_queue:
                return False

            self.current_node = heapq.heappop(self.priority_queue)[1]
            if self.current_graph.nodes[self.current_node]['state'] == 'visited':
                return True
            self.current_graph.nodes[self.current_node]['state'] = 'visited'

            if self.current_node == self.target:
                self.build_shortest_path(self.current_node)
                return False

            self.phase += 1
            return True

        if self.phase == 3:
            for neighbor in self.current_graph.neighbors(self.current_node):
                if self.current_graph.nodes[neighbor]['state'] == 'visited':
                    continue

                edge_weight = self.current_graph[self.current_node][neighbor].get('weight', 1)
                new_distance = self.current_graph.nodes[self.current_node]['distance'] + edge_weight

                if new_distance < self.current_graph.nodes[neighbor]['distance']:
                    self.current_graph.nodes[neighbor]['distance'] = new_distance
                    self.current_graph.nodes[neighbor]['parent'] = self.current_node
                    heapq.heappush(self.priority_queue, (new_distance, neighbor))
                    self.current_graph.nodes[neighbor]['state'] = 'visiting'

            self.phase = 2
            return True

        raise RuntimeError("Invalid phase in Dijkstra algorithm.")

    def build_shortest_path(self, current_node: str):
        self.shortest_path = []
        while current_node is not None:
            self.shortest_path.append(current_node)
            current_node = self.current_graph.nodes[current_node]['parent']
        self.shortest_path.reverse()
