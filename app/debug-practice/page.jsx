"use client"

import { useState, useEffect } from "react"

export default function DebugPractice() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

   const fetchUsers = async () => {
    const response = await fetch('/api/debug-users')
    const data = await response.json()
    console.log('data', data)
    if(data === undefined) {
        setUsers([])
    } else {
    setUsers(data)
    }
    
    setLoading(false)
  }

  const getActiveCount = () => {
    console.log('users', users)
    for (var i = 0; i < users.length; i++) {
      var count = 0
      if (users[i].active) {
        count++
      }
    }
    return count
  }

  return (
    <main>
      <h1>User Dashboard</h1>
      <p>Active users: {getActiveCount()}</p>

      {loading && <p>Loading...</p>}

      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>Status: {user.active ? 'Active' : 'Inactive'}</p>
        </div>
      ))}

      <button onClick={() => console.log('Total users: ' + users.length)}>
        Log Count
      </button>
    </main>
  )
}