import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, styled } from '@mui/material';

import { AccountContext } from '../../../context/AccountProvider';
import { setConversation as setConversationAPI, getConversation } from '../../../service/api';
import { formatDate } from '../../../utils/common-utils';




const Component = styled(Box)`
    height: 3.5rem;
    display: flex;
    padding: 1rem 0;
    cursor: pointer;
`;

const Image = styled('img') ({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    padding: '0 1rem'
});

const Container = styled(Box)`
    display: flex;
`;

const Timestamp = styled(Typography)`
    font-size: 0.9rem;
    margin-left: auto;
    color: #00000099;
    margin-right: 2rem;
`;

const Text = styled(Typography)`
    display: block;
    color: rgba(0, 0, 0, 0.6);
    font-size: 1rem;
`;

const Conversation = ({ user }) => {
    const { setPerson, account, newMessageFlag, setConversation } = useContext(AccountContext);
    const [message, setMessage] = useState({});

    useEffect(() => {
        const getConversationDetails = async () => {
            try {
                const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
                console.log('Fetched Conversation Details:', data); // Log fetched conversation details
                setMessage({ text: data?.message, timestamp: data?.updatedAt });
                setConversation(data);  // Store conversation data in context
            } catch (error) {
                console.error('Error fetching conversation details:', error);
            }
        };
        getConversationDetails();
    }, [newMessageFlag, account.sub, user.sub, setConversation]);

    const getUser = async () => {
        setPerson(user);
        try {
            await setConversationAPI({ senderId: account.sub, receiverId: user.sub });
            const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
            console.log('Setting conversation:', data); // Log the conversation being set
            setConversation(data);  // Update the conversation in context
        } catch (error) {
            console.error('Error setting conversation:', error);
        }
    };
    const isMediaMessage = (text) => {
        if (!text) return false; // Ensure text is defined
        return text.includes('s3.amazonaws.com') || /\.(jpg|jpeg|png|gif|pdf)$/i.test(text);
    };
    return(
        <Component onClick={() => getUser()}>
            <Box>
                <Image src= {user.picture} alt="dp" />
            </Box>
            <Box style={{ width: '100%' }}>
                <Container>
        
            <Typography>{user.name}</Typography>
            {
                message?.text &&
                <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
            }
            </Container>
       
            <Box>
                    <Text>{isMediaMessage(message?.text) ? 'media' : message.text}</Text>
                </Box>
            </Box>
        </Component>
    )
}

Conversation.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        picture: PropTypes.string,
        sub: PropTypes.string
    }).isRequired
};
export default Conversation;



//CODE WITHOUT LOCALHOST 28/05.24:
// import { useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

// import { Box, Typography, styled } from '@mui/material';

// import { AccountContext } from '../../../context/AccountProvider';
// import { setConversation as setConversationAPI, getConversation } from '../../../service/api';
// import { formatDate, isMedia } from '../../../utils/common-utils';




// const Component = styled(Box)`
//     height: 3.5rem;
//     display: flex;
//     padding: 1rem 0;
//     cursor: pointer;
// `;

// const Image = styled('img') ({
//     width: 50,
//     height: 50,
//     objectFit: 'cover',
//     borderRadius: '50%',
//     padding: '0 1rem'
// });

// const Container = styled(Box)`
//     display: flex;
// `;

// const Timestamp = styled(Typography)`
//     font-size: 0.9rem;
//     margin-left: auto;
//     color: #00000099;
//     margin-right: 20px;
// `;

// const Text = styled(Typography)`
//     display: block;
//     color: rgba(0, 0, 0, 0.6);
//     font-size: 1rem;
// `;

// const Conversation = ({ user }) => {
//     const { setPerson, account, newMessageFlag, setConversation } = useContext(AccountContext);
//     const [message, setMessage] = useState({});

//     useEffect(() => {
//         const getConversationDetails = async () => {
//             try {
//                 const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
//                 console.log('Fetched Conversation Details:', data); // Log fetched conversation details
//                 setMessage({ text: data?.message, timestamp: data?.updatedAt });
//                 setConversation(data);  // Store conversation data in context
//             } catch (error) {
//                 console.error('Error fetching conversation details:', error);
//             }
//         };
//         getConversationDetails();
//     }, [newMessageFlag, account.sub, user.sub, setConversation]);

//     const getUser = async () => {
//         setPerson(user);
//         try {
//             await setConversationAPI({ senderId: account.sub, receiverId: user.sub });
//             const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
//             console.log('Setting conversation:', data); // Log the conversation being set
//             setConversation(data);  // Update the conversation in context
//         } catch (error) {
//             console.error('Error setting conversation:', error);
//         }
//     };

//     return (
//         <Component onClick={() => getUser()}>
//             <Box>
//                 <Image src={user.picture} alt="dp" />
//             </Box>
//             <Box style={{ width: '100%' }}>
//                 <Container>
//                     <Typography>{user.name}</Typography>
//                     {message?.text && <Timestamp>{formatDate(message?.timestamp)}</Timestamp>}
//                 </Container>
//                 <Box>
//                     <Text>{message?.text && isMedia(message.text) ? 'media' : message.text}</Text>
//                 </Box>
//             </Box>
//         </Component>
//     );
// };

// Conversation.propTypes = {
//     user: PropTypes.shape({
//         _id: PropTypes.string,
//         name: PropTypes.string,
//         email: PropTypes.string,
//         picture: PropTypes.string,
//         sub: PropTypes.string
//     }).isRequired
// };

// export default Conversation;