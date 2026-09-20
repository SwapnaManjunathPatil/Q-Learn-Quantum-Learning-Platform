from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict, List, Optional

from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator


# ============================================================
# APP
# ============================================================

app = FastAPI(
    title="QuantumLab API",
    version="1.0.0",
    description="Backend API for the AI-Based Interactive Quantum Algorithm Learning Platform",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://q-learn-backend.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# MODELS
# ============================================================

class CircuitRequest(BaseModel):
    operations: List[Dict[str, Any]]
    qubits: int = 2
    shots: int = 1024


# ============================================================
# BASIC ROUTES
# ============================================================

@app.get("/")
def home():
    return {
        "message": "Quantum Learning Platform API is running",
        "status": "success",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "QuantumLab API",
    }


# ============================================================
# SIMPLE QUANTUM TEST
# ============================================================

@app.get("/quantum/test")
def quantum_test():
    try:
        qc = QuantumCircuit(1, 1)

        qc.h(0)
        qc.measure(0, 0)

        simulator = AerSimulator()

        result = simulator.run(
            qc,
            shots=1000,
        ).result()

        counts = result.get_counts()

        return {
            "success": True,
            "message": "Quantum simulator is working",
            "counts": counts,
            "shots": 1000,
            "qubits": 1,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Quantum simulator error: {str(error)}",
        )


# ============================================================
# BELL STATE
# ============================================================

@app.get("/quantum/bell")
def bell_state():
    try:
        qc = QuantumCircuit(2, 2)

        # Create Bell state
        qc.h(0)
        qc.cx(0, 1)

        # Measurement
        qc.measure([0, 1], [0, 1])

        simulator = AerSimulator()

        result = simulator.run(
            qc,
            shots=1024,
        ).result()

        counts = result.get_counts()

        return {
            "success": True,
            "algorithm": "Bell State",
            "qubits": 2,
            "shots": 1024,
            "counts": counts,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Bell state simulation error: {str(error)}",
        )


# ============================================================
# GATE HELPERS
# ============================================================

def apply_single_qubit_gate(
    qc: QuantumCircuit,
    gate: str,
    qubit: int,
    theta: Optional[float] = None,
):
    gate = gate.upper()

    if gate == "H":
        qc.h(qubit)

    elif gate == "X":
        qc.x(qubit)

    elif gate == "Y":
        qc.y(qubit)

    elif gate == "Z":
        qc.z(qubit)

    elif gate == "S":
        qc.s(qubit)

    elif gate == "T":
        qc.t(qubit)

    elif gate == "RX":
        if theta is None:
            raise ValueError("RX gate requires theta")

        qc.rx(theta, qubit)

    elif gate == "RY":
        if theta is None:
            raise ValueError("RY gate requires theta")

        qc.ry(theta, qubit)

    elif gate == "RZ":
        if theta is None:
            raise ValueError("RZ gate requires theta")

        qc.rz(theta, qubit)

    else:
        raise ValueError(
            f"Unsupported single-qubit gate: {gate}"
        )


def apply_two_qubit_gate(
    qc: QuantumCircuit,
    gate: str,
    control: int,
    target: int,
):
    gate = gate.upper()

    if gate == "CNOT":
        qc.cx(control, target)

    elif gate == "CX":
        qc.cx(control, target)

    elif gate == "CZ":
        qc.cz(control, target)

    else:
        raise ValueError(
            f"Unsupported two-qubit gate: {gate}"
        )


def apply_swap_gate(
    qc: QuantumCircuit,
    qubit1: int,
    qubit2: int,
):
    qc.swap(qubit1, qubit2)


# ============================================================
# QUANTUM CIRCUIT EXECUTION
# ============================================================

@app.post("/quantum/circuit")
def run_quantum_circuit(request: CircuitRequest):

    try:
        # ----------------------------------------------------
        # Validate qubits
        # ----------------------------------------------------

        if request.qubits < 1:
            raise HTTPException(
                status_code=400,
                detail="Number of qubits must be at least 1.",
            )

        if request.qubits > 20:
            raise HTTPException(
                status_code=400,
                detail="Maximum supported number of qubits is 20.",
            )

        # ----------------------------------------------------
        # Validate shots
        # ----------------------------------------------------

        if request.shots < 1:
            raise HTTPException(
                status_code=400,
                detail="Shots must be at least 1.",
            )

        if request.shots > 100000:
            raise HTTPException(
                status_code=400,
                detail="Maximum supported shots is 100000.",
            )

        # ----------------------------------------------------
        # Create quantum circuit
        # ----------------------------------------------------

        qc = QuantumCircuit(
            request.qubits,
            request.qubits,
        )

        # ----------------------------------------------------
        # Apply operations
        # ----------------------------------------------------

        for operation in request.operations:

            gate = str(
                operation.get("gate", "")
            ).upper()

            if not gate:
                raise ValueError(
                    "Every operation must contain a gate."
                )

            # =================================================
            # SINGLE QUBIT GATES
            # =================================================

            if gate in [
                "H",
                "X",
                "Y",
                "Z",
                "S",
                "T",
                "RX",
                "RY",
                "RZ",
            ]:

                qubit = operation.get("qubit")

                if qubit is None:
                    raise ValueError(
                        f"{gate} gate requires a qubit."
                    )

                qubit = int(qubit)

                if (
                    qubit < 0
                    or qubit >= request.qubits
                ):
                    raise ValueError(
                        f"Invalid qubit index: {qubit}"
                    )

                theta = operation.get(
                    "theta",
                    None,
                )

                if theta is not None:
                    theta = float(theta)

                apply_single_qubit_gate(
                    qc,
                    gate,
                    qubit,
                    theta,
                )

            # =================================================
            # CNOT / CX
            # =================================================

            elif gate in [
                "CNOT",
                "CX",
            ]:

                control = operation.get(
                    "control"
                )

                target = operation.get(
                    "target"
                )

                if control is None:
                    raise ValueError(
                        f"{gate} requires control qubit."
                    )

                if target is None:
                    raise ValueError(
                        f"{gate} requires target qubit."
                    )

                control = int(control)
                target = int(target)

                if (
                    control < 0
                    or control >= request.qubits
                ):
                    raise ValueError(
                        f"Invalid control qubit: {control}"
                    )

                if (
                    target < 0
                    or target >= request.qubits
                ):
                    raise ValueError(
                        f"Invalid target qubit: {target}"
                    )

                if control == target:
                    raise ValueError(
                        "Control and target qubits must be different."
                    )

                apply_two_qubit_gate(
                    qc,
                    gate,
                    control,
                    target,
                )

            # =================================================
            # CZ
            # =================================================

            elif gate == "CZ":

                control = operation.get(
                    "control"
                )

                target = operation.get(
                    "target"
                )

                if control is None or target is None:
                    raise ValueError(
                        "CZ requires control and target qubits."
                    )

                control = int(control)
                target = int(target)

                if (
                    control < 0
                    or control >= request.qubits
                    or target < 0
                    or target >= request.qubits
                ):
                    raise ValueError(
                        "Invalid qubit index for CZ."
                    )

                if control == target:
                    raise ValueError(
                        "CZ control and target must be different."
                    )

                apply_two_qubit_gate(
                    qc,
                    gate,
                    control,
                    target,
                )

            # =================================================
            # SWAP
            # =================================================

            elif gate == "SWAP":

                qubit1 = operation.get(
                    "qubit1"
                )

                qubit2 = operation.get(
                    "qubit2"
                )

                if qubit1 is None or qubit2 is None:
                    raise ValueError(
                        "SWAP requires qubit1 and qubit2."
                    )

                qubit1 = int(qubit1)
                qubit2 = int(qubit2)

                if (
                    qubit1 < 0
                    or qubit1 >= request.qubits
                    or qubit2 < 0
                    or qubit2 >= request.qubits
                ):
                    raise ValueError(
                        "Invalid qubit index for SWAP."
                    )

                if qubit1 == qubit2:
                    raise ValueError(
                        "SWAP qubits must be different."
                    )

                apply_swap_gate(
                    qc,
                    qubit1,
                    qubit2,
                )

            # =================================================
            # BARRIER
            # =================================================

            elif gate == "BARRIER":

                qc.barrier()

            # =================================================
            # MEASUREMENT
            # =================================================

            elif gate in [
                "MEASURE",
                "MEASUREMENT",
            ]:

                # Measurement is automatically added
                # after all operations.
                continue

            # =================================================
            # UNSUPPORTED
            # =================================================

            else:

                raise ValueError(
                    f"Unsupported quantum gate: {gate}"
                )

        # ----------------------------------------------------
        # Measurement
        # ----------------------------------------------------

        qc.measure(
            range(request.qubits),
            range(request.qubits),
        )

        # ----------------------------------------------------
        # Simulator
        # ----------------------------------------------------

        simulator = AerSimulator()

        result = simulator.run(
            qc,
            shots=request.shots,
        ).result()

        counts = result.get_counts()

        # ----------------------------------------------------
        # Normalize counts
        # ----------------------------------------------------

        normalized_counts = {
            str(state): int(count)
            for state, count in counts.items()
        }

        # ----------------------------------------------------
        # Return response
        # ----------------------------------------------------

        return {
            "success": True,
            "qubits": request.qubits,
            "shots": request.shots,
            "counts": normalized_counts,
        }

    except HTTPException:
        raise

    except Exception as error:

        print(
            "Quantum circuit execution error:",
            error,
        )

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )