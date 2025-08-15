from collections.abc import Hashable

import networkx as nx

from back_end.algorithms.algorithm import Algorithm


class BFS(Algorithm):
    """Breadth-first search implemented as a step-by-step runner.

    The class uses a queue to traverse the graph and stores per-node state
    inside `self.current_graph` using the keys ``state`` (unvisited/visiting/visited).
    """

    def __init__(self, graph: nx.DiGraph, source: Hashable):
        """Initialize BFS runner.

        Parameters
        ----------
        graph:
            Input graph; a copy is used internally.
        source:
            Starting node id.
        """
        super().__init__(graph)
        self.queue: list[Hashable] = []
        self.source = source

    def next_step(self) -> bool:
        """Advance BFS by one small step.

        The implementation follows a simple state machine with three states:
        1) initialization, 2) dequeue and mark visited, 3) expand neighbors.
        Returns False when traversal is complete.
        """
        self.step = self._next_step

        if self._next_step == 1:
            # Initialize node states and enqueue the source
            for node in self.current_graph.nodes:
                self.current_graph.nodes[node]['state'] = 'unvisited'

            self.queue.append(self.source)
            self.current_graph.nodes[self.source]['state'] = 'visiting'
            self._next_step += 1
            return True

        if self._next_step == 2:
            # Pop next node; finish if queue empty
            if not self.queue:
                return False

            self.current_node = self.queue.pop(0)
            self.current_graph.nodes[self.current_node]['state'] = 'visited'
            self._next_step += 1
            return True

        if self._next_step == 3:
            # Enqueue unvisited neighbors and mark them as visiting
            for neighbor in self.current_graph.neighbors(self.current_node):
                visited = self.current_graph.nodes[neighbor]['state'] != 'unvisited'
                if not visited:
                    self.queue.append(neighbor)
                    self.current_graph.nodes[neighbor]['state'] = 'visiting'

            # Go back to dequeue step
            self._next_step = 2
            return True

        raise RuntimeError("Invalid step in BFS algorithm.")
