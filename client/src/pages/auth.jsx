import { Register } from "./register"
import { Login } from "./login"

export const Auth = () => {
    return (
    <div className="auth">
        <Login />
        <Register />
    </div>
    )
}

