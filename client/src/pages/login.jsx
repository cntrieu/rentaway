import { useState } from "react"
import axios from 'axios'
import { useCookies } from "react-cookie"
import { useNavigate, Link } from "react-router-dom"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [registrationError, setRegistrationError] = useState(null); 
    const [_, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();

    const setErrorWithTimeout = (message, timeout = 5000) => {
        setRegistrationError(message);
        setTimeout(() => {
          setRegistrationError(null);
        }, timeout);
      };

      const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password
            })
            
           setCookies("access_token", response.data.token);
           window.localStorage.setItem("userID", response.data.userID);
           navigate("/")
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="mx-auto py-40" style={{ backgroundImage: 'linear-gradient(115deg, #ffc798, #ffe7d3)' }}>

            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    
                    <div className="w-full lg:w-1/2" style={{ backgroundImage: 'url("/garmentrack.webp")', backgroundSize: 'cover'}}>
                        <div>
                            <p></p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 py-16 px-12">
                        <form onSubmit={onSubmit}>
                            <h2 className="text-3xl mb-4">Login</h2>
                            <p className="mb-4">Create a free acount and start renting!</p>
                            {registrationError && (
                                    <div className="error-message text-red-400">{registrationError}</div>
                                )}
                            <div className="form-group">
                                <label htmlFor="username"> </label>
                                <input 
                                type="text" 
                                id="username" 
                                name="username"
                                placeholder="Username"
                                value={username} 
                                className="border border-gray-500 py-1 px-2 w-full rounded-lg"
                                onChange={(event) => setUsername(event.target.value)} />
                            </div>
                        
                            <div className="form-group mt-5">
                                <label htmlFor="password"></label>
                                <input 
                                type="password" 
                                id="password" 
                                placeholder="Password"
                                name="password"
                                value={password}
                                className="border border-gray-500 py-1 px-2 w-full rounded-lg"
                                onChange={(event) => setPassword(event.target.value)} />
                            </div>

                            <button type="submit" className="mt-5 w-full bg-amber-800 py-3 text-center text-white">Login</button>
                            <div className="text-center py-2 text-gray-500">
                                Don't have an account yet? <Link className="underline text-black" to={'/auth/register'}>Register Now</Link>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    </div>
    )
}