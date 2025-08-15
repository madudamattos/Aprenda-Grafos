from collections.abc import Hashable

import networkx as nx

from back_end.algorithms.algorithm import Algorithm


class DFS(Algorithm):
    """Depth-First Search (DFS) algorithm implementation.

    This class extends the Algorithm base class to implement the DFS algorithm.

    Attributes:
        stack (list[Hashable]): Stack to keep track of nodes to visit.
        source (Hashable): Starting node id.
    """

    def __init__(self, graph: nx.DiGraph, source: Hashable):
        """Initialize DFS runner.

        Args:
            graph (nx.DiGraph): Input graph; a copy is used internally.
            source (Hashable): Starting node id.
        """
        super().__init__(graph)
        self.stack: list[Hashable] = []
        self.source = source
        self._step_handlers = {
            "init": self._step_init,
            "pop": self._step_pop,
            "expand": self._step_expand,
        }

    def _step_id(self) -> int:
        """Return the id of the current step.

        This method is only used for maintaining compatibility with the UI and soon will be removed.

        Returns:
            int: The id of the current step.
        """
        step_ids = {
            "init": 1,
            "pop": 2,
            "expand": 3,
        }
        return step_ids[self.step]

    def _step_init(self) -> bool:
        """Initialize node states and push the source onto the stack.

        This method sets all nodes to "unvisited", pushes the source node onto
        the stack, and marks it as "visiting". Sets the next step to "pop".

        Returns:
            bool: True, i.e., the algorithm continues to the next step.
        """
        for node in self.current_graph.nodes:
            self.current_graph.nodes[node]["state"] = "unvisited"

        self.stack.append(self.source)
        self.current_graph.nodes[self.source]["state"] = "visiting"
        self.step = "pop"
        return True

    def _step_pop(self) -> bool:
        """Pop the next node from the stack and mark it as visited. If the stack is empty,
        the algorithm is finished.

        This method pops the top of the stack, marks it as "visited", and
        updates the next step to "expand".

        Returns:
            bool: True if a node was popped successfully, False if the stack is empty.
        """
        if not self.stack:
            return False

        self.current_node = self.stack.pop()
        self.current_graph.nodes[self.current_node]["state"] = "visited"
        self.step = "expand"
        return True

    def _step_expand(self) -> bool:
        """Expand the current node by pushing its unvisited neighbors onto the stack.

        This method iterates over the neighbors of the current node, pushes
        those that are "unvisited" onto the stack, and marks them as "visiting". Sets the next step to "pop".

        Returns:
            bool: True, i.e., the algorithm continues to the next step.
        """
        for neighbor in self.current_graph.neighbors(self.current_node):
            if self.current_graph.nodes[neighbor]["state"] == "unvisited":
                self.stack.append(neighbor)
                self.current_graph.nodes[neighbor]["state"] = "visiting"

        self.step = "pop"
        return True
