import networkx as nx

class GraphJSONUtil:
    @staticmethod
    def graph_to_json(graph: nx.Graph) -> dict:
        return nx.readwrite.json_graph.node_link_data(graph)

    @staticmethod
    def json_to_graph(data: dict) -> nx.Graph:
        return nx.readwrite.json_graph.node_link_graph(data)
