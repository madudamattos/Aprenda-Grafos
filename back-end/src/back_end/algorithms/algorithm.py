import networkx as nx


class Algorithm:
    def __init__(self, graph: nx.DiGraph):
        self.original_graph = graph
        self.current_graph = graph.copy()
        self.phase = 1

    def step(self) -> bool:
        raise NotImplementedError("This method should be implemented by subclasses.")
