import express from 'express';
import { addUser, getUsers } from '../controller/user-controller.mjs';
import { newConversation, getConversation } from '../controller/conversation-controller.mjs';
import { newMessage, getMessages } from '../controller/message-controller.mjs';
import { uploadFile, getImage } from '../controller/image-controller.mjs';
// import { authenticateJWT } from '../utils/auth.js'; JWT authentication middleware

import upload from '../utils/upload.mjs';

const route = express.Router();

// User management:
route.post('/add', addUser )
route.get('/users', getUsers);


// Conversation management:
route.post('/conversation/add', newConversation);
route.post('/conversation/get', getConversation);

// Message management:
route.post('/message/add', newMessage);
route.get('/message/get/:id', getMessages);

// File management:
route.post('/file/upload', upload.single('file'), uploadFile);
route.get('/file/:filename', getImage);


export default route;