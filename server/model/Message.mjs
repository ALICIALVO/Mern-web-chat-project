import mongoose from "mongoose";



const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    senderId: {
        type: String
    },
    receiverId: {
        type: String
    },
    text: {
        type: String
    },
    type: {
        type: String
    }
},
{
timestamps: true
});

const message = mongoose.model('Message', MessageSchema);

export default message;

//CODE WITHOUT LOCALHOST 28/05.24:
// import mongoose from "mongoose";



// const MessageSchema = new mongoose.Schema({
//     conversationId: {
//         type: String
//     },
//     senderId: {
//         type: String
//     },
//     receiverId: {
//         type: String
//     },
//     text: {
//         type: String
//     },
//     type: {
//         type: String
//     },
//     isMedia: {
//         type: Boolean,
//         default: false
//     }
// }, {
//     timestamps: true
// });

// const message = mongoose.model('Message', MessageSchema);

// export default message;