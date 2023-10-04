import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { useGetUserID } from "../hooks/useGetUserID"
import axios from "axios"
import { useQuery } from "react-query"

export const Navbar = () => {
    const [cookies, setCookies, removeCookie] = useCookies(["access_token"])
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(false);
    const [username, setUsername] = useState(null);
    const sidebarRef = useRef(null);
    const userID = useGetUserID();
    const serverURL = import.meta.env.VITE_API_BASE_URL;
    
    const timedOut = () => {
        if(!cookies.access_token) {
            removeCookie("access_token", "")
            window.localStorage.removeItem("userID");
        }
    }
    
    useEffect(() => {
        timedOut()
    }, [cookies.access_token])
   

    const logout = () => {
        removeCookie("access_token", "")
        window.localStorage.removeItem("userID");
        setShowSidebar(false)
        navigate("/")
    }

    const {data:userData, isLoading, isError, refetch} = useQuery(["users"], () => {
        return axios.get(`${serverURL}/users/${userID}`).then((res) => {
            setUsername(res.data.username);
            return res.data
        });
    });

    useEffect(() => {
        // Function to close the sidebar when clicking outside of it
        const handleClickOutside = (event) => {
          if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setShowSidebar(false);
          }
        };

        if (showSidebar) {
            document.addEventListener("mousedown", handleClickOutside);
          } else {
            document.removeEventListener("mousedown", handleClickOutside);
          }
      
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [showSidebar]);

        const closeSidebar = () => {
            setShowSidebar(false);
          };


    return (
    <div>
        
        <header className="flex justify-between p-6">

            <a href="/" className="flex items-center gap-1 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span className="font-bold md:text-xl">RentAway</span>
            </a>

            <div className="hidden md:flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 ">
                <Link to="/about">About Us</Link>
                <div className="border-l border-gray-300"></div>
                <Link to="/clothing">Browse Clothing</Link>
                
                {
                    cookies.access_token &&
                    <>
                        <div className="border-l border-gray-300"></div>
                        <Link to="/addClothes">List Something!</Link>
                    </>
                }
            </div>
            

            {/* Sidebar and hamburger */}
            <div className="cursor-pointer flex items-center border border-gray-300 rounded-full py-2 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 justify-center" onClick={() => setShowSidebar(!showSidebar)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                    {showSidebar && (
                        <button
                        className="flex text-2xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
                        onClick={() => setShowSidebar(!showSidebar)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        </button>
                    ) }

                {
                cookies.access_token &&
                   
                <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden ml-2">
                    <Link to="/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                    </Link>
                </div>
                    
            }

            </div>
            <div className={`sidebar top-0 right-0 w-full sm:w-[15vw] bg-stone-200 p-10 fixed h-full z-40 rounded-lg ${
                showSidebar ? "translate-x-0 " : "translate-x-full"
                 }`} ref={sidebarRef}>
                    {
                        !cookies.access_token ? (
                        <div className="text-center flex flex-col h-full">
                          
                            <Link className="mt-20 lg:text-2xl  text-black hover-opacity border-b-2 border-stone-500" to="/" onClick={closeSidebar}>Home</Link>

                                <Link className="mt-10 lg:text-2xl  text-black hover-opacity" to="/about" onClick={closeSidebar} >About Us</Link>
                                <Link className="lg:text-2xl  text-black hover-opacity" to="/clothing" onClick={closeSidebar} >Browse</Link>
                                <Link className=" lg:text-2xl  text-black hover-opacity" to="/auth/login" onClick={closeSidebar} >Login</Link>
                       
                                <Link className="lg:text-2xl  text-black hover-opacity" to="/auth/register" onClick={closeSidebar} >Register</Link>
                         
                        </div>
                        ) : (
                            <div className="text-center flex flex-col justify-between h-full">
                                <div className="flex flex-col mt-20">
                                    <div className="mb-5 text-black text-xl lg:text-3xl  overflow-hidden text-ellipsis">Welcome, {username}!</div>
                                    <Link className="lg:text-2xl  text-black hover-opacity border-b-2 border-stone-500" to="/" onClick={closeSidebar} >Home</Link>
                                 
                                        <Link className="lg:text-2xl mt-3 text-black hover-opacity" to="/clothing" onClick={closeSidebar} >Browse</Link>
                                

                                    
                                        <Link className="lg:text-2xl  text-black hover-opacity" to="/saved" onClick={closeSidebar} >Saved Clothes</Link>
                                   
                                    <Link className="lg:text-2xl  text-black hover-opacity" to="/addClothes" onClick={closeSidebar} >Rent</Link>
                                    
                                </div>

                                <div className="flex-col flex">
                                <Link className="lg:text-2xl  text-black hover-opacity" to="/about" onClick={closeSidebar} >About Us</Link>
                                <Link className="lg:text-2xl  text-black hover-opacity" to="/dashboard" onClick={closeSidebar} >Dashboard</Link>
                                    <button className="lg:text-2xl  text-black hover-opacity" onClick={logout}>Logout</button>
                                </div>
                            </div>
                        )
                    }
                

            </div>
        </header>
    </div>
    )
}