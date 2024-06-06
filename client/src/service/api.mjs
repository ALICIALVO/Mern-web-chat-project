import axios from 'axios';


const SERVER_URL = import.meta.env.VITE_SERVER_URL;


export const addUser = async (data) => {
    try {
        // console.log('Sending user data to server:', data);
        const response = await axios.post(`${SERVER_URL}/add`, data);
        console.log('Server response:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error while addUser API:', error.message);
        if (error.response) {
            console.log('Server response status:', error.response.status);
            console.log('Server response data:', error.response.data);
        }
    }
}


export const getUsers = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/users`);
        // console.log('Fetched Users:', response.data); // Enhanced logging
        return response.data;
    } catch(error) {
        console.log('Error while calling getUsers API:', error.message);
    }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${SERVER_URL}/conversation/add`, data);
    } catch (error) {
        console.log('error while calling setConversation api', error.message);

    }
}



export const getConversation = async (params) => {
    try {
        const response = await axios.post(`${SERVER_URL}/conversation/get`, params);
        // console.log('Fetched Conversation:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error while calling getConversation API:', error.message);
        throw error;
    }
};



export const newMessage = async (message) => {
    try {
        const response = await axios.post(`${SERVER_URL}/message/add`, message);
        return response.data; // return the saved message
    } catch (error) {
        console.error('Error while calling newMessage API', error);
    }
};


export const getMessages = async (id) => {
    try {
        if (!id) {
            throw new Error('Message ID is undefined');
        }
        const response = await axios.get(`${SERVER_URL}/message/get/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getMessages API:', error.message);
        if (error.response) {
            console.log('Server response status:', error.response.status);
            console.log('Server response data:', error.response.data);
        }
    }
}


export const uploadFile = async (data) => {
    try {
        return await axios.post(`${SERVER_URL}/file/upload`, data);
        
    } catch (error) {
        console.log('Error while calling uploadFile api ', error);
    }
}



