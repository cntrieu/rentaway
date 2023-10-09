import React, { useEffect, useState } from "react"
import axios from "axios";
import { useQuery } from "react-query"

export const Conversations = ({conversation, currentUser}) => {
    const [user, setUser] = useState(null)
    const serverURL = import.meta.env.VITE_API_BASE_URL;
    // const otherUserId = conversation.members.find(m => m !== currentUser._id)

    // const {data, isLoading, isError} = useQuery(["conversations"], () => {
    //     return axios.get(`${serverURL}/users/${otherUserId}`).then((res) => {
    //         setUser(res.data)
    //     })
    // })
    
    useEffect(() => {
        const otherUserId = conversation.members.find(member => member !== currentUser)
    

        const getUser = async() => {
            try {
                const res = await axios.get(`${serverURL}/users/${otherUserId}`)  
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        getUser()
    }, [currentUser, conversation])



    return (
    <div className="conversation-container flex items-center p-4 mt-3 cursor-pointer hover:bg-gray-100 w-5/6">
        <img src="https://invisiblechildren.com/wp-content/uploads/2012/07/facebook-profile-picture-no-pic-avatar.jpg" className="w-10 h-10 rounded-full object-cover mr-3"></img>
        { user? (
            <span className="user-name font-bold">{user.username}</span>
        ) : (
<span className="user-name font-bold">Loading...</span>
        )}
        
    </div>
    )
}