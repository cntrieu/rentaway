import { Register } from "../pages/register";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export const AuthRegister = () => {
    return (
    <div className="auth">
        <Navbar />
        <Register />
        <Footer />
    </div>
    )
}

