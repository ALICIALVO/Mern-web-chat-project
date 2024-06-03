import axios from 'axios';


const SERVER_URL = import.meta.env.VITE_SERVER_URL;



export const addUser = async (data) => {
    try {
        console.log('Sending user data to server:', data);
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
        console.log('Fetched Users:', response.data); // Enhanced logging
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


// api.js

export const getConversation = async (params) => {
    try {
        const response = await axios.post(`${SERVER_URL}/conversation/get`, params);
        console.log('Fetched Conversation:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error while calling getConversation API:', error.message);
        throw error;
    }
};



export const newMessage = async (message) => {
    try {
        const response = await axios.post(`${SERVER_URL}/message/add`, message);
        return response.data; // Return the saved message
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






// original working code no passport.js:
// import axios from 'axios';


// const url = 'http://localhost:8000';
// export const addUser = async (data) => {
//     try {
//         await axios.post(`${url}/add`, data);
//     } catch (error) {
//         console.log('Error while addUser API', error.message);
//     }
// }

// export const getUsers = async () => {
//     try {
//       let response = await axios.get(`${url}/users`);
//     //   console.log(response); 
//       return response.data;
//     } catch(error){
//         console.log('error while calling getUsers api', error.message);
//     }
// }

// export const setConversation = async (data) => {
//     try {
//         await axios.post(`${url}/conversation/add`, data);
//     } catch (error) {
//         console.log('error while calling setConversation api', error.message);

//     }
// }


// export const getConversation = async (data) => {
//     try {
//        let response = await axios.post(`${url}/conversation/get`, data);
//        return response.data;
//     } catch (error) {
//         console.log('error while calling getConversation api', error.message);

//     }
// }


// export const newMessage = async (data) => {
// try {
//     await axios.post(`${url}/message/add`, data);
// } catch (error) {
//     console.log('error while calling newMessage api', error.message);
// }
// }


// export const getMessages = async (id) => {
//     try {
//         let response = await axios.get(`${url}/message/get/${id}`);
//         return response.data;
//     } catch (error) {
//         console.log('error while calling getMessages api', error.message);
//     }
// }


// export const uploadFile = async (data) => {
//     try {
//         return await axios.post(`${url}/file/upload`, data);
        
//     } catch (error) {
//         console.log('Error while calling uploadFile api ', error);
//     }
// }










// File upload function



// Ensure the URL is correct
// export const uploadFile = async (data) => {
//     try {
//       const response = await axios.post('http://localhost:8000/file/upload', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       console.log('Upload successful', response.data); // Ensure this is displayed
//       return response.data;
//     } catch (error) {
//       console.error('Error while uploading file', error); // Handle errors
//       throw error; // Optionally rethrow or handle accordingly
//     }
//   };

