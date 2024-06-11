import { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, styled } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { getMessages, newMessage } from '../../../service/api.mjs';

import { AccountContext } from '../../../context/AccountProvider';

//components:
import Footer from './Footer';
import Message from './Message';



const Messages = ({ person, conversation }) => {

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);
    const scrollRef = useRef();
    const { account, newMessageFlag, setNewMessageFlag, socket } = useContext(AccountContext);

    useEffect(() => {

        socket.current.on('getMessage', data => {
            if (!data._id) {
                return;
            }
            setIncomingMessage({
                ...data,
                createdAt: new Date(data.createdAt || Date.now()).toISOString()
            });
        });

    }, [socket]);

    useEffect(() => {

        const getMessageDetails = async () => {

            if (conversation?._id) {
                let data = await getMessages(conversation._id);
                setMessages(data);
            }
        };
        getMessageDetails();

    }, [conversation?._id, person._id, newMessageFlag]);

    useEffect(() => {

        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {

        if (incomingMessage && conversation?.members?.includes(incomingMessage.senderId)) {
            setMessages(prev => [...prev, incomingMessage]);
        }
    }, [incomingMessage, conversation]);

    const sendText = async (e) => {

        const code = e.keyCode || e.which || e.type;
        if (code === 13 || code === 'click') {
            if (!value && !file) return;

            let message = {};
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value,
                    createdAt: new Date().toISOString()
                };
            } else {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: image,
                    createdAt: new Date().toISOString()
                };
            }

            const savedMessage = await newMessage(message);
            socket.current.emit('sendMessage', savedMessage);

            setValue('');
            setFile(null);
            setImage('');
            setNewMessageFlag(prev => !prev);
        }
    };

    return (
        <Wrapper>
            <Component>
                <End2endmsg>
                    <Lockicon />
                    Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.
                </End2endmsg>
                {messages.length > 0 ? (
                    messages.map(message => {
                        // console.log("Rendering message with ID:", message._id);
                        return (
                            <Container key={message._id} ref={scrollRef}>
                                <Message message={message} />
                            </Container>
                        );
                    })
                ) : (
                    <Typography style={{ textAlign: 'center', marginTop: '2rem' }}>No messages yet</Typography>
                )}
            </Component>
            <Footer
                sendText={sendText}
                setValue={setValue}
                value={value}
                file={file}
                setFile={setFile}
                setImage={setImage}
            />
        </Wrapper>
    );
};

export default Messages;

    Messages.propTypes = {
        person: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            email: PropTypes.string,
            picture: PropTypes.string,
            sub: PropTypes.string
        }).isRequired,
        conversation: PropTypes.shape({
            _id: PropTypes.string,
            members: PropTypes.arrayOf(PropTypes.string),
            createdAt: PropTypes.string,
            updatedAt: PropTypes.string,
            message: PropTypes.string
        }).isRequired
    };


//styles:

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;

const Component = styled(Box)`
    height: 81vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 0.2rem 5rem;
`;

const End2endmsg = styled(Typography)`
    background: #ffeecd;
    font-size: 0.7rem;
    text-align: center;
    padding: 0.4rem 1rem;
    border-radius: 0.5rem;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 1rem;
    margin-top: 1rem;
    color: #505050;
`;

const Lockicon = styled(LockIcon)`
    width: 1.2rem;
    height: 0.8rem;
`;