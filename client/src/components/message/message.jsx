import React from "react"
import './message.css'
import { getTimeAgo } from "../../hooks/getTimeAgo"

export const Message = ({own, message}) => {
    const getTime = getTimeAgo(message.createdAt);

    return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop flex items-center w-1/2">
          <img src="https://invisiblechildren.com/wp-content/uploads/2012/07/facebook-profile-picture-no-pic-avatar.jpg" className="w-10 h-10 rounded-full object-cover mr-2"></img>
            <p className="messageText border bg-blue-400 rounded-2xl p-2 text-white">
                {message.text}
            </p>
            
        </div>  
        <div className="text-xs">{getTime}</div>
    </div>
    )
}