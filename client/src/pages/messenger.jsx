
import { useState, useEffect, useRef } from "react"
import { Conversations } from "../components/conversations/conversations"
import { Message } from "../components/message/message"
import axios from "axios"
import { useQuery } from "react-query"
import { useGetUserID } from "../hooks/useGetUserID"
import { io } from 'socket.io-client'


export const Messenger = () => {
    const userID = useGetUserID();
    const serverURL = import.meta.env.VITE_API_BASE_URL;
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessages, setNewMessages] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const socket = useRef()
    const scrollRef = useRef();

    useEffect(() => {
        const getMessages = async() => {
            try{
                const res = await axios.get(`${serverURL}/api/messages/${currentChat._id}`)
                setMessages(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getMessages()
    }, [currentChat])
   
    useEffect(() => {
        socket.current = io.connect(import.meta.env.VITE_API_BACKEND_URL)
        console.log("Socket.IO connected"); 
        socket.current.on("receiveMessage", data => {
            console.log("getMessageData: ", data)

            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })

        })

    }, [])


    useEffect(() => {
        arrivalMessage && 
        currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage])
   
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        
        socket.current.emit("addUser", userID)
        socket.current.on("getUsers", users => {
            console.log(users);
        })
    }, [userID])

   

    const {data, isLoading, isError} = useQuery(["conversations"], () => {
        return axios.get(`${serverURL}/api/conversation/${userID}`).then((res) => {
           setConversations(res.data)
        })
    })
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: userID,
            text: newMessages,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.members.find(member => member !== userID)

        socket.current.emit("sendMessage", {
            senderId: userID,
            receiverId,
            text: newMessages,
        })

        try {
            const res = await axios.post(`${serverURL}/api/messages`, message);
            setMessages([...messages, res.data])
            setNewMessages("")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return (
    <div className="messenger-container md:flex flex-cols-2 md:w-5/6">
        
        <div className="menu-container md:basis-2/6">
            <div>
                {/* <input className="border p-3 w-5/6" placeholder="search conversation"></input> */}
                {conversations.map((c) => (
                    <div onClick={() => setCurrentChat(c)}>
                      <Conversations conversation={c} currentUser={userID}/>
                    </div>
                ))}
              
            
            </div>
            
        </div>

        <div className="chatbox-container basis-4/6">
            <div className="chatbox-wrapper relative flex flex-col">
                {
                    currentChat ?
                    <>
                <div className="chatbox-top overflow-y-scroll">
              
                    {
                    messages.map((message) => (
                        <div ref={scrollRef}  >
                          
                            <Message message={message} own={message.sender === userID} />
                        </div>
                         ))
                    }
                
                   
                </div>
                <div className="chatbox-bottom mt-3 flex items-center justify-between">
                    <textarea className="chatMessageInput w-5/6 h-24 p-4 border" placeholder="message..." value={newMessages} onChange={(e) => setNewMessages(e.target.value)}></textarea>
                    <button className="w-28 h-20 p-2 cursor-pointer bg-teal-500 rounded-lg text-white text-xl" onClick={handleSubmit}>Send</button>
                </div>
                    </> :
                    <span className="absolute top-10 text-5xl text-gray-300 cursor-default font-bold">Open a conversation to start a chat.</span>
                }
               
            </div>
        </div>  
    </div>
    )
}