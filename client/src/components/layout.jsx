import { Navbar } from "./navbar"
import { Outlet } from "react-router-dom"

export const Layout = () => {
    return (
        <div className="">
           <Navbar />
           <Outlet />
        </div>
    )
}