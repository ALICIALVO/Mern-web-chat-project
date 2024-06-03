import { useContext, useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { AccountContext } from '../../../context/AccountProvider';
import { getConversation } from '../../../service/api.mjs';
import PropTypes from 'prop-types';


//components:
import ChatHeader from './ChatHeader';
import Messages from './Messages';


const ChatBox = () => {
    const { person, account } = useContext(AccountContext);
    const [conversation, setConversation] = useState(null);

    useEffect(() => {
        const getConversationDetails = async () => {
            if (person?.sub) {
                let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
                console.log('Fetched Conversation in ChatBox:', data); // Log fetched conversation
                setConversation(data);
            }
        }
        getConversationDetails();
    }, [person.sub, account.sub]);

    return(
        <Box style={{ height: '75%'}}>
            <ChatHeader person={person}/>
            {/* <Messages person={person} conversation={conversation}/> */}
            {conversation ? (
                <Messages person={person} conversation={conversation} />
            ) : (
                <div>Loading...</div> // Add a loading state
            )}
        </Box>
    )
}

ChatBox.propTypes = {
    person: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        picture: PropTypes.string,
        sub: PropTypes.string
    }),
    conversation: PropTypes.shape({
        _id: PropTypes.string,
        members: PropTypes.arrayOf(PropTypes.string),
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        message: PropTypes.string
    })
};

export default ChatBox; 




