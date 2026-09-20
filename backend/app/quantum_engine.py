from math import pi

from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator


SIMULATOR = AerSimulator()


def execute_circuit(circuit: QuantumCircuit, shots: int = 1024):
    result = SIMULATOR.run(
        circuit,
        shots=shots
    ).result()

    return result.get_counts()


def bell_circuit():
    circuit = QuantumCircuit(2, 2)

    circuit.h(0)
    circuit.cx(0, 1)

    circuit.measure([0, 1], [0, 1])

    return circuit


def grover_circuit(marked_state: str = "11"):
    circuit = QuantumCircuit(2, 2)

    circuit.h([0, 1])

    # Oracle
    if marked_state == "11":
        circuit.cz(0, 1)

    # Diffusion
    circuit.h([0, 1])
    circuit.x([0, 1])
    circuit.cz(0, 1)
    circuit.x([0, 1])
    circuit.h([0, 1])

    circuit.measure([0, 1], [0, 1])

    return circuit


def gate_circuit(gate: str):
    circuit = QuantumCircuit(1, 1)

    gate = gate.upper()

    if gate == "H":
        circuit.h(0)

    elif gate == "X":
        circuit.x(0)

    elif gate == "Y":
        circuit.y(0)

    elif gate == "Z":
        circuit.z(0)

    elif gate == "S":
        circuit.s(0)

    elif gate == "T":
        circuit.t(0)

    else:
        raise ValueError(
            "Invalid gate. Use H, X, Y, Z, S or T."
        )

    circuit.measure(0, 0)

    return circuit


def custom_circuit(
    operations: list[dict],
    num_qubits: int = 2
):
    if not 1 <= num_qubits <= 8:
        raise ValueError(
            "Number of qubits must be between 1 and 8."
        )

    circuit = QuantumCircuit(
        num_qubits,
        num_qubits
    )

    for operation in operations:

        gate = str(
            operation.get("gate", "")
        ).upper()

        # -------------------------
        # Single qubit gates
        # -------------------------

        if gate in {
            "H",
            "X",
            "Y",
            "Z",
            "S",
            "T"
        }:

            qubit = int(
                operation["qubit"]
            )

            if not 0 <= qubit < num_qubits:
                raise ValueError(
                    f"Invalid qubit: {qubit}"
                )

            if gate == "H":
                circuit.h(qubit)

            elif gate == "X":
                circuit.x(qubit)

            elif gate == "Y":
                circuit.y(qubit)

            elif gate == "Z":
                circuit.z(qubit)

            elif gate == "S":
                circuit.s(qubit)

            elif gate == "T":
                circuit.t(qubit)

        # -------------------------
        # Rotation gates
        # -------------------------

        elif gate in {
            "RX",
            "RY",
            "RZ"
        }:

            qubit = int(
                operation["qubit"]
            )

            theta = float(
                operation.get(
                    "theta",
                    pi / 2
                )
            )

            if not 0 <= qubit < num_qubits:
                raise ValueError(
                    f"Invalid qubit: {qubit}"
                )

            if gate == "RX":
                circuit.rx(theta, qubit)

            elif gate == "RY":
                circuit.ry(theta, qubit)

            elif gate == "RZ":
                circuit.rz(theta, qubit)

        # -------------------------
        # CNOT
        # -------------------------

        elif gate == "CNOT":

            control = int(
                operation["control"]
            )

            target = int(
                operation["target"]
            )

            if not (
                0 <= control < num_qubits
                and 0 <= target < num_qubits
            ):
                raise ValueError(
                    "Invalid CNOT qubit."
                )

            if control == target:
                raise ValueError(
                    "CNOT control and target must differ."
                )

            circuit.cx(
                control,
                target
            )

        # -------------------------
        # Controlled-Z
        # -------------------------

        elif gate == "CZ":

            control = int(
                operation["control"]
            )

            target = int(
                operation["target"]
            )

            if not (
                0 <= control < num_qubits
                and 0 <= target < num_qubits
            ):
                raise ValueError(
                    "Invalid CZ qubit."
                )

            if control == target:
                raise ValueError(
                    "CZ control and target must differ."
                )

            circuit.cz(
                control,
                target
            )

        # -------------------------
        # SWAP
        # -------------------------

        elif gate == "SWAP":

            q1 = int(
                operation["qubit1"]
            )

            q2 = int(
                operation["qubit2"]
            )

            if not (
                0 <= q1 < num_qubits
                and 0 <= q2 < num_qubits
            ):
                raise ValueError(
                    "Invalid SWAP qubit."
                )

            if q1 == q2:
                raise ValueError(
                    "SWAP qubits must differ."
                )

            circuit.swap(
                q1,
                q2
            )

        # -------------------------
        # Measurement
        # -------------------------

        elif gate == "MEASURE":
            continue

        # -------------------------
        # Reset
        # -------------------------

        elif gate == "RESET":

            qubit = int(
                operation["qubit"]
            )

            if not 0 <= qubit < num_qubits:
                raise ValueError(
                    f"Invalid qubit: {qubit}"
                )

            circuit.reset(qubit)

        else:
            raise ValueError(
                f"Unsupported gate: {gate}"
            )

    # Measurement is added at the end.
    circuit.measure(
        range(num_qubits),
        range(num_qubits)
    )

    return circuit