"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Equipment() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fetched, setFetched] = useState(false)
  const router = useRouter()


const fetchEquipment = () => {
  setLoading(true)
  setError(null)
  console.log("Fetching equipment from API...")

  fetch("http://localhost:3001/api/equipment", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      console.log("Response received:", res.status, res.statusText)
      return res.json()
    })
    .then(data => {
      console.log("Data:", data)
      setItems(data)
      setLoading(false)
      setFetched(true)
    })
    .catch(err => {
      console.error("Error fetching equipment:", err)
      setError("Could not load equipment")
      setLoading(false)
    })
}

  useEffect(() => {
    if (!fetched) return

    const interval = setInterval(() => {
      fetchEquipment()
      console.log('fetch from backend')
    }, 30000)
    return () => clearInterval(interval)
  }, [fetched])

  return (
    <main style={{ backgroundColor: "#1a2736", minHeight: "100vh", color: "white", fontFamily: "sans-serif" }}>

      {/* Nav */}
      <nav style={{ backgroundColor: "#1a2736", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #2a3a4a" }}>
        <span style={{ fontWeight: "700", fontSize: "18px", color: "white" }}>&#xf0e7; Flowable Demo</span>
        <button
          onClick={fetchEquipment}
          disabled={loading}
          style={{
            backgroundColor: "#e8472a",
            color: "white",
            border: "none",
            padding: "10px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Loading..." : "Load Equipment"}
        </button>
        <button
          onClick={() => router.push("/explain")}
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid #2a3a4a",
            padding: "10px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            marginRight: "12px"
          }}
        >
          How does this work?
        </button>
      </nav>

      {/* Hero */}
      <div style={{ padding: "60px 40px 40px", maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a9bb0", marginBottom: "12px" }}>
          Equipment Rental
        </p>
        <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "8px", lineHeight: 1.2 }}>
          Available Equipment
        </h1>
        <p style={{ color: "#8a9bb0", fontSize: "15px", marginBottom: "48px" }}>
          Browse and book equipment for your next project.
        </p>

        {error && <p style={{ color: "#f87171", marginBottom: "24px" }}>{error}</p>}

        {/* Cards grid */}
        {fetched && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "white",
                  color: "#1a2736",
                  borderRadius: "10px",
                  padding: "28px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
                }}
              >
                <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#8a9bb0", marginBottom: "8px" }}>
                  {item.category}
                </p>
                <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px", color: "#1a2736" }}>
                  {item.name}
                </h2>
                <p style={{ fontSize: "22px", fontWeight: "700", color: "#e8472a", marginBottom: "12px" }}>
                  £{item.pricePerDay}/day
                </p>
                <span style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  backgroundColor: item.available ? "#dcfce7" : "#fee2e2",
                  color: item.available ? "#16a34a" : "#dc2626"
                }}>
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}