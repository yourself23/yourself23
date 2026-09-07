'use client';

import { useState } from "react";

export default function Page() {
  const [status, setStatus] = useState("Engine Idle");
  
  const handleVerify = async () => {
    setStatus("Verifying...");
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proofHash: "0xZK_TRUST_99810a08f2120391028301928301a92019382103982a10c92019203920102a01" })
    });
    const data = await res.json();
    setStatus(JSON.stringify(data));
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", background: "#0f172a", color: "#f8fafc", minHeight: "100vh" }}>
      <h1>Willstone Nexus Engine</h1>
      <p>Chain ID: {process.env.NEXT_PUBLIC_CHAIN_ID || "8453"}</p>
      <button onClick={handleVerify} style={{ padding: "0.75rem 1.5rem", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "0.375rem", cursor: "pointer", marginTop: "1rem" }}>
        Run Verification Test
      </button>
      <pre style={{ background: "#1e293b", padding: "1rem", marginTop: "1rem", borderRadius: "0.375rem" }}>{status}</pre>
    </main>
  );
}
