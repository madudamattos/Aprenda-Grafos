from collections.abc import Hashable

import networkx as nx

from back_end.algorithms.algorithm import Algorithm


class BFS(Algorithm):
    """Breadth-First Search (BFS) algorithm implementation.

    This class extends the Algorithm base class to implement the BFS algorithm.

    Attributes:
        queue (list[Hashable]): Queue to keep track of nodes to visit.
        source (Hashable): Starting node id.
    """

    def __init__(self, graph: nx.DiGraph, source: Hashable):
        """Initialize BFS runner.

        Args:
            graph (nx.DiGraph): Input graph; a copy is used internally.
            source (Hashable): Starting node id.
        """
        super().__init__(graph)
        self.queue: list[Hashable] = []
        self.source = source
        self._step_handlers = {
            "init": self._state_init,
            "dequeue": self._state_dequeue,
            "expand": self._state_expand,
        }

    def _step_id(self) -> int:
        """Return the id of the current step.

        This method is only used for maintaining compatibility with the UI and soon will be removed.

        Returns:
            int: The id of the current step.
        """
        step_ids = {
            "init": 1,
            "dequeue": 2,
            "expand": 3,
        }
        return step_ids[self.step]

    def _state_init(self) -> bool:
        """Initialize node states and enqueue the source.

        This method sets all nodes to "unvisited", enqueues the source node,
        and marks it as "visiting". Sets the next step to "dequeue".

        Returns:
            bool: True, i.e., the algorithm continues to the next step.
        """
        for node in self.current_graph.nodes:
            self.current_graph.nodes[node]["state"] = "unvisited"

        self.queue.append(self.source)
        self.current_graph.nodes[self.source]["state"] = "visiting"
        self.step = "dequeue"
        return True

    def _state_dequeue(self) -> bool:
        """Dequeue the next node and mark it as visited. If the queue is empty,
        the algorithm is finished.

        This method pops the front of the queue, marks it as "visited", and
        updates the next step to "expand".

        Returns:
            bool: True if a node was dequeued successfully, False if the queue is empty.
        """
        if not self.queue:
            return False

        self.current_node = self.queue.pop(0)
        self.current_graph.nodes[self.current_node]["state"] = "visited"
        self.step = "expand"
        return True

    def _state_expand(self) -> bool:
        """Expand the current node by enqueuing its unvisited neighbors.

        This method iterates over the neighbors of the current node, enqueues
        those that are "unvisited", and marks them as "visiting". Sets the next step to "dequeue".

        Returns:
            bool: True, i.e., the algorithm continues to the next step.
        """
        for neighbor in self.current_graph.neighbors(self.current_node):
            if self.current_graph.nodes[neighbor]["state"] == "unvisited":
                self.queue.append(neighbor)
                self.current_graph.nodes[neighbor]["state"] = "visiting"

        self.step = "dequeue"
        return True
