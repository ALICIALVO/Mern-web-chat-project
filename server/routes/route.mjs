import express from 'express';

import { addUser, getUsers } from '../controller/user-controller.mjs';
import { newConversation, getConversation } from '../controller/conversation-controller.mjs';
import { newMessage, getMessages } from '../controller/message-controller.mjs';
import { uploadFile, getImage } from '../controller/image-controller.mjs';
// import { authenticateJWT } from '../utils/auth.js'; // Import JWT authentication middleware

import upload from '../utils/upload.mjs';


const route = express.Router();

//http://localhost:8000

// // Add the root route handler
// route.get('/', (req, res) => {
//     res.send('You are logged in!');
//   });
  

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





// //workign code no passport.js or jwt:
// import express from 'express';

// import { addUser, getUsers } from '../controller/user-controller.js';
// import { newConversation, getConversation } from '../controller/conversation-controller.js';
// import { newMessage, getMessages } from '../controller/message-controller.js';
// import { uploadFile, getImage } from '../controller/image-controller.js';

// import upload from '../utils/upload.js';


// const route = express.Router();

// // https://facebook.com
// //http://localhost:8000


  

// // User management:
// route.post('/add', addUser )
// route.get('/users', getUsers);

// // Conversation management:
// route.post('/conversation/add', newConversation);
// route.post('/conversation/get', getConversation);

// // Message management:
// route.post('/message/add', newMessage);
// route.get('/message/get/:id', getMessages);

// // File management:
// route.post('/file/upload', upload.single('file'), uploadFile);
// route.get('/file/:filename', getImage);


// export default route;