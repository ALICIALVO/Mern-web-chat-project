import Message from "../model/Message.mjs";
import Conversation from '../model/Conversation.mjs';

export const newMessage = async (request, response) => {

    try {
        const newMessage = new Message(request.body);
        const savedMessage = await newMessage.save(); // Save the message and get the saved message with _id
        await Conversation.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });

        return response.status(200).json(savedMessage); // Return the saved message

    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getMessages = async (request, response) => {

    try {
        const messages = await Message.find({ conversationId: request.params.id });
        return response.status(200).json(messages);

    } catch (error) {
        return response.status(500).json(error.message);
    }
}
