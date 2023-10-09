
const io = require("socket.io")(3001, {
    cors: {
        origin: process.env.SERVER_URL
    }
});

io.on("connection", (socket) => {
    console.log("a user connected")
    io.emit("welcome", "hello, this is socket server!")
})