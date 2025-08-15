import heapq
from collections.abc import Hashable

import networkx as nx

from back_end.algorithms.algorithm import Algorithm


class Dijkstra(Algorithm):
    """Dijkstra algorithm runner.

    This class implements a step-by-step version of Dijkstra's shortest-path
    algorithm that matches the project's Algorithm interface. The algorithm
    stores per-node state inside a copy of the input graph, so the original
    graph is not modified.

    Attributes
    ----------
    priority_queue:
        Min-heap used to select the next node to process. Items are tuples
        of (distance, node).
    source, target:
        Start and end node identifiers.
    shortest_path:
        List of nodes composing the shortest path once the target is reached.
    """

    def __init__(self, graph: nx.DiGraph, source: Hashable, target: Hashable):
        """Initialize the runner.

        Parameters
        ----------
        graph:
            Input graph; a copy will be used for internal state.
        source, target:
            Node identifiers for source and target. Any hashable type is
            accepted (consistent with networkx node ids).
        """
        super().__init__(graph)
        self.priority_queue = []
        self.source = source
        self.target = target
        self.shortest_path = []

    def next_step(self) -> bool:
        """Advance the algorithm by a single logical step.

        Returns
        -------
        bool
            True while the algorithm made progress and can continue; False
            when the algorithm finished (no more nodes to process or target
            reached).
        """
        self.step = self._next_step  # Expose internal step value to external callers

        if self._next_step == 1:
            # Initial setup: validate weights and initialize per-node state
            self._setup_algorithm()
            self._next_step += 1
            return True

        if self._next_step == 2:
            # Pop next node from the priority queue and mark it visited
            if not self.priority_queue:
                return False

            self.current_node = heapq.heappop(self.priority_queue)[1]
            if self.current_graph.nodes[self.current_node]['state'] == 'visited':
                # Already processed via a shorter path
                return True
            self.current_graph.nodes[self.current_node]['state'] = 'visited'

            if self.current_node == self.target:
                self._build_shortest_path(self.current_node)
                return False

            self._next_step += 1
            return True

        if self._next_step == 3:
            # Relax all outgoing edges from the current node
            for neighbor in self.current_graph.neighbors(self.current_node):
                if self.current_graph.nodes[neighbor]['state'] == 'visited':
                    continue

                # Default weight is 1 when not provided
                edge_weight = self.current_graph[self.current_node][neighbor].get('weight', 1)
                new_distance = self.current_graph.nodes[self.current_node]['distance'] + edge_weight

                if new_distance < self.current_graph.nodes[neighbor]['distance']:
                    # Found a shorter path to neighbor
                    self.current_graph.nodes[neighbor]['distance'] = new_distance
                    self.current_graph.nodes[neighbor]['parent'] = self.current_node
                    heapq.heappush(self.priority_queue, (new_distance, neighbor))
                    self.current_graph.nodes[neighbor]['state'] = 'visiting'

            self._next_step = 2  # Go back to popping the next node
            return True

        raise RuntimeError("Invalid step in Dijkstra algorithm.")

    def _setup_algorithm(self):
        """Prepare internal structures and validate the input graph.

        This sets all node distances to infinity, resets parents and states,
        and pushes the source node into the priority queue. It also checks
        for negative edge weights and raises ValueError if any are found,
        since Dijkstra's algorithm requires non-negative weights.
        """
        self.shortest_path = []

        # Validate weights: Dijkstra does not support negative edges
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

    def _build_shortest_path(self, current_node: Hashable):
        """Reconstruct the shortest path from source to the given node."""
        self.shortest_path = []
        while current_node is not None:
            self.shortest_path.append(current_node)
            current_node = self.current_graph.nodes[current_node]['parent']
        self.shortest_path.reverse()
