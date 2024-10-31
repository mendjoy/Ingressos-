"use client"

import { AuthProvider } from "@/context/AuthContext"
import "./globals.css"
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="appContent">
          <AuthProvider>
            <Navbar/>
            <div >
              {children}
            </div>
          </AuthProvider>
        </div>
        <Footer/>
      </body>
    </html>
  )
}
