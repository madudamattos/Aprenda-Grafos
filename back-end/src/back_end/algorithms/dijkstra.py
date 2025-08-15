import heapq
from collections.abc import Hashable

import networkx as nx

from back_end.algorithms.algorithm import Algorithm


class Dijkstra(Algorithm):
    """Dijkstra's algorithm implementation for finding the shortest path in a graph.

    This class extends the Algorithm base class to implement Dijkstra's algorithm.

    Attributes:
        shortest_path (list): List to store the shortest path from source to target.
        priority_queue (list): Min-heap priority queue to manage nodes based on their distance.
        source (Hashable): Starting node id.
        target (Hashable): Target node id for the shortest path.
    """

    def __init__(self, graph: nx.DiGraph, source: Hashable, target: Hashable):
        """Initialize Dijkstra's algorithm runner.

        Args:
            graph (nx.DiGraph): Input graph; a copy is used internally.
            source (Hashable): Starting node id.
            target (Hashable): Target node id for the shortest path.
        """
        super().__init__(graph)
        self.source = source
        self.target = target
        self.priority_queue = []
        self.shortest_path = []

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
        """Initialize node states and the priority queue.

        This method sets all nodes to "unvisited", initializes the priority queue,
        and marks the source node as "visiting". Sets the next step to "pop". Weights must be non-negative.
        Default value for edges without weight is 1.

        Raises:
            ValueError: If the graph contains negative weight edges.

        Returns:
            bool: True, i.e., the algorithm continues to the next step.
        """
        for _u, _v, data in self.current_graph.edges(data=True):
            if "weight" not in data or not isinstance(data["weight"], (int, float)):
                data["weight"] = 1
            elif data.get("weight", 1) < 0:
                raise ValueError(
                    "Graph contains negative weight edge, which is not allowed in Dijkstra's algorithm."
                )

        for node in self.current_graph.nodes:
            self.current_graph.nodes[node]["distance"] = float("inf")
            self.current_graph.nodes[node]["parent"] = None
            self.current_graph.nodes[node]["state"] = "unvisited"

        heapq.heappush(self.priority_queue, (0, self.source))
        self.current_graph.nodes[self.source]["distance"] = 0
        self.current_graph.nodes[self.source]["state"] = "visiting"
        self.step = "pop"
        return True

    def _step_pop(self) -> bool:
        """Pop the next node from the priority queue and mark it as visited.

        If the queue is empty, the algorithm is finished. If the current node is the target,
        the shortest path is built.

        Returns:
            bool: True if a node was popped successfully, False if the queue is empty or target reached.
        """
        if not self.priority_queue:
            return False

        self.current_node = heapq.heappop(self.priority_queue)[1]
        if self.current_graph.nodes[self.current_node]["state"] == "visited":
            # Already processed via a shorter path
            return True
        self.current_graph.nodes[self.current_node]["state"] = "visited"

        if self.current_node == self.target:
            self.shortest_path = self._build_shortest_path(self.current_node)
            return False

        self.step = "expand"
        return True

    def _step_expand(self) -> bool:
        """Expand the current node by relaxing its outgoing edges.

        This method iterates over the neighbors of the current node, updates their distances
        if a shorter path is found, and enqueues them in the priority queue. Sets the next step to "pop".

        Returns:
            bool: True, i.e., the algorithm continues to the next step.
        """
        for neighbor in self.current_graph.neighbors(self.current_node):
            if self.current_graph.nodes[neighbor]["state"] == "visited":
                continue

            edge_weight = self.current_graph[self.current_node][neighbor]["weight"]
            new_distance = (
                self.current_graph.nodes[self.current_node]["distance"] + edge_weight
            )

            if new_distance < self.current_graph.nodes[neighbor]["distance"]:
                # Found a shorter path to neighbor
                self.current_graph.nodes[neighbor]["distance"] = new_distance
                self.current_graph.nodes[neighbor]["parent"] = self.current_node
                heapq.heappush(self.priority_queue, (new_distance, neighbor))
                self.current_graph.nodes[neighbor]["state"] = "visiting"

        self.step = "pop"
        return True

    def _build_shortest_path(self, node: Hashable) -> list[Hashable]:
        """Build the shortest path from the source to the node by backtracking.

        Args:
            node (Hashable): The node to backtrack from.

        Returns:
            list[Hashable]: The shortest path from source to target as a list of node ids
        """
        path = []
        while node is not None:
            path.append(node)
            node = self.current_graph.nodes[node]["parent"]
        path.reverse()
        return path
