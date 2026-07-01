"use client"

import { useState, useEffect } from "react"

export default function DebugPractice2() {
    const [orders, setOrders] = useState([])
    const [filter, setFilter] = useState("all")
    const prices = [10, 25, 8, 42, 15]


    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = async () => {
        try {
            const response = await fetch('/api/debug-orders')
            const data = await response.json()
            setOrders(data.orders)
        } catch (err) {
            console.log(err)
        }
    }

    console.log('orders', orders)
    const filteredOrders = orders.filter(order => {
        if (filter === "all") return true
        return order.status === filter
    })

    const getTotalValue = () => {
        let total = 0
        filteredOrders.forEach(order => {
            total = total + order.value
        }); return total
    }

    return (
        <main>
            <h1>Orders</h1>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>

            <p>Total value: £{getTotalValue()}</p>

            {filteredOrders.map(order => (
                <div key={order.id}>
                    <p>{order.customerName} - £{order.value} - {order.status}</p>
                </div>
            ))}
        </main>
    )
}
