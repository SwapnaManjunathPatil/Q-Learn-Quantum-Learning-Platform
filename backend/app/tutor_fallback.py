def tutor_answer(
    question: str,
    topic: str = "quantum computing",
    context: dict | None = None
):
    """
    Rule-based AI Quantum Tutor.

    The tutor uses:
    1. Current algorithm/topic
    2. Keywords in the student's question
    3. Specific question intent

    This makes the answer different for different questions
    and different algorithms.
    """

    q = question.lower().strip()

    context = context or {}

    algorithm = context.get("algorithm", topic)
    algorithm = str(algorithm).strip()

    algorithm_lower = algorithm.lower()

    # --------------------------------------------------
    # CLEAN ALGORITHM NAME
    # --------------------------------------------------

    # The frontend may send:
    # "Grover's Search - Grover's Search"
    # or
    # "Deutsch's Algorithm - quantum computing"

    if "grover" in algorithm_lower:
        current_algorithm = "Grover's Search"

    elif "bell" in algorithm_lower:
        current_algorithm = "Bell State"

    elif "deutsch-jozsa" in algorithm_lower:
        current_algorithm = "Deutsch-Jozsa Algorithm"

    elif "deutsch" in algorithm_lower:
        current_algorithm = "Deutsch's Algorithm"

    elif "bernstein" in algorithm_lower or "vazirani" in algorithm_lower:
        current_algorithm = "Bernstein-Vazirani Algorithm"

    elif "teleport" in algorithm_lower:
        current_algorithm = "Quantum Teleportation"

    elif "fourier" in algorithm_lower or algorithm_lower == "qft":
        current_algorithm = "Quantum Fourier Transform"

    elif "phase estimation" in algorithm_lower:
        current_algorithm = "Quantum Phase Estimation"

    elif "shor" in algorithm_lower:
        current_algorithm = "Shor's Algorithm"

    elif "vqe" in algorithm_lower or "variational" in algorithm_lower:
        current_algorithm = "VQE"

    elif "qaoa" in algorithm_lower:
        current_algorithm = "QAOA"

    elif "error" in algorithm_lower or "correction" in algorithm_lower:
        current_algorithm = "Quantum Error Correction"

    else:
        current_algorithm = algorithm

    # ==================================================
    # BELL STATE
    # ==================================================

    if "bell" in algorithm_lower:

        if "gate" in q or "which gate" in q:
            return (
                "The Bell State circuit mainly uses two gates: "
                "the Hadamard (H) gate and the CNOT gate.\n\n"
                "1. H gate creates superposition on the first qubit.\n"
                "2. CNOT uses the first qubit as control and the "
                "second qubit as target.\n"
                "3. This creates entanglement between the two qubits."
            )

        if "entangle" in q or "entanglement" in q:
            return (
                "Bell States demonstrate quantum entanglement. "
                "After applying H and CNOT, the two qubits become "
                "correlated. Measuring one qubit gives information "
                "about the other."
            )

        if "step" in q or "work" in q or "how" in q:
            return (
                "Bell State creation happens in these steps:\n\n"
                "1. Start with |00⟩.\n"
                "2. Apply H to qubit 0.\n"
                "3. Qubit 0 enters superposition.\n"
                "4. Apply CNOT with qubit 0 as control.\n"
                "5. The qubits become entangled.\n"
                "6. Measurement produces correlated results such as "
                "00 or 11."
            )

        if "simple" in q or "example" in q:
            return (
                "Think of a Bell State as two quantum coins whose "
                "results are strongly correlated.\n\n"
                "The H gate creates the superposition, and the CNOT "
                "gate creates the entanglement. When measured, the "
                "two qubits can produce correlated results such as "
                "00 or 11."
            )

        if "why" in q or "important" in q or "useful" in q:
            return (
                "Bell States are important because they provide a "
                "simple demonstration of quantum entanglement. "
                "Entanglement is used in areas such as quantum "
                "communication, quantum teleportation and quantum "
                "networking."
            )

        if "what" in q:
            return (
                "A Bell State is a maximally entangled two-qubit "
                "quantum state. A common Bell State is:\n\n"
                "|Φ+⟩ = (|00⟩ + |11⟩) / √2\n\n"
                "It can be created using a Hadamard gate followed "
                "by a CNOT gate."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "A Bell State demonstrates quantum entanglement using "
            "a Hadamard gate and a CNOT gate."
        )

    # ==================================================
    # GROVER'S SEARCH
    # ==================================================

    if "grover" in algorithm_lower:

        # IMPORTANT:
        # Specific keywords are checked BEFORE "explain".

        if "oracle" in q:
            return (
                "In Grover's Search, the oracle is used to mark the "
                "desired solution.\n\n"
                "It does not directly tell us the answer. Instead, "
                "it changes the phase of the target state. The "
                "diffusion operator then amplifies the probability "
                "of measuring that marked state."
            )

        if "diffusion" in q or "amplification" in q:
            return (
                "The diffusion operator is the second major part of "
                "Grover's Search.\n\n"
                "It performs inversion about the mean. This increases "
                "the amplitude of the state marked by the oracle, "
                "making that state more likely to be measured."
            )

        if "iteration" in q or "repeat" in q:
            return (
                "Grover's Search repeatedly applies two operations:\n\n"
                "1. Oracle - marks the desired state.\n"
                "2. Diffusion - amplifies the marked state's amplitude.\n\n"
                "For N possible states, approximately √N iterations "
                "are required for an ideal search."
            )

        if "step" in q or "steps" in q or "how" in q or "work" in q:
            return (
                "Grover's Search works in these main steps:\n\n"
                "1. Initialize the qubits.\n"
                "2. Apply Hadamard gates to create superposition.\n"
                "3. Apply the oracle to mark the target state.\n"
                "4. Apply the diffusion operator.\n"
                "5. Repeat the oracle and diffusion steps.\n"
                "6. Measure the qubits.\n\n"
                "The target state has a high probability of being "
                "obtained after the appropriate number of iterations."
            )

        if "simple" in q or "example" in q:
            return (
                "Imagine four boxes containing one hidden prize. "
                "A classical search may need to check several boxes.\n\n"
                "Grover's Search uses quantum superposition to "
                "consider multiple possibilities and then uses an "
                "oracle plus amplitude amplification to increase "
                "the probability of the correct box."
            )

        if "why" in q or "important" in q or "useful" in q:
            return (
                "Grover's Search is important because it provides a "
                "quadratic speedup for searching an unsorted space.\n\n"
                "A classical search requires O(N) queries in the "
                "general case, while Grover's algorithm requires "
                "approximately O(√N) oracle queries."
            )

        if "what" in q:
            return (
                "Grover's Search is a quantum algorithm for searching "
                "an unsorted search space.\n\n"
                "Its main components are quantum superposition, an "
                "oracle and a diffusion operator. Together they "
                "increase the probability of finding the desired state."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "Grover's Search uses an oracle and diffusion operator "
            "to find a marked item in an unsorted search space."
        )

    # ==================================================
    # DEUTSCH'S ALGORITHM
    # ==================================================

    if "deutsch" in algorithm_lower and "jozsa" not in algorithm_lower:

        if "oracle" in q:
            return (
                "The oracle in Deutsch's Algorithm represents the "
                "unknown function f(x).\n\n"
                "The quantum oracle changes the state according to "
                "the function's output. The resulting interference "
                "allows us to determine whether the function is "
                "constant or balanced."
            )

        if "hadamard" in q or "h gate" in q:
            return (
                "Hadamard gates are important in Deutsch's Algorithm.\n\n"
                "The first Hadamard creates superposition, allowing "
                "the algorithm to evaluate information about multiple "
                "inputs. A final Hadamard creates interference that "
                "reveals whether the function is constant or balanced."
            )

        if "constant" in q:
            return (
                "A constant function gives the same output for every "
                "input. For example, f(0)=0 and f(1)=0 is constant.\n\n"
                "Deutsch's Algorithm can identify this property with "
                "one oracle query."
            )

        if "balanced" in q:
            return (
                "A balanced function gives different outputs for the "
                "two possible inputs. For example, f(0)=0 and f(1)=1 "
                "is balanced."
            )

        if "step" in q or "how" in q or "work" in q:
            return (
                "Deutsch's Algorithm works as follows:\n\n"
                "1. Prepare two qubits.\n"
                "2. Apply Hadamard gates.\n"
                "3. Apply the function oracle.\n"
                "4. Apply a Hadamard gate to the input qubit.\n"
                "5. Measure the input qubit.\n\n"
                "The measurement identifies whether the function "
                "is constant or balanced."
            )

        if "simple" in q or "example" in q:
            return (
                "Suppose a function accepts either 0 or 1.\n\n"
                "If both inputs produce the same output, the function "
                "is constant. If the outputs are different, it is "
                "balanced.\n\n"
                "Deutsch's Algorithm determines this using one "
                "quantum oracle query."
            )

        if "why" in q or "important" in q or "useful" in q:
            return (
                "Deutsch's Algorithm is important because it provides "
                "a simple demonstration of quantum advantage. It "
                "shows how superposition and interference can reduce "
                "the number of function evaluations."
            )

        if "what" in q:
            return (
                "Deutsch's Algorithm determines whether a one-bit "
                "function is constant or balanced using a quantum "
                "oracle and interference."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "Deutsch's Algorithm demonstrates how quantum "
            "superposition and interference can distinguish "
            "constant and balanced functions."
        )

    # ==================================================
    # DEUTSCH-JOZSA
    # ==================================================

    if "deutsch-jozsa" in algorithm_lower:

        if "constant" in q:
            return (
                "In the Deutsch-Jozsa problem, a constant function "
                "produces the same output for every possible input."
            )

        if "balanced" in q:
            return (
                "A balanced function produces 0 for exactly half "
                "of the possible inputs and 1 for the other half."
            )

        if "oracle" in q:
            return (
                "The Deutsch-Jozsa oracle represents the unknown "
                "function. The algorithm queries this oracle in "
                "superposition and uses interference to determine "
                "whether the function is constant or balanced."
            )

        if "step" in q or "how" in q or "work" in q:
            return (
                "Deutsch-Jozsa works through these steps:\n\n"
                "1. Prepare the input and auxiliary qubits.\n"
                "2. Create superposition using Hadamard gates.\n"
                "3. Apply the function oracle.\n"
                "4. Apply Hadamard gates again to the input register.\n"
                "5. Measure the input qubits.\n\n"
                "The measurement identifies whether the function "
                "is constant or balanced."
            )

        if "simple" in q or "example" in q:
            return (
                "Imagine a function that accepts several binary inputs.\n\n"
                "If every input produces the same output, it is constant. "
                "If exactly half produce 0 and half produce 1, it is "
                "balanced.\n\n"
                "Deutsch-Jozsa determines which case applies using "
                "quantum interference."
            )

        if "why" in q or "important" in q:
            return (
                "Deutsch-Jozsa is important as an early example of "
                "quantum algorithms demonstrating a significant "
                "query advantage over a deterministic classical approach."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "Deutsch-Jozsa determines whether a promised function "
            "is constant or balanced using superposition and interference."
        )

    # ==================================================
    # BERNSTEIN-VAZIRANI
    # ==================================================

    if "bernstein" in algorithm_lower or "vazirani" in algorithm_lower:

        if "secret" in q or "hidden" in q:
            return (
                "Bernstein-Vazirani hides a binary secret string inside "
                "an oracle.\n\n"
                "For example, if the secret string is 101, quantum "
                "interference allows the algorithm to recover 101 "
                "after one oracle query."
            )

        if "oracle" in q:
            return (
                "The Bernstein-Vazirani oracle encodes a hidden binary "
                "string. The oracle's action introduces phase information "
                "related to that secret string."
            )

        if "step" in q or "how" in q or "work" in q:
            return (
                "Bernstein-Vazirani works as follows:\n\n"
                "1. Prepare the input qubits in superposition.\n"
                "2. Prepare the auxiliary qubit.\n"
                "3. Apply the oracle containing the secret string.\n"
                "4. Apply Hadamard gates again to the input qubits.\n"
                "5. Measure the input register.\n\n"
                "The measured result reveals the secret string."
            )

        if "simple" in q or "example" in q:
            return (
                "Suppose the hidden secret string is 101.\n\n"
                "Instead of discovering each bit separately, the "
                "Bernstein-Vazirani quantum procedure uses one oracle "
                "query and interference to recover the complete string."
            )

        if "why" in q or "important" in q:
            return (
                "Bernstein-Vazirani is important because it demonstrates "
                "how quantum interference can extract a hidden binary "
                "string efficiently."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "Bernstein-Vazirani is designed to discover a hidden "
            "binary string using a quantum oracle."
        )

    # ==================================================
    # QUANTUM TELEPORTATION
    # ==================================================

    if "teleport" in algorithm_lower:

        if "entangle" in q or "entanglement" in q:
            return (
                "Entanglement is essential to quantum teleportation. "
                "The sender and receiver first share an entangled pair. "
                "This shared quantum correlation allows the receiver "
                "to reconstruct the unknown quantum state."
            )

        if "classical" in q or "bits" in q:
            return (
                "Quantum teleportation requires two classical bits of "
                "communication. These bits tell the receiver which "
                "correction operations should be applied to the "
                "receiver's qubit."
            )

        if "step" in q or "how" in q or "work" in q:
            return (
                "Quantum Teleportation works in these steps:\n\n"
                "1. Prepare the unknown quantum state.\n"
                "2. Create an entangled pair.\n"
                "3. Perform a Bell-state measurement.\n"
                "4. Send the two classical measurement bits.\n"
                "5. Apply the appropriate correction gates.\n"
                "6. The receiver obtains the original quantum state."
            )

        if "simple" in q or "example" in q:
            return (
                "Quantum teleportation does not transport a physical "
                "qubit from one place to another.\n\n"
                "Instead, the quantum state is transferred using an "
                "entangled pair and classical communication."
            )

        if "why" in q or "important" in q or "useful" in q:
            return (
                "Quantum teleportation is important for quantum "
                "communication and quantum networking. It demonstrates "
                "how entanglement and classical communication can "
                "transfer quantum information."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "Quantum teleportation transfers an unknown quantum state "
            "using entanglement and classical communication."
        )

    # ==================================================
    # QFT
    # ==================================================

    if "fourier" in algorithm_lower or algorithm_lower == "qft":

        if "hadamard" in q:
            return (
                "Hadamard gates are important components of many QFT "
                "circuits. They create superposition, while controlled "
                "phase rotations introduce the relative phases needed "
                "for the Fourier transformation."
            )

        if "phase" in q:
            return (
                "QFT encodes information in the phases of quantum "
                "states. Controlled phase-rotation gates are used to "
                "introduce the required relative phase relationships."
            )

        if "step" in q or "how" in q or "work" in q:
            return (
                "A basic QFT circuit uses:\n\n"
                "1. Hadamard gates.\n"
                "2. Controlled phase-rotation gates.\n"
                "3. Additional gates to arrange the output qubits.\n\n"
                "These operations transform amplitudes from the "
                "computational basis into a Fourier representation."
            )

        if "use" in q or "useful" in q or "important" in q:
            return (
                "The Quantum Fourier Transform is important because "
                "it is a key component of algorithms such as Shor's "
                "Algorithm and Quantum Phase Estimation."
            )

        if "simple" in q or "example" in q:
            return (
                "The QFT can be viewed as a quantum transformation "
                "that changes how information is represented. It is "
                "similar in purpose to the classical Fourier transform "
                "but operates on quantum amplitudes and phases."
            )

        if "what" in q:
            return (
                "The Quantum Fourier Transform, or QFT, is the quantum "
                "analogue of the discrete Fourier transform. It "
                "transforms a quantum state into a Fourier basis."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "QFT transforms quantum states using Hadamard and "
            "controlled phase-rotation gates."
        )

    # ==================================================
    # QUANTUM PHASE ESTIMATION
    # ==================================================

    if "phase estimation" in algorithm_lower:

        if "qft" in q or "fourier" in q:
            return (
                "Quantum Phase Estimation commonly uses the inverse "
                "Quantum Fourier Transform to convert phase information "
                "into measurable computational-basis information."
            )

        if "eigenvalue" in q:
            return (
                "Quantum Phase Estimation estimates the phase associated "
                "with an eigenvalue of a unitary operator. If U|ψ⟩ = "
                "e^(2πiφ)|ψ⟩, the algorithm estimates the value φ."
            )

        if "step" in q or "how" in q or "work" in q:
            return (
                "Quantum Phase Estimation generally works as follows:\n\n"
                "1. Prepare a phase-estimation register in superposition.\n"
                "2. Prepare an eigenstate of the unitary operator.\n"
                "3. Apply controlled powers of the unitary.\n"
                "4. Apply the inverse QFT.\n"
                "5. Measure the phase-estimation register."
            )

        if "simple" in q or "example" in q:
            return (
                "Think of Phase Estimation as a quantum method for "
                "measuring a hidden phase value associated with a "
                "quantum operation."
            )

        if "why" in q or "important" in q or "useful" in q:
            return (
                "Quantum Phase Estimation is important because it is "
                "a building block for algorithms including Shor's "
                "Algorithm and quantum chemistry methods."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "Quantum Phase Estimation estimates the phase associated "
            "with an eigenvalue of a unitary operation."
        )

    # ==================================================
    # SHOR'S ALGORITHM
    # ==================================================

    if "shor" in algorithm_lower:

        if "factor" in q or "factorization" in q:
            return (
                "Shor's Algorithm is designed for integer factorization.\n\n"
                "The key quantum task is period finding. Once the "
                "period is obtained, classical mathematics can be used "
                "to derive factors of the number."
            )

        if "period" in q:
            return (
                "Period finding is the central quantum component of "
                "Shor's Algorithm. The algorithm searches for the "
                "period of a modular exponential function."
            )

        if "qft" in q or "fourier" in q:
            return (
                "The Quantum Fourier Transform plays an important role "
                "in Shor's Algorithm because it helps extract the "
                "period information from a quantum state."
            )

        if "step" in q or "how" in q or "work" in q:
            return (
                "At a high level, Shor's Algorithm works like this:\n\n"
                "1. Choose a suitable number.\n"
                "2. Define a modular arithmetic function.\n"
                "3. Use a quantum circuit to find its period.\n"
                "4. Use the period to calculate factors.\n"
                "5. Verify the resulting factors classically."
            )

        if "simple" in q or "example" in q:
            return (
                "For an educational example, consider factoring 15.\n\n"
                "Shor's approach converts the factoring problem into "
                "a period-finding problem. The quantum part helps find "
                "the period, after which classical mathematics can "
                "produce factors such as 3 and 5."
            )

        if "why" in q or "important" in q or "useful" in q:
            return (
                "Shor's Algorithm is important because a sufficiently "
                "large fault-tolerant quantum computer could factor "
                "large integers much more efficiently than known "
                "classical algorithms."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "Shor's Algorithm is a quantum algorithm for integer "
            "factorization based on period finding."
        )

    # ==================================================
    # VQE
    # ==================================================

    if "vqe" in algorithm_lower or "variational" in algorithm_lower:

        if "parameter" in q:
            return (
                "VQE uses adjustable parameters inside a parameterized "
                "quantum circuit. A classical optimizer changes these "
                "parameters to minimize the measured objective value."
            )

        if "optimizer" in q or "classical" in q:
            return (
                "VQE is a hybrid quantum-classical algorithm. The "
                "quantum computer evaluates the objective function, "
                "while a classical optimizer updates the circuit "
                "parameters."
            )

        if "energy" in q:
            return (
                "VQE is commonly used to estimate the ground-state "
                "energy of a quantum system. The circuit parameters "
                "are optimized to minimize the measured energy."
            )

        if "step" in q or "how" in q or "work" in q:
            return (
                "VQE follows an optimization loop:\n\n"
                "1. Prepare a parameterized quantum state.\n"
                "2. Measure the required observables.\n"
                "3. Calculate the objective or energy.\n"
                "4. A classical optimizer updates the parameters.\n"
                "5. Repeat until the result converges."
            )

        if "simple" in q or "example" in q:
            return (
                "Think of VQE as a team effort between a quantum "
                "computer and a classical computer. The quantum "
                "computer evaluates a trial solution, while the "
                "classical computer adjusts parameters to improve it."
            )

        if "why" in q or "important" in q or "useful" in q:
            return (
                "VQE is useful for near-term quantum applications "
                "because it combines quantum circuits with classical "
                "optimization and can be applied to problems such as "
                "molecular energy estimation."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "VQE is a hybrid quantum-classical algorithm that uses "
            "a parameterized quantum circuit and classical optimization."
        )

    # ==================================================
    # QAOA
    # ==================================================

    if "qaoa" in algorithm_lower:

        if "cost" in q or "problem" in q:
            return (
                "The problem or cost Hamiltonian in QAOA represents "
                "the optimization problem. Its operation assigns "
                "different phases based on the quality of candidate "
                "solutions."
            )

        if "mixer" in q or "mixing" in q:
            return (
                "The mixer operator in QAOA helps move the quantum "
                "state between different candidate solutions. It "
                "works together with the problem operator."
            )

        if "parameter" in q:
            return (
                "QAOA uses adjustable parameters, commonly represented "
                "by beta and gamma. A classical optimizer adjusts "
                "these parameters to improve the objective value."
            )

        if "step" in q or "how" in q or "work" in q:
            return (
                "QAOA generally works as follows:\n\n"
                "1. Prepare an initial superposition.\n"
                "2. Apply the problem-dependent operator.\n"
                "3. Apply the mixing operator.\n"
                "4. Measure the quantum circuit.\n"
                "5. Use a classical optimizer to update parameters.\n"
                "6. Repeat the process."
            )

        if "simple" in q or "example" in q:
            return (
                "QAOA can be understood as a quantum optimization "
                "procedure. It repeatedly modifies a quantum state "
                "using a problem operator and a mixer so that good "
                "solutions become more likely."
            )

        if "why" in q or "important" in q or "useful" in q:
            return (
                "QAOA is important because it is designed for "
                "combinatorial optimization problems and is suitable "
                "for hybrid quantum-classical experimentation."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "QAOA is a hybrid quantum-classical optimization algorithm "
            "that alternates between problem and mixing operations."
        )

    # ==================================================
    # QUANTUM ERROR CORRECTION
    # ==================================================

    if "error" in algorithm_lower or "correction" in algorithm_lower:

        if "bit flip" in q:
            return (
                "A bit-flip error changes a qubit from |0⟩ to |1⟩ "
                "or from |1⟩ to |0⟩.\n\n"
                "A simple three-qubit repetition code can protect "
                "against a single bit-flip error by encoding one "
                "logical qubit across three physical qubits."
            )

        if "noise" in q:
            return (
                "Quantum systems are sensitive to environmental noise. "
                "Noise can change amplitudes or phases and cause the "
                "quantum information to become corrupted.\n\n"
                "Quantum error correction uses additional qubits and "
                "carefully designed operations to detect and correct "
                "certain errors."
            )

        if "decoherence" in q:
            return (
                "Decoherence occurs when interaction with the environment "
                "causes a quantum system to lose its quantum properties. "
                "Quantum error-correction techniques help protect "
                "information from such effects."
            )

        if "step" in q or "how" in q or "work" in q:
            return (
                "A simple three-qubit repetition demonstration works "
                "like this:\n\n"
                "1. Encode information into multiple qubits.\n"
                "2. An error may affect one physical qubit.\n"
                "3. Syndrome information can reveal which qubit was "
                "affected.\n"
                "4. A correction operation restores the encoded state."
            )

        if "simple" in q or "example" in q:
            return (
                "Quantum Error Correction is similar to keeping "
                "multiple copies of important information so that "
                "an error in one copy can be detected and corrected."
            )

        if "why" in q or "important" in q or "useful" in q:
            return (
                "Quantum Error Correction is essential for building "
                "reliable quantum computers because physical qubits "
                "are vulnerable to noise and errors."
            )

        return (
            f"You are learning {current_algorithm}.\n\n"
            "Quantum Error Correction protects quantum information "
            "from certain types of noise and errors."
        )

    # ==================================================
    # GENERAL QUANTUM QUESTIONS
    # ==================================================

    if "superposition" in q:
        return (
            "Superposition means that a qubit can be represented as "
            "a combination of |0⟩ and |1⟩.\n\n"
            "For example, applying a Hadamard gate to |0⟩ produces "
            "an equal superposition of |0⟩ and |1⟩."
        )

    if "qubit" in q:
        return (
            "A qubit is the basic unit of quantum information. "
            "Unlike a classical bit, which is either 0 or 1, "
            "a qubit can exist in a superposition of |0⟩ and |1⟩."
        )

    if "hadamard" in q:
        return (
            "The Hadamard gate is a fundamental quantum gate that "
            "creates superposition.\n\n"
            "For example:\n"
            "H|0⟩ = (|0⟩ + |1⟩) / √2."
        )

    if "measurement" in q or "measure" in q:
        return (
            "Quantum measurement converts a quantum state into a "
            "classical result. If a qubit is in superposition, "
            "measurement produces one of the possible basis states "
            "according to their probabilities."
        )

    if "cnot" in q:
        return (
            "CNOT, or Controlled-NOT, is a two-qubit quantum gate. "
            "It flips the target qubit when the control qubit is |1⟩. "
            "CNOT is commonly used to create entanglement."
        )

    if "entanglement" in q or "entangled" in q:
        return (
            "Quantum entanglement is a correlation between quantum "
            "systems that cannot be described independently using "
            "ordinary classical probabilities. Bell States provide "
            "a common example."
        )

    if "gate" in q:
        return (
            "Quantum gates are operations that change quantum states. "
            "Examples include H, X, Y, Z and CNOT. Different gates "
            "perform different transformations on qubits."
        )

    # ==================================================
    # DEBUGGING
    # ==================================================

    if "wrong" in q or "mistake" in q or "error" in q:

        return (
            f"Let's debug your current topic: {current_algorithm}.\n\n"
            "Check these points:\n"
            "1. Are the correct number of qubits being used?\n"
            "2. Are the gates applied in the correct order?\n"
            "3. Are the control and target qubits correct?\n"
            "4. Is the measurement performed at the correct stage?\n"
            "5. Are the expected measurement results correct?"
        )

    # ==================================================
    # DEFAULT
    # ==================================================

    return (
        f"You are learning {current_algorithm}.\n\n"
        f"Your question is: \"{question}\"\n\n"
        f"I can explain {current_algorithm} using:\n"
        "• Simple explanations\n"
        "• Step-by-step circuit operations\n"
        "• Quantum gates\n"
        "• Examples\n"
        "• Mathematical concepts\n"
        "• Debugging help\n\n"
        "Try asking:\n"
        f"• What is {current_algorithm}?\n"
        f"• How does {current_algorithm} work step by step?\n"
        "• Which quantum gates are used?\n"
        "• Why is this algorithm useful?\n"
        "• Explain this with a simple example."
    )