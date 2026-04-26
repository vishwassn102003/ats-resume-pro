import { useState } from "react";
import { analyze, improve, pay } from "../services/api";

export default function Home() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [locked, setLocked] = useState(true);
  const [improveText, setImproveText] = useState("");

  const run = async () => {
    const res = await analyze({ resume, jd });
    setResult(res.data);
  };

  const unlock = async () => {
    const order = await pay();

    const rzp = new window.Razorpay({
      key: "rzp_test_xxx",
      amount: order.data.amount,
      currency: "INR",
      order_id: order.data.id,
      handler: async () => {
        setLocked(false);
        const imp = await improve({ resume, jd });
        setImproveText(imp.data.result);
      }
    });

    rzp.open();
  };

  return (
    <div className="p-6 text-center">

      <h1 className="text-4xl font-bold">
        ATS Resume Checker 🚀
      </h1>

      <textarea placeholder="Paste Resume"
        onChange={(e)=>setResume(e.target.value)}
        className="border w-full mt-4 p-2" />

      <textarea placeholder="Paste Job Description"
        onChange={(e)=>setJd(e.target.value)}
        className="border w-full mt-4 p-2" />

      <button onClick={run} className="bg-blue-500 text-white p-2 mt-4">
        Check Score
      </button>

      {result && (
        <div className="mt-6">

          <h2 className="text-3xl">{result.score}%</h2>

          {result.score < 60 && (
            <p className="text-red-500 animate-pulse">
              ⚠️ Your resume may get rejected!
            </p>
          )}

          <button onClick={unlock} className="bg-black text-white mt-4 p-2">
            Unlock Improvements ₹21
          </button>

          <div className={locked ? "blur-md mt-4" : "mt-4"}>
            {improveText || "AI suggestions will appear here..."}
          </div>

        </div>
      )}
    </div>
  );
}
