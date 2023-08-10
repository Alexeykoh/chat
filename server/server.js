const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
	console.log('lel')
	res.sendFile('D:\\WEB\\Pets\\chat_v2\\chat\\build\\');
	res.send
});

app.use(express.static('D:\\WEB\\Pets\\chat_v2\\chat\\build\\'))


http.listen(PORT,'25.59.233.24', () => {
	console.log(`Server listening on ${PORT}`);
});

const socketIO = require('socket.io')(http, {
	cors: {
		origin: "*"
	}
});


let onlineUsers = []

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
	// add new user
	socket.on("new-user-add", (newUserId) => {
		if (!onlineUsers.some((user) => user.userId === newUserId)) {  // if user is not added before
			onlineUsers.push({ userId: newUserId, socketId: socket.id });
			console.log("new user is here!", onlineUsers);
		}
		// send all active users to new user
		socketIO.emit("get-users", onlineUsers);
	});

	socket.on("disconnect", () => {
		onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
		console.log("user disconnected", onlineUsers);
		// send all online users to all users
		socketIO.emit("get-users", onlineUsers);
	});

	socket.on("offline", () => {
		// remove user from active users
		onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
		console.log("user is offline", onlineUsers);
		// send all online users to all users
		socketIO.emit("get-users", onlineUsers);
	});

});