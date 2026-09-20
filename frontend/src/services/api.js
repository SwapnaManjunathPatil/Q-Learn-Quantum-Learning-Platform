const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";


async function request(endpoint, options = {}) {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...options,

        headers: {
          ...(options.body
            ? {
                "Content-Type":
                  "application/json",
              }
            : {}),

          ...(options.headers || {}),
        },
      }
    );


    if (!response.ok) {
      let errorMessage =
        `Request failed with status ${response.status}`;

      try {
        const errorData =
          await response.json();

        if (
          typeof errorData?.detail ===
          "string"
        ) {
          errorMessage =
            errorData.detail;
        } else if (errorData?.detail) {
          errorMessage =
            JSON.stringify(
              errorData.detail
            );
        }

      } catch {
        // Ignore JSON parsing errors
      }

      throw new Error(
        errorMessage
      );
    }


    return await response.json();

  } catch (error) {

    console.error(
      `API Error [${endpoint}]:`,
      error
    );

    if (
      error instanceof TypeError
    ) {
      throw new Error(
        "Unable to connect to the QuantumLab backend. Make sure FastAPI is running on http://127.0.0.1:8000."
      );
    }

    throw error;
  }
}


// ==========================================
// AI Tutor
// ==========================================

export async function askAITutor(
  question,
  topic = "quantum computing",
  context = {}
) {

  if (
    !question ||
    !question.trim()
  ) {
    throw new Error(
      "Please enter a question."
    );
  }


  const safeContext =
    context &&
    typeof context === "object" &&
    !Array.isArray(context)
      ? context
      : {};


  return request(
    "/ai/tutor",
    {
      method: "POST",

      body: JSON.stringify({
        question:
          question.trim(),

        topic,

        context:
          safeContext,
      }),
    }
  );
}


// ==========================================
// Quantum Circuit
// ==========================================

export async function runQuantumCircuit(
  operations,
  qubits = 2,
  shots = 1024
) {

  return request(
    "/quantum/circuit",
    {
      method: "POST",

      body: JSON.stringify({
        operations,
        qubits,
        shots,
      }),
    }
  );
}