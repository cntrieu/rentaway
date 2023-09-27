import { Register } from "../pages/register";
import { Login } from "../pages/login"
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export const AuthLogin = () => {
    return (
    <div className="auth">
        <Navbar />
        <Login />
        <Footer />
    </div>
    )
}

