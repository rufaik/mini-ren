"use client"

import React, {useState, createContext} from 'react';


export const CartContext = createContext(null)


export default function CartContextProvider({children}) {
const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart([...cart, item])

  }


  return (
    	<CartContext.Provider value={{cart, setCart, addToCart}}>
			{children}
		</CartContext.Provider>
  );
}