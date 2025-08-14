import networkx as nx


class Algorithm:
    def __init__(self, graph: nx.DiGraph):
        self.current_graph = graph.copy()
        self.current_node = None
        self.step = 1
        self._next_step = 1

    def next_step(self) -> bool:
        raise NotImplementedError("This method should be implemented by subclasses.")
