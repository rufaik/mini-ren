"use client"

import { useState, use, useContext } from "react"

import { equipment } from "../../data/equipment.js"
import { CartContext } from '../../context/CartContext'


import Form from 'next/form'


export default function EquipmentDetail({ params }) {
  const { id } = use(params)
  const item = equipment.find(i => i.id === Number(id))
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [desc, setDesc] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState([])
  const [success, setSuccess] = useState('')
  const { cart, addToCart } = useContext(CartContext)


  console.log('cart', cart)


  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log("handling....")




    try {
      const response = await fetch(`/api/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          desc,
          item,
        })
      })

      const data = await response.json()
      console.log('data1', data)
      if (!response.ok) {
        setError(data.errors)
        console.log('data2', data.errors)
      } else {
        setSuccess('Thank you for your message, we will be in touch shortly')
        setShow(false)
      }
    } catch (err) {
      setError('Something went wrong, please try again')
    }

  }


  return (
    <main>

      <div>
        <h2>{item.name}</h2>
        <p>£{item.pricePerDay} per day</p>
        <div onClick={() => addToCart(item)}>Add To Cart</div>

      </div>
      <h2>Would you like to make an enquiry about {item.name}?</h2>
      <h2
        onClick={() => {
          setShow(true)
          setSuccess('')
          setError('')
        }}
      >
        YES
      </h2>
      {show &&
        <div>
          <h2 className="my-2">Enquiry Form for {item.name}</h2>
          <Form className="flex flex-col">
            <label> Full Name</label>
            <input
              name='full name'
              id='full name'
              type='text'
              value={fullName}
              className="block w-50 rounded-md border-blue-300 py-3 px-4 text-gray-900 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
              onChange={(event) => {
                setFullName(event.target.value)
              }}
            />
            <label>Email</label>
            <input
              name='email'
              id='email'
              type='email'
              value={email}
              className="block w-50 rounded-md border-blue-300 py-3 px-4 text-gray-900 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            />

            <label>Message</label>
            <textarea
              value={desc}
              onChange={(event) => {
                setDesc(event.target.value)
              }}
              id="message"
              name="message"
              rows={4}
              className="block w-50 rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              aria-describedby="message-max"

            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-2 inline-flex w-50 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3  shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
            >Submit</button>
            {error.fullName && <div style={{ color: 'red' }}>{error.fullName}</div>}
            {error.email && <div style={{ color: 'red' }}>{error.email}</div>}
            {error.desc && <div style={{ color: 'red' }}>{error.desc}</div>}

          </Form>
        </div>
      }
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </main>
  )
}

