import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import { authRouter } from "./src/routes/auth.js"
import { clothingRouter } from "./src/routes/clothing.js"
import { userRouter } from './src/routes/users.js'
import { conversationRouter } from './src/routes/conversations.js'
import { messagesRouter } from './src/routes/messages.js'
import multer from 'multer'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from "http";
import { Server } from "socket.io";

mongoose.connect(process.env.MONGODB_URI )

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, { 
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"]
    }
});

let users = [];

const addUser = (userID, socketID) => {
    !users.some(user => user.userID === userID) &&
        users.push({userID, socketID})
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userID === userId)
}

// function to emit message even if other user is not online
const saveMessage = (senderId, receiverId, text) => {
    io.emit("getMessage", {
        senderId,
        receiverId,
        text
    });
}

io.on("connection", (socket) => {

    // On connect
    console.log(`User connected: ${socket.id}`)
    socket.on("addUser", (userID) => {
        addUser(userID, socket.id)
        io.emit("getUsers", users)
    })

    // Sending and receiving messages
    socket.on("sendMessage", ({ senderId, receiverId, text}) => {
        const user = getUser(receiverId);
       
        if (user) {
            io.to(user.socketID).emit("receiveMessage", {
                senderId,
                text
            });
            console.log("getMessage emitted")
        } else {
           return
        }
    })


    // On disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected from server")
        removeUser(socket.id)
        io.emit("getUsers", users)
        console.log("users: ", users)
    })
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use("/auth", authRouter)
app.use("/clothing", clothingRouter)
app.use("/users", userRouter)
app.use("/api/conversation", conversationRouter)
app.use("/api/messages", messagesRouter)


const photosMiddleware = multer({dest:'uploads/'})

app.post(`/upload`, photosMiddleware.array('photos', 100), (req, res) => {
   
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length -1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        console.log(newPath);
        // When pushing to main, make sure to keep the uploads/ one.
        uploadedFiles.push(newPath.replace('uploads/', ''));

        // Uploads\\ is for it to work on local
        // uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    
    res.json(uploadedFiles);        
})


const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))

