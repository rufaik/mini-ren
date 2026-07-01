"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const steps = [
  {
    id: 0,
    label: "What is a REST API?",
    emoji: "🌐",
    summary: "The foundation",
    content: (
  <div>
    <p style={{ color: "#8a9bb0", lineHeight: 1.8, marginBottom: "32px" }}>
      A REST API is a way for two systems to talk to each other over the internet. One system asks for something — the other responds.
    </p>

    {/* Animated diagram */}
    <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "32px" }}>
      
      {/* Your App node */}
      <div style={{ backgroundColor: "#2a3a4a", padding: "14px 24px", borderRadius: "10px", fontWeight: "700", fontSize: "14px", textAlign: "center", whiteSpace: "nowrap", zIndex: 1 }}>
        💻 Your App
      </div>

      {/* Arrows in the middle */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", padding: "0 16px" }}>
        
        {/* Request */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "4px" }}>
          <span style={{ color: "#e8472a", fontSize: "11px", fontWeight: "700", textAlign: "center", letterSpacing: "0.1em" }}>REQUEST</span>
          <div style={{ height: "3px", background: "#e8472a", borderRadius: "2px", position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, height: "100%", width: "40%",
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              animation: "slideRight 1.8s linear infinite"
            }} />
          </div>
          <span style={{ color: "#e8472a", fontSize: "16px", textAlign: "right", lineHeight: 1 }}>→</span>
        </div>

        {/* Response */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "4px" }}>
  <span style={{ color: "#e0e0e0", fontSize: "16px", textAlign: "left", lineHeight: 1 }}>←</span>
  <div style={{ height: "3px", background: "#e0e0e0", borderRadius: "2px", position: "relative", overflow: "hidden" }}>
    <div style={{
      position: "absolute", top: 0, right: 0, height: "100%", width: "40%",
      background: "linear-gradient(to left, transparent, rgba(255,255,255,0.6), transparent)",
      animation: "slideLeft 1.8s linear infinite"
    }} />
  </div>
  <span style={{ color: "#e0e0e0", fontSize: "11px", fontWeight: "700", textAlign: "center", letterSpacing: "0.1em" }}>RESPONSE</span>
