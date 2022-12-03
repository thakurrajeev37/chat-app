const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '/./public');
const { isRealString, generateMessage } = require("./utils//utilityFunction");
const {Users} = require(".//utils/users");

const port = process.env.PORT || 4000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));

let users = new Users();
io.on("connection", (socket) => {
    console.log("***Connection established");

    socket.on("join", (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit("updateUsersList", users.getUserList(params.room));

        socket.emit("newMessage", generateMessage("Admin", `Welocome to ${params.room}!`));

        socket.broadcast.emit("newMessage", generateMessage("Admin", `${params.name} recently joined!`));
    });
    

    socket.on("createMessage", (message, callback) => {
        console.log("createmessage", message);
        let user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback('This is the server:');
    });
    socket.on("disconnect", () => {
        let user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left ${user.room} chat room.`))
        }
    })
});


server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});