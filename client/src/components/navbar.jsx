import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"


export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID");
        navigate("/auth")
    }

    return (
    // <div className='navbar fixed w-full bg-white z-10 shadow-sm'>
    <div>
        <header className="flex justify-between p-6">
            <a href="/" className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span className="font-bold text-xl">RentAway</span>
            </a>

            <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                <Link to="/about">About</Link>
                <div className="border-l border-gray-300"></div>
                <Link to="/clothing"> Browse Clothing</Link>
                <div className="border-l border-gray-300"></div>
                {
                    !cookies.access_token ? (
                        <Link to="/auth">Sign In / Register</Link>
                    ) : (
                        <>
                        <Link to="/addClothes">List Something!</Link>
                        <div className="border-l border-gray-300"></div>
                        <Link to="/saved">Saved</Link>
                        <div className="border-l border-gray-300"></div>
                        <button onClick={logout}>Logout</button>
                        </>
                    )
                }
            </div>

            <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
            {
                !cookies.access_token ? (
                    <Link to="/auth">Sign In / Register</Link>
                ) : (
                    <>
                <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>



                    </>
                )       
            }


            </div>
        </header>
        {/* <Link to="/">Home</Link> */}
      
        
    </div>
    )
}