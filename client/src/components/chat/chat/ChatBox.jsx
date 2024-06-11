import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@mui/material';
import { getConversation } from '../../../service/api.mjs';

import { AccountContext } from '../../../context/AccountProvider';

//components:
import ChatHeader from './ChatHeader';
import Messages from './Messages';


const ChatBox = () => {

    const { person, account } = useContext(AccountContext);
    const [conversation, setConversation] = useState(null);
 
    useEffect(() => {

        const fetchConversation = async () => {
            if (person?.sub) {

                try {

                    const data = await getConversation({ senderId: account.sub, receiverId: person.sub });
                    setConversation(data || {});

                } catch (error) {

                    console.error('Error fetching conversation:', error);
                    setConversation({}); // Ensuring we set conversation to an empty object if there's an error
                }
            }
        };

        fetchConversation();

    }, [person?.sub, account?.sub]);

    if (!conversation) {
        
        return <CircularProgress />;
    }

    return (
        <Box style={{ height: '75%' }}>
            <ChatHeader person={person} />
            {Object.keys(conversation).length ? (
                <Messages person={person} conversation={conversation} />
            ) : (
                <Typography style={{ textAlign: 'center', marginTop: '2rem' }}>No messages yet</Typography>
            )}
        </Box>
    );
}


export default ChatBox; 

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




