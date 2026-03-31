import { useState } from "react";
import { Search } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function LegalRAGUI() {
  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [clauses, setClauses] = useState([]);
  const [file, setFile] = useState(null);
  async function askQuestion() {
    if (!question) return;
    if (!sessionId) {
      alert("Please upload a document first");
      return;
    }
    setLoading(true);
    setAnswer("");
    setClauses([]);

    const res = await fetch("http://localhost:3000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, language, sessionId }),
    });

    const data = await res.json();

    setAnswer(data.answer);
    setClauses(data.clauses || []);
    setLoading(false);
  }
  async function summarizeDocument() {
    setLoading(true);
    setAnswer("");
    setClauses([]);

    const res = await fetch("http://localhost:3000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question:
          "Summarize the entire contract in simple terms with key risks and obligations",
        language,
        sessionId,
      }),
    });

    const data = await res.json();

    setAnswer(data.answer);
    setClauses(data.clauses || []);
    setLoading(false);
  }
  async function uploadDocument() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setAnswer("");
    setClauses([]);

    const res=await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setSessionId(data.sessionId);
    alert("Document Indexed Successfully");
    setLoading(false);
  }
  const isNotFound = answer?.toLowerCase().includes("not found") || false;
  const chartData = {
    labels: clauses.map((c) => c.name),
    datasets: [
      {
        label: "Risk Score",
        data: clauses.map((c) => c.risk_score),
        backgroundColor: "rgba(255,99,132,0.6)",
      },
    ],
  };
  const importanceData = {
    labels: clauses.map((c) => c.name),
    datasets: [
      {
        label: "Clause Importance",
        data: clauses.map((c) => c.importance || 0),
        backgroundColor: "rgba(59,130,246,0.6)",
        minBarLength: 5,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } },
    },
  };
  // Helper to color-code risk scores (0.0 to 1.0)
  const getRiskStyle = (score) => {
    if (score >= 0.7) return { background: "rgba(239, 68, 68, 0.2)", color: "#fca5a5", border: "1px solid #ef4444" }; // High Risk (Red)
    if (score >= 0.4) return { background: "rgba(234, 179, 8, 0.2)", color: "#fde047", border: "1px solid #eab308" }; // Med Risk (Yellow)
    return { background: "rgba(34, 197, 94, 0.2)", color: "#86efac", border: "1px solid #22c55e" }; // Low Risk (Green)
  };

  // Professional typography for the LLM output
  const markdownComponents = {
    h1: ({ node, ...props }) => <h1 style={{ fontSize: "1.5rem", color: "#60a5fa", marginTop: "1.5rem", marginBottom: "1rem", borderBottom: "1px solid #334155", paddingBottom: "0.5rem" }} {...props} />,
    h2: ({ node, ...props }) => <h2 style={{ fontSize: "1.25rem", color: "#93c5fd", marginTop: "1.5rem", marginBottom: "0.75rem" }} {...props} />,
    h3: ({ node, ...props }) => <h3 style={{ fontSize: "1.1rem", color: "#bfdbfe", marginTop: "1rem", marginBottom: "0.5rem" }} {...props} />,
    p: ({ node, ...props }) => <p style={{ lineHeight: "1.8", color: "#e2e8f0", marginBottom: "1rem", fontSize: "15px" }} {...props} />,
    ul: ({ node, ...props }) => <ul style={{ paddingLeft: "1.5rem", color: "#e2e8f0", marginBottom: "1rem", lineHeight: "1.8" }} {...props} />,
    li: ({ node, ...props }) => <li style={{ marginBottom: "0.5rem" }} {...props} />,
    strong: ({ node, ...props }) => <strong style={{ color: "#ffffff", fontWeight: "600" }} {...props} />,
  };
  return (
    <div style={page}>
      <div style={container}>
          <p style={{ color: "#f87171", fontWeight: "500" }}>
         Disclaimer: This AI tool is for informational purposes only. Please
        consult a qualified legal professional before making any decisions, as
        the system may not always be accurate.
      </p>
        <h1 style={title}>⚖️ Legal AI Contract Analyzer ⚖️</h1>
        <div style={{ marginBottom: "20px" }}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={uploadDocument} style={{ marginLeft: "10px" }}>
            Upload Contract
          </button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          {" "}
          <h2 style={{ color: "red" }}>Select Your Language</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Telugu">Telugu</option>
            <option value="Tamil">Tamil</option>
          </select>
        </div>
        <button onClick={summarizeDocument} style={summarizeBtn}>
          📄 Summarize Full Document
        </button>
        <div style={searchBox}>
          <input
            placeholder="Ask about contract clauses, risks, penalties..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askQuestion()}
            style={input}
          />
          <button onClick={askQuestion} style={button}>
            <Search size={18} />
          </button>
        </div>
        {loading && (
          <p style={{ marginTop: "20px" }}>⏳ AI is analyzing contract...</p>
        )}
        {answer && (
          <div style={answerBox}>
            {/* The Main LLM Answer */}
            <div style={{ marginBottom: "30px" }}>
              <ReactMarkdown components={markdownComponents}>
                {answer}
              </ReactMarkdown>
            </div>

            {/* The Clause Breakdown Cards */}
            {!isNotFound && clauses.length > 0 && (
              <div style={clauseSection}>
                <h3 style={sectionTitle}>Extracted Clauses & Risk Breakdown</h3>
                <div style={clauseGrid}>
                  {clauses.map((clause, idx) => (
                    <div key={idx} style={clauseCard}>
                      <div style={cardHeader}>
                        <h4 style={clauseName}>{clause.name}</h4>
                        <span style={{ ...riskBadge, ...getRiskStyle(clause.risk_score) }}>
                          Risk: {clause.risk_score}
                        </span>
                      </div>
                      <p style={clauseReason}>{clause.reason}</p>
                      <div style={importanceBarBg}>
                        <div style={{...importanceBarFill, width: `${(clause.importance || 0) * 100}%`}}></div>
                      </div>
                      <small style={{color: "#64748b", fontSize: "11px"}}>Importance: {clause.importance}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {!loading && isNotFound && (
          <div style={{ marginTop: "20px", color: "#f87171" }}>
            Not found in document
          </div>
        )}
        {!loading && !isNotFound && clauses.length === 0 && answer && (
          <div style={{ marginTop: "20px", color: "#9ca3af" }}>
            No significant risks found
          </div>
        )}
        {!isNotFound && clauses.length > 0 && (
          <div style={graphBox}>
            <h2>Risk Prediction</h2>
            <Bar data={chartData} options={chartOptions} />

            <h2 style={{ marginTop: "30px" }}>Clause Importance</h2>
            <Bar data={importanceData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
}

const page = {
  width: "100vw",
  background: "#0f172a",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  paddingTop: "80px",
  fontFamily: "sans-serif",
};

const container = {
  width: "900px",
  maxWidth: "90%",
  textAlign: "center",
  color: "white",
};

const title = {
  fontSize: "38px",
  marginBottom: "35px",
  fontWeight: "600",
};

const searchBox = {
  display: "flex",
  alignItems: "center",
  background: "#1e293b",
  borderRadius: "12px",
  padding: "8px",
  marginTop: "20px",
};

const input = {
  flex: 1,
  background: "transparent",
  border: "none",
  outline: "none",
  color: "white",
  padding: "12px",
};

const button = {
  background: "#3b82f6",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
  color: "white",
};

const answerBox = {
  marginTop: "30px",
  textAlign: "left",
  background: "#1e293b",
  padding: "30px",
  borderRadius: "14px",
  lineHeight: "1.7",
};

const summarizeBtn = {
  marginTop: "10px",
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  border: "none",
  padding: "14px",
  borderRadius: "12px",
  cursor: "pointer",
  color: "white",
  width: "50%",
};

const graphBox = {
  marginTop: "40px",
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
};

const clauseSection = {
  borderTop: "1px solid #334155",
  paddingTop: "25px",
  marginTop: "10px",
};

const sectionTitle = {
  fontSize: "1.2rem",
  color: "#f8fafc",
  marginBottom: "20px",
};

const clauseGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "15px",
};

const clauseCard = {
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "10px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "10px",
  gap: "10px",
};

const clauseName = {
  margin: 0,
  fontSize: "15px",
  color: "#e2e8f0",
  fontWeight: "600",
};

const riskBadge = {
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "bold",
  whiteSpace: "nowrap",
};

const clauseReason = {
  fontSize: "13px",
  color: "#94a3b8",
  lineHeight: "1.5",
  marginBottom: "15px",
  flexGrow: 1,
};

const importanceBarBg = {
  width: "100%",
  height: "6px",
  background: "#1e293b",
  borderRadius: "3px",
  overflow: "hidden",
  marginBottom: "4px",
};

const importanceBarFill = {
  height: "100%",
  background: "#3b82f6",
  borderRadius: "3px",
};
