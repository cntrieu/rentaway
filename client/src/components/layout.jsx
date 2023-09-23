import { Navbar } from "./navbar"
import { Outlet } from "react-router-dom"
import { Footer } from "./footer"

export const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="w-9/12 mx-auto flex-grow">
                <Outlet />
            </div>
        <Footer />
        </div>
    )
}