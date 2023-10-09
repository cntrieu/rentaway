import React from "react"
import './message.css'

export const Message = ({own, message}) => {
    return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop flex items-center w-1/2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/1200px-Joe_Biden_presidential_portrait.jpg" className="w-10 h-10 rounded-full object-cover mr-2"></img>
            <p className="messageText border bg-blue-400 rounded-2xl p-2 text-white">
                {message.text}
            </p>
            
        </div>  
        <div className="text-xs">{message.createdAt}</div>
    </div>
    )
}