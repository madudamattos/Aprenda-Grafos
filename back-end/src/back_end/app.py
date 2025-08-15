import logging
import pickle

from flask import Flask, jsonify, request, session
from flask_cors import CORS

from back_end.algorithms.algorithm import Algorithm
from back_end.algorithms.bfs import BFS
from back_end.graph_parser import GraphParser

app = Flask(__name__)
CORS(app)
app.secret_key = "secret key"  # TODO: Change this!
logging.basicConfig(level=logging.DEBUG)


@app.route("/api/grafo", methods=["POST"])
def grafo():
    data = request.get_json()
    graph = GraphParser.json_to_graph(data)

    match data.get("algorithm"):
        case "bfs":
            source = data.get("source")
            if not source:
                return jsonify({"error": "Source node is required for BFS"}), 400
            session["algorithm"] = pickle.dumps(BFS(graph, source))
            return jsonify({"message": "Algorithm initialized"}), 200
        case _:
            return jsonify({"error": "Unsupported algorithm"}), 400


@app.route("/api/step", methods=["POST"])
def step():
    algorithm = session.get("algorithm")
    if not algorithm:
        return jsonify({"error": "No algorithm initialized"}), 400

    try:
        algorithm: Algorithm = pickle.loads(algorithm)
        is_executing = algorithm.next_step()
        session["algorithm"] = pickle.dumps(algorithm)

        result = {
            "finished": not is_executing,
            "graph": GraphParser.graph_to_json(algorithm.current_graph),
            "current_node": algorithm.current_node,
            "step": algorithm.step_id,
        }
        return jsonify(result), 200
    except Exception as e:
        logging.exception("Error during algorithm step")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run()
