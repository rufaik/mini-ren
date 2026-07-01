"use client"

import { useState} from "react"
import Link from "next/link"
import {equipment} from "../data/equipment.js"


export default function Equipment() {
  const [items, setItems] = useState(equipment)
  

 


  return (
    <main>
      <h1>Equipment</h1>
      {items.map((item) => (
        <div key={item.id}>
          <Link href={`/equipment/${item.id}`}><h2>{item.name}</h2></Link>
          <p>£{item.pricePerDay} per day</p>
        </div>
      ))}
    </main>
  )
}

