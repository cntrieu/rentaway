import { Navbar } from "./navbar"
import { Outlet } from "react-router-dom"
import { Footer } from "./footer"
import { Home } from "../pages/home"

export const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">

            <Navbar />
            
            <div className="flex-grow">
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}