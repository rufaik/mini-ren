"use client"

import { useState } from "react"

export default function ApiTest() {
  const [response, setResponse] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const testGet = async () => {
    const res = await fetch('/api/practice')
    const data = await res.json()
    setResponse(data)
  }

  const testPost = async () => {
    const res = await fetch('/api/practice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
    const data = await res.json()
    setResponse(data)
  }

  const testPut = async () => {
    const res = await fetch('/api/practice', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 1, name: "Updated User", email: "updated@example.com" })
    })
    const data = await res.json()
    setResponse(data)
  }

  const testDelete = async () => {
    const res = await fetch('/api/practice?id=1', {
      method: 'DELETE',
    })
    const data = await res.json()
    setResponse(data)
  }

  return (
    <main>
      <h1>API Test</h1>

      <div>
        <h2>POST — Add User</h2>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <button onClick={testPost}>POST user</button>
      </div>

      <div>
        <h2>Other Methods</h2>
        <button onClick={testGet}>GET users</button>
        <button onClick={testPut}>PUT user</button>
        <button onClick={testDelete}>DELETE user</button>
      </div>

      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </main>
  )
}