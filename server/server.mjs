import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import log from '@ajar/marker'; 
import cookieParser from 'cookie-parser';
import passport from './utils/passport.mjs'; 
import authRoutes from './routes/auth.mjs'; 
import dotenv from 'dotenv';

// socket:
import { createServer } from 'http';
import initializeSocket from './socket.mjs';

import { connect_db }  from './database/db.mjs';
import Route from './routes/route.mjs';

dotenv.config();

const { PORT, HOST, CLIENT_URL } = process.env; 

const app = express();
//conecting httpServer to express server to allow us to contuinue working as we used to:
const httpServer = createServer(app);

// Initialize Socket.IO
initializeSocket(httpServer, CLIENT_URL);

// Enable CORS with the appropriate origin
app.use(cors({ origin: CLIENT_URL, credentials: true })); 
app.use(cookieParser());
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));


// Serve static files
app.use(express.static('public'));

// routing:
app.use('/', Route);
app.use('/auth', authRoutes);

connect_db();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


httpServer.listen(PORT,HOST, () => {
    log.magenta(`Server is listening successfully on:`,`http://${HOST}:${PORT}`);
});