</div>
      </div>

      {/* API Server node */}
      <div style={{ backgroundColor: "#2a3a4a", padding: "14px 24px", borderRadius: "10px", fontWeight: "700", fontSize: "14px", textAlign: "center", whiteSpace: "nowrap", zIndex: 1 }}>
        🖥️ API Server
      </div>

    </div>

    <style>{`
      @keyframes slideRight {
        0% { left: -40%; }
        100% { left: 100%; }
      }
      @keyframes slideLeft {
        0% { right: -40%; }
        100% { right: 100%; }
      }
    `}</style>

    <p style={{ color: "#8a9bb0", fontSize: "14px" }}>
      REST stands for <strong style={{ color: "white" }}>Representational State Transfer</strong>. It uses standard HTTP — the same protocol your browser uses to load web pages.
    </p>
  </div>
)
  },
  {
    id: 1,
    label: "Requests",
    emoji: "📤",
    summary: "Asking for something",
    content: (
  <div>
    <p style={{ color: "#8a9bb0", lineHeight: 1.8, marginBottom: "20px" }}>
      Every API call starts with a <strong style={{ color: "white" }}>request</strong>. A request has four key parts:
    </p>
    {[
      { part: "Method", value: "GET / POST / PUT / DELETE", desc: "What you want to do" },
      { part: "Endpoint", value: "/api/equipment", desc: "Where you're sending it" },
      { part: "Headers", value: "Content-Type: application/json", desc: "Metadata about the request" },
      { part: "Body", value: '{ "name": "Pressure Washer", "category": "Cleaning", "pricePerDay": 35 }', desc: "The data you're sending (POST/PUT only)" },
    ].map((row, i) => (
      <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "12px", alignItems: "flex-start" }}>
        <div style={{ backgroundColor: "#e8472a", color: "white", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "700", minWidth: "80px", textAlign: "center" }}>
          {row.part}
        </div>
        <div>
          <code style={{ color: "#34d399", fontSize: "13px" }}>{row.value}</code>
          <p style={{ color: "#8a9bb0", fontSize: "12px", margin: "2px 0 0" }}>{row.desc}</p>
        </div>
      </div>
    ))}

    <div style={{ backgroundColor: "#0f1922", borderRadius: "8px", padding: "20px", marginTop: "24px" }}>
      <p style={{ color: "#8a9bb0", fontSize: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        The actual request from our demo
      </p>
      <pre style={{ color: "#34d399", fontSize: "13px", margin: 0, lineHeight: 1.8 }}>{`fetch("http://localhost:3001/api/equipment", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
})`}</pre>
    </div>
  </div>
)
  },
  {
    id: 2,
    label: "Responses",
    emoji: "📥",
    summary: "What comes back",
    content: (
  <div>
    <p style={{ color: "#8a9bb0", lineHeight: 1.8, marginBottom: "24px" }}>
      Every response has three parts: a <strong style={{ color: "white" }}>status code</strong>, <strong style={{ color: "white" }}>headers</strong>, and a <strong style={{ color: "white" }}>body</strong>. Let's look at what we actually got back in our demo.
    </p>

    <div style={{ backgroundColor: "#0f1922", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
      <p style={{ color: "#8a9bb0", fontSize: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        Console output from our GET request
      </p>
      <pre style={{ color: "#e0e0e0", fontSize: "13px", margin: 0, lineHeight: 2 }}>
        {/* <span style={{ color: "#8a9bb0" }}>Fetching equipment from API...</span>{"\n"} */}
        Response received: <span style={{ color: "#34d399" }}>200 OK</span>{"\n"}
        Data: <span style={{ color: "#34d399" }}>(4) [{"{"}...{"}"}, {"{"}...{"}"}, {"{"}...{"}"}, {"{"}...{"}"}]</span>
      </pre>
    </div>

    <p style={{ color: "#8a9bb0", lineHeight: 1.8, marginBottom: "20px" }}>
      Three things are happening here:
    </p>

    {[
      { label: "Status code", value: "200 OK", desc: "The request succeeded — this is the headline of the response" },
      { label: "Body / payload", value: "an array of 4 objects", desc: "The actual data — this is what gets rendered as cards on the page" },
      { label: "Headers", value: "Content-Type: application/json", desc: "Tells your app how to interpret the body — not visible in this log, but sent alongside it" },
    ].map((row, i) => (
      <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "12px", alignItems: "flex-start" }}>
        <div style={{ backgroundColor: "#e8472a", color: "white", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "700", minWidth: "100px", textAlign: "center" }}>
          {row.label}
        </div>
        <div>
          <code style={{ color: "#34d399", fontSize: "13px" }}>{row.value}</code>
          <p style={{ color: "#8a9bb0", fontSize: "12px", margin: "2px 0 0" }}>{row.desc}</p>
        </div>
      </div>
    ))}

    <p style={{ color: "#8a9bb0", fontSize: "14px", marginTop: "20px" }}>
      The status code tells your app <strong style={{ color: "white" }}>whether</strong> it worked. The body tells it <strong style={{ color: "white" }}>what</strong> it got back. We'll cover what happens when this goes wrong shortly — that's its own slide.
    </p>
  </div>
)
  },
  {
    id: 3,
    label: "Payloads",
    emoji: "📦",
    summary: "The data itself",
    content: (
      <div>
        <p style={{ color: "#8a9bb0", lineHeight: 1.8, marginBottom: "20px" }}>
          The <strong style={{ color: "white" }}>payload</strong> is the actual data in the request or response body. REST APIs almost always use <strong style={{ color: "white" }}>JSON</strong>.
        </p>
        <div style={{ backgroundColor: "#0f1922", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
          <p style={{ color: "#8a9bb0", fontSize: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Response payload from GET /api/equipment/1</p>
          <pre style={{ color: "#34d399", fontSize: "13px", margin: 0, lineHeight: 1.8 }}>{`{
  "id": 1,
  "name": "Scaffolding Tower",
  "category": "Construction",
  "pricePerDay": 45,
  "available": true
}`}</pre>
        </div>
        <p style={{ color: "#8a9bb0", fontSize: "14px" }}>
          JSON is just key-value pairs. Keys are always strings. Values can be strings, numbers, booleans, arrays, or nested objects.
        </p>
      </div>
    )
  },
  {
    id: 4,
    label: "Authentication",
    emoji: "🔐",
    summary: "Proving who you are",
    content: (
      <div>
        <p style={{ color: "#8a9bb0", lineHeight: 1.8, marginBottom: "20px" }}>
          Most APIs require you to prove who you are before they'll give you data. The most common method is a <strong style={{ color: "white" }}>Bearer Token</strong>.
        </p>
        <div style={{ backgroundColor: "#0f1922", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
          <p style={{ color: "#8a9bb0", fontSize: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Request header</p>
          <pre style={{ color: "#34d399", fontSize: "13px", margin: 0 }}>{`Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...`}</pre>
        </div>
        {[
          { step: "1", text: "You log in and the server gives you a token — a long random string." },
          { step: "2", text: "You store that token in your app." },
          { step: "3", text: "Every API request includes the token in the Authorization header." },
          { step: "4", text: "The server checks the token. If it's valid, you get data. If not, you get a 401." },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "flex-start" }}>
            <div style={{ backgroundColor: "#e8472a", color: "white", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", flexShrink: 0 }}>
              {s.step}
            </div>
            <p style={{ color: "#8a9bb0", margin: 0, fontSize: "14px", lineHeight: 1.7 }}>{s.text}</p>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 5,
    label: "Security",
    emoji: "🛡️",
    summary: "Keeping it safe",
    content: (
      <div>
        <p style={{ color: "#8a9bb0", lineHeight: 1.8, marginBottom: "20px" }}>
          Beyond authentication, REST APIs use several layers of security:
        </p>
        {[
          { title: "HTTPS", desc: "All traffic is encrypted in transit. Never use HTTP for real APIs — your token and data would be readable by anyone on the network." },
          { title: "Rate Limiting", desc: "Servers cap how many requests you can make per minute. Exceed the limit and you get a 429 Too Many Requests error." },
          { title: "CORS", desc: "Browsers block requests to different domains by default. The server has to explicitly allow your origin — which is why our demo needed the cors package." },
          { title: "API Keys vs Tokens", desc: "API keys are long-lived and static (risky if leaked). Bearer tokens expire — much safer for production." },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: "3px solid #e8472a", paddingLeft: "16px", marginBottom: "20px" }}>
            <p style={{ color: "white", fontWeight: "700", margin: "0 0 4px" }}>{item.title}</p>
            <p style={{ color: "#8a9bb0", fontSize: "14px", margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 6,
    label: "Common Errors",
    emoji: "⚠️",
    summary: "What goes wrong",
    content: (
      <div>
        <p style={{ color: "#8a9bb0", lineHeight: 1.8, marginBottom: "20px" }}>
          These are the errors you'll see most often in the real world:
        </p>
        {[
          { code: "400", title: "Bad Request", fix: "Check your request body — missing field, wrong data type, or malformed JSON." },
          { code: "401", title: "Unauthorised", fix: "Your token is missing, expired, or wrong. Re-authenticate." },
          { code: "403", title: "Forbidden", fix: "You're authenticated but don't have permission for this resource." },
          { code: "404", title: "Not Found", fix: "The endpoint or resource ID doesn't exist. Check your URL." },
          { code: "422", title: "Unprocessable", fix: "The server understood your request but the data failed validation." },
          { code: "429", title: "Too Many Requests", fix: "You've hit the rate limit. Add retry logic with exponential backoff." },
          { code: "500", title: "Server Error", fix: "Not your fault — the server crashed. Check their status page." },
        ].map((e, i) => (
          <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "14px", alignItems: "flex-start" }}>
            <span style={{ color: "#e8472a", fontWeight: "700", fontSize: "14px", minWidth: "36px" }}>{e.code}</span>
            <div>
              <p style={{ color: "white", fontWeight: "600", fontSize: "13px", margin: "0 0 2px" }}>{e.title}</p>
              <p style={{ color: "#8a9bb0", fontSize: "13px", margin: 0 }}>{e.fix}</p>
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 7,
    label: "Pagination",
    emoji: "📄",
    summary: "Handling large datasets",
    content: (
      <div>
        <p style={{ color: "#8a9bb0", lineHeight: 1.8, marginBottom: "20px" }}>
          APIs never return thousands of records at once — that would be slow and expensive. Instead they <strong style={{ color: "white" }}>paginate</strong>: send results in pages.
        </p>
        <div style={{ backgroundColor: "#0f1922", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
          <p style={{ color: "#8a9bb0", fontSize: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Request</p>
          <pre style={{ color: "#34d399", fontSize: "13px", margin: 0 }}>{`GET /api/equipment?page=2&limit=10`}</pre>
        </div>
        <div style={{ backgroundColor: "#0f1922", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
          <p style={{ color: "#8a9bb0", fontSize: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Response</p>
          <pre style={{ color: "#34d399", fontSize: "13px", margin: 0 }}>{`{
  "data": [...],
  "page": 2,
  "limit": 10,
  "total": 47,
  "hasNextPage": true
}`}</pre>
        </div>
        <p style={{ color: "#8a9bb0", fontSize: "14px" }}>
          Some APIs use <strong style={{ color: "white" }}>cursor-based pagination</strong> instead — passing a cursor ID rather than a page number. More reliable when data changes frequently.
        </p>
      </div>
    )
  }
]

export default function Explain() {
  const [current, setCurrent] = useState(0)
  const router = useRouter()
  const step = steps[current]

  return (
    <main style={{ backgroundColor: "#1a2736", minHeight: "100vh", color: "white", fontFamily: "sans-serif" }}>

      {/* Nav */}
      <nav style={{ padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #2a3a4a" }}>
        <span style={{ fontWeight: "700", fontSize: "16px" }}>⚡ Flowable Demo</span>
        <button onClick={() => router.push("/flowable")} style={{ background: "none", border: "1px solid #2a3a4a", color: "#8a9bb0", padding: "8px 18px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
          ← Back to Equipment
        </button>
      </nav>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Step indicators */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap" }}>
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                backgroundColor: i === current ? "#e8472a" : "#2a3a4a",
                color: i === current ? "white" : "#8a9bb0",
                transition: "all 0.2s"
              }}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        {/* Content card */}
        <div style={{ backgroundColor: "#0f1922", borderRadius: "12px", padding: "40px", marginBottom: "24px", minHeight: "320px" }}>
          <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#e8472a", marginBottom: "8px" }}>
            Step {current + 1} of {steps.length}
          </p>
          <h2 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "8px" }}>
            {step.emoji} {step.label}
          </h2>
          <p style={{ color: "#8a9bb0", fontSize: "13px", marginBottom: "28px" }}>{step.summary}</p>
          <div>{step.content}</div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => setCurrent(c => Math.max(0, c - 1))}
            disabled={current === 0}
            style={{
              backgroundColor: "#2a3a4a",
              color: current === 0 ? "#4a5a6a" : "white",
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              cursor: current === 0 ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrent(c => Math.min(steps.length - 1, c + 1))}
            disabled={current === steps.length - 1}
            style={{
              backgroundColor: current === steps.length - 1 ? "#2a3a4a" : "#e8472a",
              color: current === steps.length - 1 ? "#4a5a6a" : "white",
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              cursor: current === steps.length - 1 ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </main>
  )
}