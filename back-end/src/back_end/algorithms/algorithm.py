import networkx as nx


class Algorithm:
    """Base class for algorithms that operate step-by-step on a graph.

    Subclasses should implement `next_step()` and rely on `self.current_graph`
    (a copy of the input graph) to keep per-node metadata. The base class
    provides common attributes used by the project's UI/runner.
    """

    def __init__(self, graph: nx.DiGraph):
        self.current_graph = graph.copy()  # Keep an internal copy so the original graph is not mutated
        self.current_node = None
        self.step = 1        # This is exposed to UI
        self._next_step = 1  # This is the internal state machine

    def next_step(self) -> bool:
        """Advance the algorithm by one step.

        Should be implemented by subclasses. Returns True while algorithm
        made progress, and False when finished.
        """
        raise NotImplementedError("This method should be implemented by subclasses.")
