import { useState } from "react";
import { analyze, improve, pay } from "../services/api";

export default function Home() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [locked, setLocked] = useState(true);
  const [improved, setImproved] = useState("");

  const handleAnalyze = async () => {
    const res = await analyze({ resume, jd });
    setResult(res.data);
  };

  const handleUnlock = async () => {
    const order = await pay();

    const rzp = new window.Razorpay({
      key: "rzp_test_xxx", // replace
      amount: order.data.amount,
      currency: "INR",
      order_id: order.data.id,
      handler: async () => {
        setLocked(false);
        const imp = await improve({ resume, jd });
        setImproved(imp.data.result);
      }
    });

    rzp.open();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>ATS Resume Pro 🚀</h1>

      <textarea
        placeholder="Paste Resume"
        onChange={(e) => setResume(e.target.value)}
        style={{ width: "100%", height: "100px" }}
      />

      <textarea
        placeholder="Paste Job Description"
        onChange={(e) => setJd(e.target.value)}
        style={{ width: "100%", height: "100px", marginTop: "10px" }}
      />

      <button onClick={handleAnalyze} style={{ marginTop: "10px" }}>
        Check ATS Score
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>{result.score}% Match</h2>

          {result.score < 60 && (
            <p style={{ color: "red" }}>
              ⚠️ Your resume may get rejected!
            </p>
          )}

          <button onClick={handleUnlock}>
            Unlock Improvements ₹21
          </button>

          <div style={{
            filter: locked ? "blur(5px)" : "none",
            marginTop: "10px"
          }}>
            {improved || "AI suggestions will appear here..."}
          </div>
        </div>
      )}
    </div>
  );
}
