import json

import networkx as nx


class GraphParser:
    @staticmethod
    def graph_to_json(graph: nx.DiGraph) -> dict:
        data = {"nodes": [], "edges": []}

        for node, attrs in graph.nodes(data=True):
            node_data = attrs.copy()
            node_data["id"] = node
            data["nodes"].append(node_data)

        for u, v, attrs in graph.edges(data=True):
            is_duplicate = any(edge for edge in data["edges"] if set((u, v)) == set((edge["from"], edge["to"])))
            if is_duplicate:
                continue

            edge_data = attrs.copy()
            edge_data["from"] = u
            edge_data["to"] = v
            edge_data["directed"] = not graph.has_edge(v, u)
            data["edges"].append(edge_data)

        return data

    @staticmethod
    def json_to_graph(data: dict) -> nx.DiGraph:
        graph = nx.DiGraph()

        for node in data['nodes']:
            attr = {k: v for k, v in node.items() if k != 'id'}
            graph.add_node(node['id'], **attr)

        for edge in data["edges"]:
            u, v = edge["from"], edge["to"]
            attr = {k: v for k, v in edge.items() if k != "from" or k != "to"}

            graph.add_edge(u, v, **attr)
            if not edge["directed"]:
                graph.add_edge(v, u, **attr)

        return graph


def main():
    # TODO: Make this a test

    with open('data/graph.json', 'r') as file:
        input_data = json.load(file)

    graph = GraphParser.json_to_graph(input_data)
    print("Graph loaded from JSON:", graph)

    output_data = GraphParser.graph_to_json(graph)
    with open('data/output_graph.json', 'w') as file:
        json.dump(output_data, file, indent=4)

    input_data = {"nodes": input_data["nodes"], "edges": input_data["edges"]}
    assert dict(sorted(input_data.items())) == dict(sorted(output_data.items())), "Input and output JSON do not match"
    print("Graph successfully converted to JSON and saved to 'data/output_graph.json'")
