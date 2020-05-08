const express = require("express");
const socket = require("socket.io");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to MongoDB")
);

//App setup
const app = express();

//Middleware
app.use(express.json()); //allows body to be used in request
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

//static files
// app.use(express.static('public')); //look for index.html in public folder, and serve

//Router Middlewares
app.use("/api/user", authRoute);
app.use("/api/post", postRoute);

//Init Server
const server = app.listen(4000, () => console.log("Server Online"));

// Socket setup
const io = socket(server);

//listen for connection event
io.on("connection", function (socket) {
    console.log("Socket Connection Made", socket.id);

    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    });

    //emit to all clients
    socket.emit("chat", { message: socket.id });

    //emits to all but user client
    socket.broadcast.emit();

    //
    socket.on('disconnect', () => {
        io.sockets.emit("chat", { message: `${socket.id} has left chat` })
    });
});
