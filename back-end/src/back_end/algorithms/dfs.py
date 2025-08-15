from collections.abc import Hashable

import networkx as nx

from back_end.algorithms.algorithm import Algorithm


class DFS(Algorithm):
    """Depth-first search implemented as a step-by-step runner.

    Uses a stack to traverse the graph and stores per-node state inside
    `self.current_graph` using the keys ``state`` (unvisited/visiting/visited).
    """

    def __init__(self, graph: nx.DiGraph, source: Hashable):
        """Initialize DFS runner.

        Parameters
        ----------
        graph:
            Input graph; a copy is used internally.
        source:
            Starting node id.
        """
        super().__init__(graph)
        self.stack: list[Hashable] = []
        self.source = source

    def next_step(self) -> bool:
        """Advance DFS by one small step.

        The state machine mirrors BFS but uses a LIFO stack to explore
        depth-first instead of breadth-first. Returns False when traversal
        is complete.
        """
        self.step = self._next_step

        if self._next_step == 1:
            # Initialize node states and push source
            for node in self.current_graph.nodes:
                self.current_graph.nodes[node]['state'] = 'unvisited'

            self.stack.append(self.source)
            self.current_graph.nodes[self.source]['state'] = 'visiting'
            self._next_step += 1
            return True

        if self._next_step == 2:
            # Pop next node; finish if stack empty
            if not self.stack:
                return False

            self.current_node = self.stack.pop()
            self.current_graph.nodes[self.current_node]['state'] = 'visited'
            self._next_step += 1
            return True

        if self._next_step == 3:
            # Push unvisited neighbors onto the stack
            for neighbor in self.current_graph.neighbors(self.current_node):
                visited = self.current_graph.nodes[neighbor]['state'] != 'unvisited'
                if not visited:
                    self.stack.append(neighbor)
                    self.current_graph.nodes[neighbor]['state'] = 'visiting'

            self._next_step = 2
            return True

        raise RuntimeError("Invalid step in DFS algorithm.")
