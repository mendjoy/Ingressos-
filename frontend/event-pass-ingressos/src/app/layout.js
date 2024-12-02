"use client"

import { AuthProvider } from "@/context/AuthContext"
import "./globals.css"
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"
import { SearchProvider } from "@/context/SearchContext"

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="appContent">
                    <AuthProvider>
                        <SearchProvider>
                            <Navbar/>
                            <div>{children}</div>
                        </SearchProvider>
                    </AuthProvider>
                </div>
                <Footer/>
            </body>
        </html>
    )
}
