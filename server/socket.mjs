import { Server as socketServer } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const { CLIENT_URL } = process.env;

const initializeSocket = (httpServer, CLIENT_URL) => {
    const io = new socketServer(httpServer, {
        cors: {
            origin: CLIENT_URL,
            methods: ["GET", "POST"]
        }
    });

let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.sub == userData.sub) && users.push({ ...userData, socketId});
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}

io.on('connection', (socket) => {
    console.log('a user connected');
    

    socket.on('addUsers', userData => { 
        addUser(userData, socket.id);
        io.emit('getUsers', users);
        })

        socket.on('sendMessage', data => {
            console.log(`sendMessage event triggered by socket ${socket.id} with data:`, data);
            const user = getUser(data.receiverId);
            if (user) {
                io.to(user.socketId).emit('getMessage', data);
            } else {
                console.error(`User with id ${data.receiverId} not found`);
            }
        });

        
    });
};

export default initializeSocket;