let socket = io();

socket.on('connect', () => {
    console.log("1. user Connected");
    // socket.emit("createMessage", {
    //     from: "Rajeev Kumar",
    //     text: "Whats going on" 
    // })
});

socket.on('disconnect', () => {
    console.log("2. user Disconnected****");
});

socket.on("newMessage", (message) => {
    console.log("newMessage*****", message);
});

let userForm = document.getElementById("user-form");
// userForm.addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log("*******", e);
//     socket.emit("createMessage", {
//         from: document.querySelector("input[name='name']").value,
//         text: document.querySelector("input[name='room']").value
//     });

// })