import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../global/Header"
import Footer from "../global/Footer"

export default function Layout() {

    return (
        <div style={{ backgroundColor: 'black' }}>
            <Header />
            <Outlet/>
            <Footer />
        </div>
    )
}