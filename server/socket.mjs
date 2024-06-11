import { Server as socketServer } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const { CLIENT_URL } = process.env;

const initializeSocket = (httpServer) => {
    const io = new socketServer(httpServer, {
        cors: {
            origin: CLIENT_URL,
            methods: ["GET", "POST"]
        }
    });

    let users = [];

    const addUser = (userData, socketId) => {

        if (!users.some(user => user.sub == userData.sub)) {
            users.push({ ...userData, socketId });
            console.log('User added:', userData, 'Socket ID:', socketId);
        }
    };

    const removeUser = (socketId) => {

        const user = users.find(user => user.socketId === socketId);
        if (user) {
            users = users.filter(user => user.socketId !== socketId);
            console.log('User removed:', user);
        }
    };

    const getUser = (userId) => {
        return users.find(user => user.sub === userId);
    };

    io.on('connection', (socket) => {

        console.log('A user connected, socket ID:', socket.id);

        socket.on('addUsers', userData => {
            addUser(userData, socket.id);
            io.emit('getUsers', users);
        });

        socket.on('sendMessage', data => {

            console.log(`sendMessage event triggered by socket ${socket.id} with data:`, data);
            const user = getUser(data.receiverId);
            if (user) {
                io.to(user.socketId).emit('getMessage', data);
            } else {
                console.error(`User with id ${data.receiverId} not found`);
            }
        });

        // Custom disconnect event
        socket.on('customDisconnect', () => {

            console.log('Custom disconnect event received for socket:', socket.id);
            removeUser(socket.id);
            io.emit('getUsers', users);
        });

        // Default disconnect event
        socket.on('disconnect', () => {
            
            console.log('A user disconnected, socket ID:', socket.id);
            removeUser(socket.id);
            io.emit('getUsers', users);
        });
    });
};

export default initializeSocket;



