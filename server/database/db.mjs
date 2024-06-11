import mongoose from "mongoose";
import dotenv from 'dotenv';
import log from '@ajar/marker'; 

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export const connect_db = async () => {
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@whatsapp-web-clone.ct7dbvd.mongodb.net/?retryWrites=true&w=majority&appName=whatsapp-web-clone`;

    try {
       await mongoose.connect(URL);
       log.blue('✨database connected successfully✨');

    } catch (error) {
        log.red('error while commecting with the database mongodb', error.message);
    }
}

export default connect_db;



