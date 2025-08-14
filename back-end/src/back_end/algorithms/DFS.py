import networkx as nx

from back_end.algorithms.algorithm import Algorithm


class DFS(Algorithm):
    def __init__(self, graph: nx.DiGraph, source: int):
        super().__init__(graph)
        self.stack = []
        self.source = source

    def next_step(self) -> bool:
        self.step = self._next_step

        if self._next_step == 1:
            for node in self.current_graph.nodes:
                self.current_graph.nodes[node]['state'] = 'unvisited'

            self.stack.append(self.source)
            self.current_graph.nodes[self.source]['state'] = 'visiting'
            self._next_step += 1
            return True

        if self._next_step == 2:
            if not self.stack:
                return False

            self.current_node = self.stack.pop()
            self.current_graph.nodes[self.current_node]['state'] = 'visited'
            self._next_step += 1
            return True

        if self._next_step == 3:
            for neighbor in self.current_graph.neighbors(self.current_node):
                visited = self.current_graph.nodes[neighbor]['state'] != 'unvisited'
                if not visited:
                    self.stack.append(neighbor)
                    self.current_graph.nodes[neighbor]['state'] = 'visiting'

            self._next_step = 2
            return True

        raise RuntimeError("Invalid step in DFS algorithm.")
