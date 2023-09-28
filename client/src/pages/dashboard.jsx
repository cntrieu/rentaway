import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { useGetUserID } from "../hooks/useGetUserID"
import axios from "axios"
import { SuccessAccountChangeModal } from "../components/successAccountChangeModal"
import { DeleteAccount } from "../components/deleteAccount"

export const Dashboard = () => {
    const [cookies, _] = useCookies(["access_token"])
    const userID = useGetUserID();
    const [userInfo, setUserInfo] = useState()
    const [changeUser, setChangeUser] = useState(false)
    const [user, setUser] = useState({
        username: "",
        email: "",
        currentPassword: "", 
        newPassword: "", 
    })
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const serverURL = import.meta.env.VITE_API_BASE_URL;

    if(!cookies.access_token) {
        navigate('/auth/login')
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${serverURL}/users/${userID}`);
                setUserInfo(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchUser();
    }, [userID]);


    const openModal = () => {
        setIsModalOpen(true);
      };
    
      // Function to close the modal
      const closeModal = () => {
        setIsModalOpen(false);
      };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }


    const toggleChangeUser = () => {
        setChangeUser(!changeUser)
    }
   
    const handleSubmit = async (event) => {
        event.preventDefault();

        setUser({ ...user, newPassword: "", currentPassword: "" });

        try {
            const response = await axios.put(`${serverURL}/users/${userID}`, user, {
              headers: {
                 authorization: cookies.access_token
              },
            });
        
            console.log("User updated:", response.data);
            openModal();
            toggleChangeUser();
          } catch (error) {
            console.error("Error updating user:", error);

            if (error.response && error.response.status === 400) {
             
                alert(error.response.data.message);
              } else {
                alert("An error occurred while updating the user.");
              }
          }
      };

    return (
        <>
        <SuccessAccountChangeModal isOpen={isModalOpen} onClose={closeModal}/>
        <section className="w-3/6 mx-auto">
            <div className="flex items-center">
                <h1 className="font-bold text-2xl m-5">Account Settings</h1>
                <button className="hover-opacity border rounded-full text-xs p-3 bg-green-700 text-white h-10" type="button" onClick={toggleChangeUser}>Update</button>
            </div>

            <form onSubmit={handleSubmit} >
                <div className="md:w-1/2">
                    <h2 className="text-lg mb-5 font-bold">Username</h2>
                    <div className="lg:flex justify-between">
                        { userInfo ? 
                            ( <h2>{userInfo.username}</h2> ) : (<p>Loading...</p>)
                        }
                    
                        {changeUser && (
                            <input className="border rounded-lg p-1" name="username" placeholder="New Username"onChange={handleChange}/>
                        )}
                    </div>
                </div>

                <div className="md:w-1/2">
                    <h2 className="text-lg mb-5 font-bold mt-5">Email</h2>
                    <div className="lg:flex justify-between">
                        { userInfo ? 
                            ( <h2>Your Email is <strong>{userInfo.email}</strong></h2> ) : (<p>Loading...</p>)
                        }
                    
                        {changeUser && (
                            <input className="border rounded-lg p-1" name="email" placeholder="new Email"onChange={handleChange}/>
                        )}
                    </div>
                </div>

                <div className="md:w-1/2">
                    <h2 className="text-lg mb-5 font-bold mt-5">Password</h2>
                    <div className="">
                            <h2>***********</h2>
                    
                        {changeUser && (
                            <>
                            <input className="border rounded-lg p-1 mb-1 lg:m-3" name="currentPassword" type="password" placeholder="Current Password"onChange={handleChange}/>
                            <input className="border rounded-lg p-1" name="newPassword" type="password" placeholder="New Password"onChange={handleChange}/>
                            </>
                        )}
                    </div>
                </div>
                {changeUser && (
                    <>
                        <button type="submit" className="hover-opacity border rounded-full text-xs m-1 p-3 bg-blue-500 text-white h-10">Save Changes</button> 
                    </>
                )}
            </form>
        </section>
        
        <section className="w-2/5 mx-auto mt-20">
            <DeleteAccount />
        </section>
        </>
    )
}