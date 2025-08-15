import networkx as nx


class Algorithm:
    """Base class for graph algorithms.

    This class provides a framework for implementing algorithms that can be executed step-by-step.

    Attributes:
        current_graph (nx.DiGraph): A copy of the input graph to avoid mutating the original graph.
        current_node (Hashable): The current node being processed in the algorithm.
        step (str): The current step in the algorithm's state machine.
        step_id (int): An integer representing the current step, for UI compatibility.
        _step_handlers (dict): A mapping of step names to their corresponding handler methods.
    """

    def __init__(self, graph: nx.DiGraph):
        self.current_graph = graph.copy()
        self.current_node = None
        self.step = "init"
        self._step_handlers = {}  # Handlers for each step in the state machine
        self.step_id = 1  # For compatibility with the UI

    def next_step(self) -> bool:
        """Execute the next step in the algorithm.

        Raises:
            ValueError: If the next step is not defined in `_step_handlers`.

        Returns:
            bool: True if the step was executed successfully, False if the algorithm is finished.
        """
        if self.step not in self._step_handlers:
            raise ValueError(f"Invalid step: {self.step}")

        self.step_id = self._step_id()
        return self._step_handlers[self.step]()

    def _step_id(self) -> int:
        """Return the id of the current step.

        This method is only used for maintaining compatibility with the UI and soon will be removed.
        Should be overridden in subclasses.

        Raises:
            NotImplementedError: If not implemented in a subclass.
        """
        raise NotImplementedError("Subclasses must implement _step_id method")
