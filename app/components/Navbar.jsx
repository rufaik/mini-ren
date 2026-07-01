"use client"

import { useContext } from "react"

import { CartContext } from '../context/CartContext'
import Link from "next/link"

export default function Navbar() {
    const { cart } = useContext(CartContext)

    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/equipment">Equipment</Link>
            <div>Cart {cart.length}</div>
        </nav>
    )
}
