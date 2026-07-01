import Navbar from "./components/Navbar"
import "./globals.css"
import CartContextProvider from './context/CartContext'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartContextProvider>
          <Navbar />
          {children}
        </CartContextProvider>
      </body>
    </html>
  )
}