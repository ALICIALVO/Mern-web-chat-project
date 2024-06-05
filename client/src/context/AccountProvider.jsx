import { createContext, useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types'; 

import { io } from 'socket.io-client';

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(null); // Ensure initial state is null
    const [person, setPerson] = useState({});
    const [activeUsers, setActiveUsers] = useState([]); 
    const [newMessageFlag, setNewMessageFlag] = useState(false); 
    const [conversation, setConversation] = useState(null); // Add conversation state


    const socket = useRef();

    useEffect(() => {  
        const webSocketUrl = import.meta.env.VITE_WEBSOCKET_URL;
                socket.current = io(webSocketUrl);
            }, []); 


            //logout::::
            const logout = () => {
                // Clear the token from cookies
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
                // Reset the account state
                setAccount(null);
            };

    return (
        <AccountContext.Provider
            value={{
                account,
                setAccount,
                person,
                socket,
                setPerson,
                activeUsers,
                setActiveUsers,
                newMessageFlag,
                setNewMessageFlag,
                conversation,
                setConversation,
                logout, 
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
AccountProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

